import { Component, OnInit } from '@angular/core';
import { AuthService, LocalStorageService } from '../../core';
import { OrdersHttpService } from '../../shared';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-authenticated-layout',
  template: `
        <div class="flex flex-col min-h-full">
          <div class="fixed flex flex-wrap justify-between w-screen items-center h-16 z-50 bg-white px-8 border-b">
            <div>
              <a routerLink="/" class="cursor-pointer">
                <img src="assets/icons/logo-text.png" alt="logo" class="h-10">
              </a>
            </div>
            <div class="flex flex-row items-center gap-x-2">
              <div class="flex flex-row items-center gap-x-2">
                <my-avatar [content]="localStorage.currentUsername()"></my-avatar>
                <span class="text-base uppercase font-medium">{{localStorage.currentUsername()}}</span>
              </div>
            </div>
          </div>
          <div class="flex flex-row flex-1 mt-16">
            <div class="flex flex-col fixed w-64 h-full shadow-md border-r border-gray-100">
              <nav class="flex flex-col mt-6">
                <a routerLink="/authenticated/dashboard">
                  <div routerLinkActive="bg-gray-100 text-primary" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-dashboard-3-line text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Tableau de bord</span>
                  </div>
                </a>
                <a routerLink="/authenticated/products">
                  <div routerLinkActive="bg-gray-100 text-primary" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-product-hunt-line text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Produits</span>
                  </div>
                </a>
                <a routerLink="/authenticated/categories">
                  <div routerLinkActive="bg-gray-100 text-primary" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-node-tree text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Catégories</span>
                  </div>
                </a>
                <a routerLink="/authenticated/orders">
                  <div routerLinkActive="bg-gray-100 text-primary" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-receipt-line text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Commandes</span>
                    <div *ngIf="((ordersCount$|async) ?? 0) > 0" class="px-3 py-[2px] mx-2 font-medium text-black bg-accent rounded-full">{{ordersCount$|async}}</div>
                  </div>
                </a>
                <a routerLink="/authenticated/delivery/provinces-pricing">
                  <div routerLinkActive="bg-gray-100 text-primary" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-truck-line text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Livraison</span>
                  </div>
                </a>
                <button (click)="logoutUser()">
                  <div routerLinkActive="bg-gray-100 text-primary" class="flex flex-row items-center gap-x-2 px-6 py-2 hover:bg-gray-100 group">
                    <i class="ri-logout-circle-line text-2xl group-hover:text-black"></i>
                    <span class="text-base group-hover:text-black">Déconnexion</span>
                  </div>
                </button>
              </nav>
            </div>
            <div class="flex flex-1 ml-64">
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
    `
})
export class AuthenticatedLayoutComponent implements OnInit {


  ordersCount$: Observable<number>;

  constructor(
    private auth: AuthService,
    public localStorage: LocalStorageService,
    private ordersHttp: OrdersHttpService
  ) { }

  ngOnInit() {
    this.ordersCount$ = this.ordersHttp.countOrders();
  }

  logoutUser() {
    this.auth.logout();
  }
}