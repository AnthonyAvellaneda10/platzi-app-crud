import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category, Products } from '../interfaces/products.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http = inject(HttpClient);
  apiUrl = `${environment.HOST_URL}`

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    })
  };

  constructor() { }

  getAllProducts(): Observable<Products []> {
    return this.http.get<Products []>(`${this.apiUrl}products`)
  }

  getProductsByTitle(title: string): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}products?title=${title}`);
  }  

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}categories`);
  }
  

  updateProduct(id: number, data: any) {
    return this.http.put(`${this.apiUrl}products/${id}`, data, this.httpOptions);
  }
  
  createProduct(data: any) {
    return this.http.post(`${this.apiUrl}products`, data, this.httpOptions);
  }  

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}products/${id}`)
  }
}
