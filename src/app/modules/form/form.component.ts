import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Products } from '../../core/interfaces/products.interface';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() isOpenForm: boolean = false;
  @Input() isEditMode: boolean = false;
  @Input() product!: Products;
  @Input() categories: Category[] = [];
  @Output() onCloseForm: EventEmitter<void> = new EventEmitter<void>();
  @Output() onSubmitForm: EventEmitter<any> = new EventEmitter<any>();

  formTitle: string = '';
  buttonLabel: string = '';
  formProduct!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formProduct = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      categoryId: [null, Validators.required],
      images: this.formBuilder.array([]),
    });
  }

  ngOnChanges(): void {
    // Verifica si el formulario ya está inicializado
    if (!this.formProduct) {
      return;
    }

    if (this.isEditMode && this.product) {
      this.formTitle = 'Editar producto';
      this.buttonLabel = 'Editar';
      this.formProduct.patchValue({
        title: this.product.title,
        price: this.product.price,
        description: this.product.description,
        categoryId: this.product.category?.id || null,
      });
      this.setImages(this.product.images);
    } else {
      this.formTitle = 'Añadir producto';
      this.buttonLabel = 'Añadir';
      this.formProduct.reset(); // Asegúrate de que el formulario esté inicializado
      this.clearImages();
    }
  }

  get imagesFormArray(): FormArray {
    return this.formProduct.get('images') as FormArray;
  }

  addImage(): void {
    this.imagesFormArray.push(new FormControl('', Validators.required));
  }

  removeImage(index: number): void {
    this.imagesFormArray.removeAt(index);
  }

  setImages(images: string[]): void {
    this.clearImages();
    images.forEach((image) => {
      this.imagesFormArray.push(new FormControl(image, Validators.required));
    });
  }

  clearImages(): void {
    while (this.imagesFormArray.length !== 0) {
      this.imagesFormArray.removeAt(0);
    }
  }

  closeFormModal(): void {
    this.onCloseForm.emit();
  }

  submitForm(): void {
    if (this.formProduct.valid) {
      this.onSubmitForm.emit(this.formProduct.value);
      this.closeFormModal();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
