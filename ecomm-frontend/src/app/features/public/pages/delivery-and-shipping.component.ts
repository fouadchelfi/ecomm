import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-delivery-and-shipping',
    template: `
        <div class="flex flex-1 flex-col">
            <div class="flex flex-row items-center bg-gray-100 py-3 px-32 mb-8">
                <div class="flex flex-wrap items-center gap-x-2 mt-2 text-base">
                    <h4>Accueil</h4>
                    <span class="mb-4">/</span>
                    <h4 class="!text-base !text-black">Livraison et expédition</h4>
                </div>
            </div>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <p class="!text-base">
                    Après avoir confirmé l'achat, nous expédions et envoyons le produit via la méthode que vous avez choisie, soit via notre responsable d'expédition, soit via une autre service de livraison.</p>
                    <mat-divider class="!mt-4"></mat-divider>
                </div>
            </section>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">Méthodes de livraison:</h3>
                    <p class="!text-base">
                        <span class="text-black font-medium">YALIDINE Express :</span> Un service qui garantit la livraison des envois à l'adresse souhaitée dans un délai compris entre 3 et 7 jours vers les principales destinations.
                    </p>
                    <p class="!text-base"><span class="text-black font-medium">Responsable d'expédition :</span> Notre magasin passe des contrats avec un groupe d'agents d'expédition dans un groupe de villes qui livrent les produits dans un délai compris entre 1 et 3 jours</p>
                    <mat-divider class="!mt-4"></mat-divider>
                </div>
            </section>
        </div>
    `
})
export class DeliveryAndShippingComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}