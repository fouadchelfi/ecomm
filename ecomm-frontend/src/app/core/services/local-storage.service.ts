import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

    constructor() { }

    getAuthToken() {
        return localStorage.getItem('auth_token');
    }

    getDecodedAuthToken() {
        let token = localStorage.getItem('auth_token');
        return token ? jwtDecode(token) as any : null;
    }

    setAuthToken(token: any) {
        localStorage.setItem('auth_token', token);
    }

    removeAuthToken() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    }

    currentUsername() {
        return JSON.parse(localStorage.getItem('user') ?? '')?.name;
    }
}