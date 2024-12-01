import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Products } from '../../core/interfaces/products.interface';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css'
})
export class ModalDeleteComponent {
  @Input() isOpen: boolean = false; // Controla si el modal está abierto o cerrado
  @Input() product !: Products; // Controla si el modal está abierto o cerrado
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  _service = inject(ApiService)

  closeModal() {
    this.onClose.emit(); // Notifica al componente padre que se debe cerrar el modal
  }

  // Eliminar producto
  deleteProduct(id: number) {
    this._service.deleteProduct(id).subscribe({
      next: () => {
        this.onDelete.emit(id); // Emitir el ID eliminado
        this.closeModal(); // Cerrar modal
      },
      error: (err) => console.error(err),
    });
  }

}
