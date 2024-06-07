import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-exchange-and-recovery',
    template: `
        <div class="flex flex-1 flex-col">
            <div class="flex flex-row items-center bg-gray-100 py-3 px-32 mb-8">
                <div class="flex flex-wrap items-center gap-x-2 mt-2 text-lg">
                    <h4>Accueil</h4>
                    <span class="mb-4">/</span>
                    <h4 class="!text-lg !text-black">Echange Et Remboursement</h4>
                </div>
            </div>
            <section>
               <div class="px-32 py-8">
                 <p class="!text-lg">
                    Dans le but d’offrir à nos chers clients la meilleure expérience d’achat en ligne possible et afin de vous satisfaire au mieux, nous assurons à tous nos clients la possibilité de retourner un ou plusieurs produits achetés sur notre site sous conditions.
                    <br>
                    Il vous suffit tout simplement de suivre et respecter les conditions générales de retour ci-dessous:
                </p>
               </div>
            </section>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-3">
                    <h3 class="!text-2xl !text-black !font-medium">Cas éligibles à l’échange de marchandise :</h3>
                    <ul>
                        <li class="!text-base"> – Problème de taille ou de pointure.</li>
                        <li class="!text-base">– Problème technique ou défaut de fabrication.</li>
                        <li class="!text-base"> – Produit ne correspond pas à l’article commandé.</li>
                    </ul>
                    <mat-divider class="!mt-4"></mat-divider>
                </div>
            </section>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">Conditions générales d’échange :</h3>
                    <p class="!text-lg">
                        La demande d’échange doit être soumise au maximum dans les 48h suivants le jour de livraison de votre commande.
                    </p>
                    <ul>
                        <li class="!text-base">– Le produit retourné doit être dans son emballage d’origine intact et en aucun cas utilisé.</li>
                        <li class="!text-base">– Le produit d’échange doit être le même que le produit retourné.</li>
                        <li class="!text-base">– En cas d’échange en raison d’une panne technique, d’un défaut de fabrication ou d’une erreur de produits, le site prend en charge tous les frais de retour et de livraison.</li>
                    </ul>
                </div>
            </section>
            <section>
                <div class="flex flex-col gap-y-1 px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">Étapes à suivre pour faire un échange :</h3>
                    <p class="!text-lg">
                        La demande d’échange doit être soumise au maximum dans les 48h suivants le jour de livraison de votre commande.
                    </p>
                    <ul>
                        <li class="!text-base">1. Faire la demande de l’échange auprès de notre service client via le téléphone ou par email.</li>
                        <li class="!text-base">2. Votre demande sera transférée à la société de livraison responsable de la récupération de l’article à échanger.</li>
                        <li class="!text-base">3. Une fois le produit retourné à notre niveau, il fera l’objet d’une procédure de vérification afin de s’assurer que ce dernier répond à toutes les conditions d’échange. Une fois confirmé, une nouvelle commande d’échange sera effectuée systématiquement et vous serez notifié.</li>
                    </ul>
                </div>
            </section>
            <section>
                <div class="px-32 py-8">
                    <h3 class="!text-2xl !text-black !font-medium">Important:</h3>
                    <p class="!text-lg">Tout retour de produit ne respectant pas une partie ou l’ensemble des conditions listées précédemment, la demande d’échange sera refusée et le client prend en charge tous les frais en conséquence.</p>
                </div>
            </section>
        </div>
    `
})
export class ExchangeAndRecoveryComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}