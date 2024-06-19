import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommonHttpService {

    constructor(private httpClient: HttpClient) { }

    private commonUrl: string = `${environment.backendUrl}/common`;

    public allProvinces(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.commonUrl}/provinces/all`);
    }

    public allCities(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.commonUrl}/cities/all`);
    }

    public cityByPostCode(code: any): Observable<any> {
        return this.httpClient.get<any>(`${this.commonUrl}/cities/by-post-code/${code}`);
    }

    public citiesByProvinceId(provinceId: any): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.commonUrl}/cities/${provinceId}`);
    }
}