import { Component, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Category, Products } from '../../core/interfaces/products.interface';
import { SearchComponent } from "../search/search.component";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';
import { FormComponent } from '../form/form.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { SkeletonComponent } from "../skeleton/skeleton.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [SearchComponent, ModalDeleteComponent, CommonModule, NotificationComponent, FormComponent, PaginationComponent, SkeletonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  _service = inject(ApiService)
  productList !: Products[];
  categories!: Category[];
  fallbackImage: string = 'https://cdn-icons-png.flaticon.com/128/11542/11542598.png';
  searchQuery: string = '';
  isModalOpen: boolean = false;
  product !: Products;
  alertMessage: string = '';
  showAlert: boolean = false;
  isFormOpen: boolean = false;
  isEditMode: boolean = false;

  isLoading: boolean = true; // Variable para manejar el estado de carga

  // Variables de paginación
  currentPage: number = 1;     // Página actual
  pageSize: number = 10;       // Cantidad de productos por página
  totalProducts: number = 0;   // Total de productos (asumiendo que lo sabes o puedes obtenerlo)
  totalPages: number = 0;      // Total de páginas calculadas

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    Promise.all([this.getInitialData(), this.getAllCategories()]).then(() => {
      this.isLoading = false;
    });
  }

  // Obtenemos inicialmente el total y los productos de la primera página
  getInitialData(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Ejemplo: primero obtenemos el total
      // Si no tienes endpoint para total, podrías asumirlo o cambiar la lógica
      this._service.getTotalProducts().subscribe({
        next: (total) => {
          this.totalProducts = total;
          this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
          // Ahora cargamos la primera página
          this.loadProductsByPage(this.currentPage);
          resolve();
        },
        error: (err) => {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  loadProductsByPage(page: number) {
    this.isLoading = true;
    const offset = (page - 1) * this.pageSize;

    if (this.searchQuery.trim() !== '') {
      this._service.getProductsByTitle(this.searchQuery, offset, this.pageSize).subscribe({
        next: (response) => {
          this.productList = this.processProducts(response);
          // Aquí debes agregar la lógica para totalProducts y totalPages
          if (this.productList.length === 0) {
            this.totalProducts = 0;
            this.totalPages = 0;
          } else {
            this.totalProducts = this.productList.length;
            this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    } else {
      // Sin búsqueda, cargar normalmente
      this._service.getProducts(offset, this.pageSize).subscribe({
        next: (response) => {
          this.productList = this.processProducts(response);
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
      });
    }
  }


  // Evento que se disparará desde el componente de paginación
  onPageChange(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.currentPage = newPage;
    this.loadProductsByPage(this.currentPage);
  }

  getAllCategories(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._service.getAllCategories().subscribe({
        next: (response) => {
          this.categories = response;
          resolve();
        },
        error: (err) => {
          console.error(err);
          reject();
        },
      });
    });
  }

  // Buscar productos por título
  searchProducts(title: string) {
    this.searchQuery = title.trim();
    this.currentPage = 1;

    if (this.searchQuery === '') {
      // Si la búsqueda está vacía, recalcular totales antes de cargar la página
      this.isLoading = true;
      this._service.getTotalProducts().subscribe({
        next: (total) => {
          this.totalProducts = total;
          this.totalPages = Math.ceil(this.totalProducts / this.pageSize);
          this.loadProductsByPage(this.currentPage); // Ahora sí cargamos los productos normales
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    } else {
      // Si hay un término de búsqueda, simplemente carga la página filtrada
      this.loadProductsByPage(this.currentPage);
    }
  }


  processProducts(products: Products[]): Products[] {
    return products.map((product) => ({
      ...product,
      images: product.images.map((img: string) => this.cleanAndValidateImageUrl(img)),
    }));
  }

  cleanAndValidateImageUrl(imageUrl: string): string {
    try {
      const cleanedUrl = imageUrl.replace(/[\[\]\\"]/g, ''); // Limpia caracteres no deseados
      const parsedUrl = new URL(cleanedUrl);

      // Si el dominio o URL no es accesible, evita usarlo
      if (
        parsedUrl.hostname === 'placeimg.com' || // Bloquea dominios no válidos
        parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:'
      ) {
        return this.fallbackImage; // Usa la imagen de respaldo
      }

      return cleanedUrl; // Retorna la URL válida
    } catch {
      return this.fallbackImage; // Si falla, retorna la imagen de respaldo
    }
  }

  handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target.src !== this.fallbackImage) {
      target.src = this.fallbackImage;
    }
  }

  openModal(product: Products, event?: Event) {
    if (event) {
      (event.target as HTMLElement).blur(); // Quita el foco inmediatamente
    }
    this.isModalOpen = true; // Abre el modal
    this.product = product; // Muestra el nombre
    document.body.classList.add('overflow-hidden');
  }

  closeModal() {
    this.isModalOpen = false; // Cierra el modal
    document.body.classList.remove('overflow-hidden');
  }

  openForm(product: Products | null = null) {
    this.isEditMode = !!product; // Si hay un producto, estamos en modo edición
    this.product = product ? { ...product } : ({} as Products);
    this.isFormOpen = true;
    document.body.classList.add('overflow-hidden');
  }

  closeForm() {
    this.isFormOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  handleFormSubmit(formData: any) {
    if (this.isEditMode) {
      this._service.updateProduct(this.product.id, formData).subscribe({
        next: () => {
          this.alertMessage = 'Producto actualizado con éxito';
          this.loadProductsByPage(this.currentPage);
        },
        error: (err) => console.error(err),
      });
    } else {
      this._service.createProduct(formData).subscribe({
        next: () => {
          this.alertMessage = 'Producto añadido con éxito';
          // Después de añadir, volvemos a cargar la página actual (o la primera, según se quiera)
          this.loadProductsByPage(this.currentPage);
        },
        error: (err) => console.error(err),
      });
    }

    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  showAlertMessage(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  handleProductDeletion(id: number) {
    this.productList = this.productList.filter((product) => product.id !== id); // Actualiza la lista

    // Configurar la alerta
    this.alertMessage = 'Producto eliminado con éxito';
    this.showAlert = true;

    // Ocultar la alerta después de 5 segundos
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }
}