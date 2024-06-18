import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DeliveryHttpService {
    constructor(private http: HttpClient) { }

    private apiUrl = `${environment.backendUrl}/delivery`;

    getProvincesPrices(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/provinces-prices`);
    }

    getDeliveryPrice(code: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/province-price/${code}`);
    }

    updateProvincePrice(arr: any): Observable<any> {
        const url = `${this.apiUrl}/province-price/update`;
        return this.http.put<any>(url, arr, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
}