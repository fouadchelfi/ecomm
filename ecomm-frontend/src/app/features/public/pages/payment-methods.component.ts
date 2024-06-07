import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-payment-methods',
    template: `
        <div class="flex flex-1 flex-col">
            <div class="flex flex-row items-center bg-gray-100 py-3 px-32 mb-8">
                <div class="flex flex-wrap items-center gap-x-2 mt-2 text-lg">
                    <h4>Accueil</h4>
                    <span class="mb-4">/</span>
                    <h4 class="!text-lg !text-black">Mode de paiement</h4>
                </div>
            </div>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <p class="!text-lg">Par ce que nous nous engageons à vous offrir une expérience d’achat agréable et en toute sécurité et sérénité, nous vous proposons trois (03) méthodes de paiement afin de payer vos achats : </p>
                    <h3 class="!text-2xl !text-black !font-medium mt-6">En Espèce à la livraison</h3>
                    <p class="!text-lg">
                        Paiement à la livraison (Paiement à la livraison) est l'un des modes de paiement disponibles sur notre magasin, et le paiement à la réception signifie que l'acheteur peut faire ses achats via notre boutique en ligne et choisir le produit qu'il souhaite, puis passer la commande et choisir le mode de paiement sur réception, ce qui signifie que le processus de paiement est reporté jusqu'à ce que le client reçoive le produit qu'il a commandé par voie électronique.
                        <br>
                        Nous enverrons le produit au lieu convenu (ville, quartier, domicile ou autre lieu), puis le paiement sera effectué. </p>
                    <mat-divider class="!mt-4"></mat-divider>
                </div>
            </section>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">Paiement par CCP/BaridiMOB</h3>
                    <p class="!text-lg">
Le paiement par CCP ou BaridiMOB est l'un des modes de paiement disponibles sur notre boutique, et le paiement s'effectue en transférant le montant convenu sur notre compte CCP/BaridiMOB, puis le produit est envoyé à l'endroit convenu.                </p>
                    <mat-divider class="!mt-4"></mat-divider>
                </div>
            </section>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">Bons d’achat (Voucher)</h3>
                    <p class="!text-lg">
                        Ce mode de paiement vous permet de payer la totalité ou une partie de votre commande en utilisant les bons d’achats émis par le site. Dans le cas d’un paiement partiel de votre commande, vous pouvez payer le montant restant en espèce à livraison.
                    </p>
                </div>
            </section>
        </div>
    `
})
export class PaymentMethodsComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}