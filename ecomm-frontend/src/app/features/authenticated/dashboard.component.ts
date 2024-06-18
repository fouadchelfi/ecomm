import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    template: `
        <div class="flex flex-col flex-1">
            <div class="flex flex-row items-center px-14 py-8">
                <div class="text-xl text-black font-medium">Tableau de Bord</div>
            </div>
            <div class="flex flex-wrap flex-1 px-14 py-2 gap-5">
                <a routerLink="/authenticated/products/creation/0" mat-flat-button color="primary" class="!w-[calc(50%-28px)] !h-56">
                    <div class="flex flex-col gap-y-7 items-center">
                        <i class="ri-add-large-line !text-4xl"></i>
                        <span class="!text-xl">Nouveau Produit</span>
                    </div>
                </a>
                <a routerLink="/authenticated/categories/creation/0" mat-flat-button color="primary" class="!w-[calc(50%-28px)] !h-56">
                    <div class="flex flex-col gap-y-7 items-center">
                        <i class="ri-add-large-line !text-4xl"></i>
                        <span class="!text-xl">Nouvelle Catégorie</span>
                    </div>
                </a>
                <a routerLink="/authenticated/orders" mat-flat-button color="accent" class="!w-[calc(50%-28px)] !h-56">
                    <div class="flex flex-col gap-y-7 items-center">
                        <i class="ri-receipt-line !text-3xl"></i>
                        <span class="!text-xl">Commandes</span>
                    </div>
                </a>
                <a routerLink="/authenticated/delivery/provinces-pricing" mat-flat-button class="!w-[calc(50%-28px)] !h-56 !bg-indigo-700 !text-white">
                    <div class="flex flex-col gap-y-7 items-center">
                        <i class="ri-money-dollar-circle-line !text-4xl"></i>
                        <span class="!text-xl">Tarifs de Livraison</span>
                    </div>
                </a>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`app-dashboard{display:flex; flex:1;}`]
})
export class DashboardComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}