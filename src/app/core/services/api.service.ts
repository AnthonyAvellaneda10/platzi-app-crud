import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category, Products } from '../interfaces/products.interface';
import { map, Observable } from 'rxjs';
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

  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}products`)
  }

  // Nuevo método para obtener productos con offset y limit
  getProducts(offset: number, limit: number): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}products?offset=${offset}&limit=${limit}`);
  }

  // Si cuentas con un endpoint que retorne el total, úsalo. Ejemplo:
  getTotalProducts(): Observable<number> {
    // Esto depende de tu API, si no existe, omite o ajusta la lógica
    return this.http.get<Products[]>(`${this.apiUrl}products`)
      .pipe(
        map(products => products.length) // Esto es solo un ejemplo, aquí sí obtendrías todos y contarías. Lo ideal es un endpoint separado que devuelva el total.
      );
  }

  getProductsByTitle(title: string, offset?: number, limit?: number): Observable<Products[]> {
    let url = `${this.apiUrl}products?title=${title}`;
    if (offset !== undefined && limit !== undefined) {
      url += `&offset=${offset}&limit=${limit}`;
    }
    return this.http.get<Products[]>(url);
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
