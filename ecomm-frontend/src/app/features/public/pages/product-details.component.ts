import { Component, OnInit } from '@angular/core';
import { CheckoutService, ProductsHttpService, parseFloatOrZero } from '../../../shared';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-product-details',
    template: `
        <div class="flex flex-col">
            <div class="flex flex-row py-6 px-32 gap-1 text-base bg-gray-100">
                <span>Accueil</span> 
                <span>/</span> 
                <span>Catégorie</span> 
                <span>/</span> 
                <span class="text-black">{{currentProduct?.name}}</span>
            </div>
            <section>
                <div *ngIf="currentProduct" class="flex flex-wrap items-start px-32 py-10">
                <div class="flex flex-col w-1/2 py-7 px-10 gap-y-8">
                    <img [src]="currentImage" alt="produit" class="max-w-1/2 h-full max-h-[500px] rounded">
                    <div class="flex flex-wrap gap-3">
                        <img (click)="setCurrentImage(image)" *ngFor="let image of images" [src]="image" alt="produit" class="w-32 h-32 rounded cursor-pointer">
                    </div>
                </div>
                <div class="flex flex-col gap-y-5 w-1/2 py-7 px-10">
                    <h2 class="!text-4xl !text-black !font-semibold !-mb-1">{{currentProduct?.name}}</h2>
                    <div class="flex flex-row items-center gap-x-2">
                        <span class="text-primary text-2xl font-bold">{{currentProduct?.oldPrice}}</span>
                        <s class="text-base">{{currentProduct?.newPrice}}</s>
                    </div>
                    <div class="flex flex-row gap-x-1 text-dark-txt">
                        <i class="ri-checkbox-circle-line text-green-500 text-lg"></i>
                        <span class="text-base">{{currentProduct?.quantityInStock}} en stock</span>
                    </div>
                    <div [innerHTML]="currentProduct?.description"></div>
                    <div class="flex flex-col gap-y-1">
                        <span class="text-base font-medium text-black">Quantité</span>
                        <div class="relative flex flex-row w-fit border border-gray-500 rounded-full overflow-hidden">
                            <button (click)="decreaseQuantity()" class="h-12 w-16 px-4 hover:bg-accent"><i class="ri-subtract-line text-black"></i></button>
                            <input [formControl]="quantity" type="number" class="border-none text-black text-center px-3 w-24 text-base font-medium">
                            <button (click)="increaseQuantity()" class="h-12 w-16 px-4 hover:bg-accent"><i class="ri-add-line text-black"></i></button>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-x-5 mt-4">
                        <button (click)="setQuantityToCard()" mat-flat-button class="!rounded-full !h-14 !uppercase !px-10 !font-semibold !bg-accent">Ajouter Au Panier</button>
                        <button routerLink="/checkout" mat-stroked-button class="!rounded-full !h-14 !uppercase !px-10 !font-semibold">Achetez-le maintenant</button>
                    </div>
                </div>
            </div>
            </section>
            <section>
                <div *ngIf="relatedProducts|async" class="flex flex-col px-32 py-9">
                    <div class="text-4xl font-bold text-black">Produits Connexes</div>
                    <div class="relative flex flex-wrap py-12 mt-6">
                        <app-product-item
                            *ngFor="let product of relatedProducts|async"
                            routerLink="/products/{{product?.id}}"
                            [product]="product"
                            class="w-1/4">
                        </app-product-item>
                    </div>
                </div>
            </section>
        </div>
    `
})
export class ProductDetailsComponent implements OnInit {

    params: { id: any };
    relatedProducts: Observable<any[]>;
    currentProduct: any;
    currentImage: string;
    images: string[] = [];
    quantity = new FormControl(0);

    constructor(
        private productsHttp: ProductsHttpService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private checkout: CheckoutService
    ) { }
    ngOnInit() {
        this.activatedRoute.paramMap.subscribe({
            next: params => {
                this.params = { id: params.get('id') };
                if (this.params && this.params?.id) {
                    this.productsHttp.getProduct(this.params.id).subscribe({
                        next: res => {
                            this.currentProduct = res;
                            this.images.push(res.image);
                            this.currentImage = res.image;

                            this.images = [];
                            this.quantity.setValue(0);

                            (this.currentProduct.images as any[]).forEach(image => {
                                this.images.push(image.content);
                            });
                            if (this.currentProduct) this.relatedProducts = this.productsHttp.getProductsByCategoryId(this.currentProduct.categoryId);
                        }
                    });
                }
            }
        });

    }

    setCurrentImage(image: string) {
        this.currentImage = image;
    }

    decreaseQuantity() {
        this.quantity.setValue(parseFloatOrZero(this.quantity.value) - 1)
    }
    increaseQuantity() {
        this.quantity.setValue(parseFloatOrZero(this.quantity.value) + 1)
    }

    setQuantityToCard() {
        if (parseFloatOrZero(this.quantity.value) > 0) {
            this.checkout.addToCard(this.currentProduct.id, parseFloatOrZero(this.quantity.value));
        }
    }
}