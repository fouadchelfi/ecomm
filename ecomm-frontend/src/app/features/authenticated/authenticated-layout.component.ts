import { Component, OnInit } from '@angular/core';
import { AuthService, LocalStorageService } from '../../core';

@Component({
  selector: 'app-authenticated-layout',
  template: `
        <div class="flex flex-col min-h-full">
          <div class="flex flex-wrap justify-between items-center h-16 px-8 border-b">
            <div>
              <img src="assets/icons/logo-text.png" alt="logo" class="h-10">
            </div>
            <div class="flex flex-row items-center gap-x-2">
              <div class="flex flex-row items-center gap-x-2">
                <my-avatar [content]="localStorage.currentUsername()"></my-avatar>
                <span class="text-base uppercase font-medium">{{localStorage.currentUsername()}}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-row flex-1">
            <div class="flex flex-col border-r w-72">
              <nav class="flex flex-col mt-6">
                <a routerLink="/authenticated/dashboard">
                  <div routerLinkActive="bg-gray-100 text-black" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-dashboard-3-line text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Tableau de bord</span>
                  </div>
                </a>
                <a routerLink="/authenticated/products">
                  <div routerLinkActive="bg-gray-100 text-black" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-product-hunt-line text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Produits</span>
                  </div>
                </a>
                <a routerLink="/authenticated/categories">
                  <div routerLinkActive="bg-gray-100 text-black" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-node-tree text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Catégories</span>
                  </div>
                </a>
                <a routerLink="/authenticated/orders">
                  <div routerLinkActive="bg-gray-100 text-black" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-receipt-line text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Commandes</span>
                  </div>
                </a>
                <button (click)="logoutUser()">
                  <div routerLinkActive="bg-gray-100 text-black" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-logout-circle-line text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Déconnexion</span>
                  </div>
                </button>
              </nav>
            </div>
            <div class="flex flex-1">
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
    `
})
export class AuthenticatedLayoutComponent implements OnInit {
  constructor(private auth: AuthService, public localStorage: LocalStorageService) { }

  ngOnInit() { }

  logoutUser() {
    this.auth.logout();
  }
}