import { Component, inject } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Category, Products } from '../../core/interfaces/products.interface';
import { SearchComponent } from "../search/search.component";
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [SearchComponent, ModalDeleteComponent, CommonModule, NotificationComponent, FormComponent],
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

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true; // Inicia el estado de carga
    Promise.all([this.getAllProducts(), this.getAllCategories()]).then(() => {
      this.isLoading = false; // Finaliza el estado de carga
    });
  }

  getAllProducts(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._service.getAllProducts().subscribe({
        next: (response) => {
          this.productList = this.processProducts(response);
          this.searchQuery = ''; // Limpia la búsqueda al cargar todo
          resolve();
        },
        error: (err) => {
          console.error(err);
          reject();
        },
      });
    });
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
    this.searchQuery = title; // Actualiza la consulta
    if (title.trim() === '') {
      this.getAllProducts();
    } else {
      this._service.getProductsByTitle(title).subscribe({
        next: (response) => {
          this.productList = this.processProducts(response);
        },
        error: (err) => console.error(err),
      });
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

  openModal(product: Products) {
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
      // Editar producto
      this._service.updateProduct(this.product.id, formData).subscribe({
        next: () => {
          this.alertMessage = 'Producto actualizado con éxito';
          this.getAllProducts();
        },
        error: (err) => console.error(err),
      });
    } else {
      // Añadir producto
      this._service.createProduct(formData).subscribe({
        next: () => {
          this.alertMessage = 'Producto añadido con éxito';
          this.getAllProducts();
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
