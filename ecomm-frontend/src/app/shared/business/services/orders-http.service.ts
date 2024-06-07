import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../../env';

@Injectable({
    providedIn: 'root'
})
export class OrdersHttpService {

    private apiUrl = `${CONFIG.backendUrl}/orders`;

    constructor(private http: HttpClient) { }

    countOrders(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/count`);
    }

    // Get all orders
    paginateOrders(sort: string, order: string, pageIndex: number, pageSize: number): Observable<any> {
        const requestUrl = `${this.apiUrl}/pagiante?sort=${sort}&order=${order}&pageIndex=${pageIndex + 1}&pageSize=${pageSize + 1}`;
        return this.http.get<any>(requestUrl);
    }

    // Get a single order by ID
    getOrder(id: number): Observable<any> {
        const url = `${this.apiUrl}/one/${id} `;
        return this.http.get<any>(url);
    }

    // Create a new order
    createOrder(order: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, order, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    setOrderStatus(id: any, status: any): Observable<any> {
        const url = `${this.apiUrl}/update/${id}/${status}`;
        return this.http.put<any>(url, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    // Delete a order by ID
    deleteOrder(id: number): Observable<void> {
        const url = `${this.apiUrl}/delete/${id}`;
        return this.http.delete<void>(url);
    }
}