import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: `
      
      <!-- Products Section -->
      <section>
        <div class="relative flex flex-wrap px-32 py-12 mt-12">
          <app-product-item *ngFor="let product of products" href="#" class="w-1/4"></app-product-item>
        </div>
      </section>

      <!-- Features Section -->
      <section>
        <div class="flex flex-wrap justify-center px-24 py-10 shadow mt-9">
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
            <a routerLink="/" *ngFor="let category of categories; let i = index;" class="px-16 py-3 w-64 text-center rounded border hover:border-none text-base border-gray-300 hover:bg-accent cursor-pointer !text-black">
              <span>Category ({{  categories.length * (i * 2) / 10 + 5 }})</span>
            </a>
          </div>
        </div>
      </section>
    `
})
export class HomePageComponent implements OnInit {

  products: any[] = new Array(20);
  categories: any[] = new Array(15);

  constructor() {
  }
  ngOnInit() {
  }
}