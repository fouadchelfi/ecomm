import { Component, OnInit } from '@angular/core';
import { CategoriesHttpService, CheckoutService, ProductsHttpService } from '../../../shared';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home-page',
  template: `
      
      <!-- Products Section -->
      <section>
        <div class="relative flex flex-wrap px-32 py-12 mt-12">
          <app-product-item
              *ngFor="let product of products|async"
              routerLink="/products/{{product.id}}"
              [product]="product"
              class="w-1/4"
              (click)="addToCard(product.id)">
            </app-product-item>
        </div>
      </section>

      <!-- Features Section -->
      <section>
        <div class="flex flex-wrap justify-center px-24 py-10 shadow mt-14">
          <div class="flex flex-row items-center p-8 border-r">
            <div class="p-2">
              <i class="ri-megaphone-line text-7xl"></i>
            </div>
            <div class="p-2 -space-y-4">
              <h3 class="!text-lg !font-medium text-black hover:text-primary">Offre Festival</h3>
              <p class="text-base">Nouvelle Offre Spéciale En Ligne</p>
            </div>
          </div>
          <div class="flex flex-row items-center p-8 border-r">
            <div class="p-2">
              <i class="ri-24-hours-line text-7xl"></i>
            </div>
            <div class="p-2 -space-y-4">
              <h3 class="!text-lg !font-medium text-black hover:text-primary">Service 24h</h3>
              <p class="text-base">Service En Ligne 24h/24h</p>
            </div>
          </div>
          <div class="flex flex-row items-center p-8">
            <div class="p-2">
              <i class="ri-truck-line text-7xl"></i>
            </div>
            <div class="p-2 -space-y-4">
              <h3 class="!text-lg !font-medium text-black hover:text-primary">Livraison À Domicile</h3>
              <p class="text-base">Tous Le Territoire National</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section>
        <div class="flex flex-col items-center px-36 py-12 mt-12">
          <h4 class="!text-3xl !font-bold !text-black">Découvrez Nos Collections</h4>
          <div class="flex flex-wrap gap-5 mt-8 justify-center">
            <a routerLink="/" *ngFor="let category of categories|async; let i = index;" class="px-16 py-3 w-64 text-center rounded border hover:border-none text-base border-gray-300 hover:bg-accent cursor-pointer !text-black">
              <span>{{category.name}}</span>
            </a>
          </div>
        </div>
      </section>
    `
})
export class HomePageComponent implements OnInit {

  products: Observable<any[]> = of([]);
  categories: Observable<any[]> = of([]);

  constructor(
    private categoriesHttp: CategoriesHttpService,
    private productsHttp: ProductsHttpService,
    private checkout: CheckoutService
  ) { }
  ngOnInit() {
    this.categories = this.categoriesHttp.getCategories();
    this.products = this.productsHttp.getProducts();
  }

  addToCard(id: any) {
    this.checkout.addToCard(id, 1, true);
  }
}