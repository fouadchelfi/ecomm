import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../../env';

@Injectable({
    providedIn: 'root'
})
export class ProductsHttpService {

    private apiUrl = `${CONFIG.backendUrl}/products`;

    constructor(private http: HttpClient) { }

    // Get all products
    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/all`);
    }

    // Get all products
    paginateProducts(sort: string, order: string, pageIndex: number, pageSize: number): Observable<any> {
        const requestUrl = `${this.apiUrl}/pagiante?sort=${sort}&order=${order}&pageIndex=${pageIndex + 1}&pageSize=${pageSize + 1}`;
        return this.http.get<any>(requestUrl);
    }

    // Get a single product by ID
    getProduct(id: number): Observable<any> {
        const url = `${this.apiUrl}/one/${id} `;
        return this.http.get<any>(url);
    }

    // Get a single product by ID
    getProductsByCategoryId(id: number): Observable<any[]> {
        const url = `${this.apiUrl}/many/by-category/${id} `;
        return this.http.get<any[]>(url);
    }

    // Create a new product
    createProduct(product: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, product, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    // Update an existing product
    updateProduct(product: any): Observable<any> {
        const url = `${this.apiUrl}/update/${product.id}`;
        return this.http.put<any>(url, product, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    // Delete a product by ID
    deleteProduct(id: number): Observable<void> {
        const url = `${this.apiUrl}/delete/${id}`;
        return this.http.delete<void>(url);
    }
}