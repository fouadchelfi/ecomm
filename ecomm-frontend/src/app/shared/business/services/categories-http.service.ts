import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../../env';

@Injectable({
    providedIn: 'root'
})
export class CategoriesHttpService {

    private apiUrl = `${CONFIG.backendUrl}/categories`;

    constructor(private http: HttpClient) { }

    // Get all categories
    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // Get all categories
    paginateCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // Get a single category by ID
    getCategory(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<any>(url);
    }

    // Create a new category
    createCategory(category: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, category, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    // Update an existing category
    updateCategory(category: any): Observable<any> {
        const url = `${this.apiUrl}/${category.id}`;
        return this.http.put<any>(url, category, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    // Delete a category by ID
    deleteCategory(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<void>(url);
    }
}
