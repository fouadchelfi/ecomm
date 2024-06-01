import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-product-details',
    template: `
        <div class="flex flex-col">
            <div class="flex flex-row py-6 px-32 gap-1 text-base bg-gray-100">
                <span>Accueil</span> 
                <span>/</span> 
                <span>Catégorie</span> 
                <span>/</span> 
                <span class="text-black">Nom Produit</span>
            </div>

            <div class="flex flex-wrap items-start px-32 py-10">
                <div class="flex flex-col w-1/2 py-7 px-10">
                    <img src="assets/images/prd-2.jpg" alt="produit">
                    <div class="flex flex-row gap-x-3">
                        <img src="assets/images/prd-3.jpg" alt="produit" class="w-32 h-32 hover:border hover:border-gray-400 rounded cursor-pointer">
                        <img src="assets/images/prd-2.jpg" alt="produit" class="w-32 h-32 border border-gray-400 rounded cursor-pointer">
                        <img src="assets/images/prd-3.jpg" alt="produit" class="w-32 h-32 hover:border hover:border-gray-400 rounded cursor-pointer">
                    </div>
                </div>
                <div class="flex flex-col gap-y-5 w-1/2 py-7 px-10">
                    <h2 class="!text-4xl !text-black !font-semibold !-mb-1">Altra Industrial Motion</h2>
                    <div class="flex flex-row items-center gap-x-2">
                        <span class="text-primary text-2xl font-bold">1900.00 DZD</span>
                        <s class="text-base">13300.00 DZD</s>
                    </div>
                    <div class="flex flex-row gap-x-1 text-dark-txt">
                        <i class="ri-checkbox-circle-line text-green-500 text-lg"></i> 
                        <span class="text-base">42 in stock</span>
                    </div>
                    <div class="!text-base">
                        <p>The small round table in the dinette may be great for casual meals with your family, but inviting overnight guests.</p>
                        <p>
                            <li>Country: USA</li>
                            <li>Part Number: A123-3416</li>
                            <li>Color: White/Sliver</li>
                        </p>
                    </div>
                    <div class="flex flex-col gap-y-1">
                        <span class="text-base font-medium text-black">Quantité</span>
                        <div class="relative flex flex-row w-fit border border-gray-500 rounded-full overflow-hidden">
                            <button class="h-12 w-16 px-4"><i class="ri-subtract-line"></i></button>
                            <input value="0" type="number" class="border-none text-black text-center px-3 w-24 text-base font-medium">
                            <button class="h-12 w-16 px-4"><i class="ri-add-line"></i></button>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-x-5 mt-4">
                        <button mat-flat-button class="!rounded-full !h-14 !uppercase !px-10 !font-semibold !bg-accent">Ajouter Au Panier</button>
                        <button mat-stroked-button class="!rounded-full !h-14 !uppercase !px-10 !font-semibold">Achetez-le maintenant</button>
                    </div>
                </div>
            </div>

            <section>
                <div class="flex flex-col px-32 py-9">
                    <div class="text-4xl font-bold text-black">Produits connexes</div>
                    <div class="relative flex flex-wrap py-12 mt-6">
                        <app-product-item *ngFor="let product of products" href="#" class="w-1/4"></app-product-item>
                    </div>
                </div>
            </section>
        </div>
    `
})
export class ProductDetailsComponent implements OnInit {

    products: any[] = new Array(6);

    constructor() { }
    ngOnInit() { }
}