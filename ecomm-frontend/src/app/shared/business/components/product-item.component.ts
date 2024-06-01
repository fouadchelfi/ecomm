import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  template: `
        <article class="relative group border-t border-b border-r border-l border-gray-100 bg-white cursor-pointer">
          <div
            class="flex flex-col border-gray-50 hover:border-gray-300 group-hover:shadow group-hover:shadow-slate-300">
            <div class="z-40">
              <img src="assets/images/prd-2.jpg" alt="produit">
            </div>
            <div class="flex flex-col gap-y-4 p-4">
              <h3 class="text-sm !-mb-2 text-black font-semibold">Kit Brembo DT BMW</h3>
              <div class="space-x-2">
                <span class="text-lg text-primary font-semibold">13300 DZD</span>
                <s class="text-base">19000 DZD</s>
              </div>
            </div>
            <div
              class="absolute hidden group-hover:flex flex-row items-center p-4 -bottom-20 w-full z-10 h-20 bg-red border-b border-r border-l border-gray-100 !bg-white group-hover:z-50 group-hover:shadow-right-bottom group-hover:shadow-lg">
              <button mat-flat-button
                class="!bg-black hover:!bg-accent !text-accent hover:!text-black !h-14 !rounded-full !uppercase !font-medium hover:!font-semibold !w-full !px-6 animate__animated animate__fadeInUp animate__faster">
                Ajouter Au Panier
                </button>
            </div>
            <div class="absolute top-3 left-3 py-1 px-2 z-40 rounded-full text-white bg-red-600 w-fit font-medium">-30%</div>
          </div>
        </article>
    `
})
export class ProductItemComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}