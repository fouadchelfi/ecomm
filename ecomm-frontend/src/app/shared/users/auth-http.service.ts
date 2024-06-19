import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {

    constructor(private httpClient: HttpClient) { }

    private authUrl: string = `${environment.backendUrl}/auth`;

    public login(login: any): Observable<any> {
        return this.httpClient.post<any>(`${this.authUrl}/login`, login);
    }

    public logout(): Observable<any> {
        return this.httpClient.get<any>(`${this.authUrl}/logout`);
    }

    public me(): Observable<any> {
        return this.httpClient.get<any>(`${this.authUrl}/me`);
    }

}