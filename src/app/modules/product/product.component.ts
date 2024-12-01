import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TableComponent, FooterComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent {

}
