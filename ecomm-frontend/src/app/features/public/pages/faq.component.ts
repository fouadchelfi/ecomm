import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-faq',
    template: `
        <div class="flex flex-1 flex-col">
            <div class="flex flex-row items-center bg-gray-100 py-3 px-32 mb-8">
                <div class="flex flex-wrap items-center gap-x-2 mt-2 text-lg">
                    <h4>Accueil</h4>
                    <span class="mb-4">/</span>
                    <h4 class="!text-lg !text-black">FAQ</h4>
                </div>
            </div>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">Quand ma commande va-t-elle arriver?
</h3>
                    <p class="!text-lg">
                        Dépend de la compagnie maritime qui a été sélectionnée et responsable de la livraison, nous fournissons un groupe de responsables de l'expédition dans un groupe de grandes villes, et cela prend généralement de 1 à 3 jours à compter de la commande pour être confirmé.   </p>
                    <mat-divider class="!mt-4"></mat-divider>
                </div>
            </section>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">En cas de défaut de fabrication du produit ?
</h3>
                    <p class="!text-lg">
Vous devez revenir en arrière et lire la politique de retour pour connaître les conditions de retour et de remplacement, et en cas de défaut de fabrication, il a été convenu de retourner la valeur d'expédition à l'entreprise, ainsi que l'expédition de retour au client, mais la valeur du produit n'est pas calculée sur le client selon la politique de retour.                </p>
                    <mat-divider class="!mt-4"></mat-divider>
                </div>
            </section>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">Je veux commander de grandes quantités, y a-t-il une remise ?</h3>
                    <p class="!text-lg">
                       Le magasin propose un service de livraison de grandes quantités en cas de demande, et il y a une remise allant jusqu'à 10-20% sur certains produits.Vous pouvez nous contacter directement via la page Nous Contacter et vous renseigner sur les quantités et remises.
                    </p>
                </div>
            </section>
        </div>
    `
})

export class FaqComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}