import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  // Esta lógica genera las páginas a mostrar, incluyendo "..."
  get pages(): (number | string)[] {
    const totalPages = this.totalPages;
    const current = this.currentPage;
    const delta = 2; // Número de páginas visibles a izquierda/derecha del current
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          // hay un hueco de 1 página entre l y i, poner el número intermedio
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          // hay un hueco mayor a 1 página, poner "..."
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }

  goToPage(page: number | string) {
    if (page === '...') return;
    this.pageChange.emit(page as number);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

}