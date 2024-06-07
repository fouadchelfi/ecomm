import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../shared';

@Component({
    selector: 'app-public-layout',
    template: `
        <div class="flex flex-col">
            <header>
                <div class="fixed w-screen z-[100] shadow-sm">
                <!-- Subheader with About and Contact -->
                <div
                    class="flex justify-center sm:justify-between items-center px-2 sm:px-4 md:px-24 flex-wrap bg-primary py-1">
                    <div class="text-white"><span class="text-accent">PROMOTION:</span> 60 % DE RÉDUCTION SUR LES BATTERIES DE VOITURE | UTILISEZ LE CODE "BATT60"</div>
                    <div class="max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-end">
                    <a href="#" class="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium">Qui Sommes-Nous</a>
                    <a href="tel:+213556640136" class="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium"> Appelez-nous: 0556640136</a>
                    </div>
                </div>

                <!-- Main Header -->
                <nav class="bg-white border-gray-200">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-20 items-center">
                        <div class="flex">
                        <div class="flex-shrink-0 flex items-center">
                            <a href="/" class="text-xl font-bold"><img src="assets/icons/logo-text.png" alt="logo"
                                class="h-8 sm:h-10"></a>
                        </div>
                        <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">

                        </div>
                        </div>

                        <div class="hidden sm:flex items-center">
                        <a routerLink="/auth/login"
                            class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Connexion</a>
                        <a routerLink="/checkout" class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                            <div class="relative flex flex-row items-center gap-x-1">
                            <i class="ri-shopping-cart-2-line text-xl"></i>
                            <span>Panier</span>
                            <div
                                class="absolute -top-2 -right-4 text-dark-txt bg-accent px-[6px] py-[2px] text-xs font-semibold rounded-full">
                                {{totalCardQuantity}}</div>
                            </div>
                        </a>
                        </div>

                        <div class="-mr-2 flex items-center sm:hidden">
                        <button (click)="isOpen = !isOpen" type="button"
                            class="bg-gray-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            aria-controls="mobile-menu" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        </div>
                    </div>
                    </div>

                    <!-- Mobile Menu -->
                    <div class="sm:hidden" id="mobile-menu" *ngIf="isOpen">
                    <div class="pt-2 pb-3 space-y-1">
                        <a href="#"
                        class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                        Shop
                        </a>
                        <a href="#"
                        routerLink="/auth/login"
                        class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                        Login
                        </a>
                        <a href="#"
                        class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                        Cart
                        </a>
                    </div>
                    <!-- Search Bar with Category Select for Mobile Screens -->
                  
                    </div>

                </nav>
                </div>
            </header>

            <div class="mt-[124px] min-h-44">
                <router-outlet></router-outlet>
            </div>

            <footer>
                <div class="flex flex-col mt-16 shadow-md border-t border-t-gray-100">
                <div class="flex flex-row px-24 py-14">
                    <div class="flex flex-col gap-y-6 px-6 py-4 w-[calc(30%)]">
                    <img src="assets/icons/logo-text.png" alt="logo" class="h-9 w-2/4">
                    <p class="text-base">Découvrez notre boutique Fashion pour hijab en ligne et commander les nouveaux
                        produits pour vous mesdames!</p>
                    <div class="flex flex-row gap-x-3">
                        <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><i
                            class="ri-instagram-line text-2xl hover:text-primary"></i></a>
                        <a href="http://facebook.com" class="flex flex-col gap-y-3" target="_blank" rel="noopener noreferrer"><i
                            class="ri-facebook-line text-2xl hover:text-primary"></i></a>
                        <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><i
                            class="ri-youtube-line text-2xl hover:text-primary"></i></a>
                    </div>
                    </div>
                    <div class="flex flex-col gap-y-4 px-7 py-4 w-[calc(25%)]">
                    <div class="text-lg font-semibold text-black">INFORMATIONS</div>
                    <nav class="flex flex-col gap-y-3">
                        <a routerLink="/" class="text-sm font-medium hover:text-primary">Produits</a>
                        <a routerLink="/who-we-are" class="text-sm font-medium hover:text-primary">Qui Sommes-Nous</a>
                        <a routerLink="/payment-methods" class="text-sm font-medium hover:text-primary">Mode De Paiement</a>
                        <a routerLink="/delivery-and-shipping" class="text-sm font-medium hover:text-primary">Livraison Et Expédition</a>
                        <a routerLink="/faq" class="text-sm font-medium hover:text-primary">FAQ</a>
                    </nav>
                    </div>
                    <div class="flex flex-col gap-y-4 px-7 py-4 w-[calc(25%)]">
                    <div class="text-lg font-semibold text-black">POLITIQUE</div>
                    <nav class="flex flex-col gap-y-3">
                        <a routerLink="/exchange-and-recovery" class="text-sm font-medium hover:text-primary">Echange Et Remboursement</a>
                        <a routerLink="/terms-and-conditions" class="text-sm font-medium hover:text-primary">Termes Et Conditions</a>
                        <a routerLink="/privacy-policy" class="text-sm font-medium hover:text-primary">Politique De Confidentialité</a>
                    </nav>
                    </div>
                    <div class="flex flex-col gap-y-4 px-7 py-4 w-[calc(25%)]">
                    <div class="text-lg font-semibold text-black">CONTACT</div>
                    <nav class="flex flex-col gap-y-3">
                        <a href="tel:+213556640136" class="text-sm font-medium space-x-2"><i class="ri-phone-fill text-lg"></i> <span>0556640136</span></a>
                        <a href="tel:+213792656867" class="text-sm font-medium space-x-2"><i class="ri-phone-fill text-lg"></i> <span>0792656867</span></a>
                        <a href="mailto:info@bigosnet.com" class="text-sm font-medium space-x-2"><i class="ri-mail-line text-lg"></i> <span>info&#64;bigosnet.com</span></a>
                    </nav>
                    </div>
                </div>
                <div class="flex flex-wrap justify-between items-center py-3 px-24 border-t">
                    <div>
                    <p> Droits d'auteur © 2024. Développé par
                        <span class="text-primary text-lg font-medium">bigosnet.com</span>
                    </p>
                    </div>
                    <div class="flex flex-row gap-x-3">
                    <img src="assets/icons/post-dz.png" alt="post-dz" class="h-7">
                    <img src="assets/icons/cib.png" alt="cib" class="h-7">
                    <i class="ri-visa-line text-3xl"></i>
                    <i class="ri-paypal-line text-3xl"></i>
                    </div>
                </div>
                </div>
            </footer>
        </div>
    `
})
export class PublicLayoutComponent implements OnInit {

    isOpen = false;
    visible: boolean;
    totalCardQuantity: number = 0;

    constructor(private checkout: CheckoutService) { }

    ngOnInit() {
        this.totalCardQuantity = this.checkout.totalCardQuantity();
        this.checkout.totalQuantity$.subscribe({
            next: total => {
                this.totalCardQuantity = total;
            }
        });
    }
}