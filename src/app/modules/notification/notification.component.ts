import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() message!: string;
  @Input() type: 'success' | 'error' = 'success';
  isVisible: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = false; // Oculta la alerta después de 5 segundos
    }, 5000);
  }

}
