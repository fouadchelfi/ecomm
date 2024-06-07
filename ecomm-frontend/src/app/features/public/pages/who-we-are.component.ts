import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-who-we-are',
    template: `
        <div class="flex flex-1 flex-col">
            <div class="flex flex-row items-center bg-gray-100 py-3 px-32 mb-8">
                <div class="flex flex-wrap items-center gap-x-2 mt-2 text-lg">
                    <h4>Accueil</h4>
                    <span class="mb-4">/</span>
                    <h4 class="!text-lg !text-black">Qui somme nous</h4>
                </div>
            </div>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">A propos</h3>
                    <p class="!text-lg">
                        Un site de vente en ligne algérien qui vous offre une expérience agréable et unique dans l'achat de nouveaux produits à des prix raisonnables.
                        Si vous voulez obtenir des produits spéciaux avant tout le monde à des prix abordables, si vous voulez présenter les meilleurs cadeaux et produits à votre famille et vos amis, si vous voulez des produits qui vous rendent la vie plus facile et agréable, vous trouverez tout cela avec nous,
                    </p>
                    <mat-divider class="!mt-4"></mat-divider>
                </div>
            </section>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">Shopping facile, rapide et passionnant</h3>
                    <p class="!text-lg">
                    Notre boutique en ligne est votre nouvelle première destination pour les achats en ligne; Nous nous engageons à vous offrir une expérience d'achat simple, rapide et passionnante. Il ne vous reste plus qu'à parcourir le site, ajouter les produits qui vous ont plu au panier, puis saisir vos données pour terminer l'achat. Alors ... votre commande est en route vers vous! </p>
                    <mat-divider class="!mt-4"></mat-divider>
                </div>
            </section>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">Prix ​​et qualité des produits</h3>
                    <p class="!text-lg">
                        Nous sommes très désireux de fournir des produits de haute qualité dans divers domaines, car vous obtiendrez exactement ce que vous voyez sur le site, toutes les images que nous utilisons sont de vraies images des produits qui vous seront envoyés, vous trouvez sur les produits du site avec différents prix raisonnables
                        Tous les produits disponibles sur le site vous sont expédiés à des prix raisonnables et nous prenons en charge l'expédition vers 58 états algériens, y compris les états du sud algérien, où l'aide en charge de la livraison vous contactera sur votre téléphone avec lequel vous avez enregistré votre commande sur le site et vous livrer le produit et payer à la réception.L'expédition est rapide et les autres sont un peu retardés en fonction de la taille de la ville et selon l'endroit où vous vous trouvez en centre-ville ou à l'extérieur.
                    </p>
                </div>
            </section>
        </div>
    `
})
export class WhoWeAreComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}