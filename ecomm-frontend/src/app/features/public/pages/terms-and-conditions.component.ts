import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-terms-and-conditions',
    template: `
        <div class="flex flex-1 flex-col">
        <div class="flex flex-row items-center bg-gray-100 py-3 px-32 mb-8">
            <div class="flex flex-wrap items-center gap-x-2 mt-2 text-lg">
            <h4>Accueil</h4>
            <span class="mb-4">/</span>
            <h4 class="!text-lg !text-black">Terms & conditions</h4>
            </div>
        </div>
        <section>
            <div class="flex flex-col gap-y-1 px-32 py-8">
            <h3 class="!text-2xl !text-black !font-medium">Article 1 Définitions</h3>
            <p class="!text-lg">
                Dans les présentes conditions :
                <li> «On », « Nous », « Notre » font référence , un site de vente en ligne 100% Algérien.</li>
                <li>
                « Vous » ou « Client » font référence à toute personne physique ou morale ayant, ou espère passer une
                commande sur le site.
                </li>
                <li>
                « CGV » ou « CG » désigne les conditions générales de vente du site.
                </li>
            </p>
            <mat-divider class="!mt-4"></mat-divider>
            </div>
        </section>
        <section>
            <div class="flex flex-col gap-y-1 px-32 py-8">
            <h3 class="!text-2xl !text-black !font-medium">Articles 2 L’objet</h3>
            <p class="!text-lg">
                <li>
                1- Il est porté à la connaissance de tout CLIENT quel que soit sa nature, que les conditions générales
                mentionnées ci-dessous s’appliquent à toute commande électronique passée sur notre site ou bien
                téléphonique opérée via notre service clientèle.
                </li>
                <li>
                2- En acceptant les CGV de notre site, le client s’engage à respecter et à accepter sans réserve les
                modalités et conditions de vente, et ceux pour chaque commande passée et confirmée.

                </li>
                <li>
                3- Les conditions générales sur notre site sont soumises à des changements à tout moment, et c’est la
                responsabilité du client de les consulter et de les accepter entièrement avant de passer toute commande.
                Les CGV applicables sont celles figurant sur le Site au jour de votre commande.

                </li>
                <li>
                4- En cas de non respect des CGV par le client, ce dernier perd tout ses droits en vue des réclamations
                qu’il pourrait y avoir besoins.

                </li>
            </p>
            <mat-divider class="!mt-4"></mat-divider>
            </div>
        </section>
        <section>
            <div class="flex flex-col gap-y-1 px-32 py-8">
            <h3 class="!text-2xl !text-black !font-medium">Article 3 Prix et disponibilité</h3>
            <p class="!text-lg">
                <li>
         1-  Les prix affichés sont fixes et soumis à de possibles changements à tout moment afin de vous offrir le meilleur rapport qualité/Prix.
                </li>
                <li>
             2- Engage à assurer l’exactitude des renseignements (Disponibilité, taille, couleurs et prix ) des produits. Si postérieurement à votre commande un produit deviendrait indisponible, vous recevrez une notification via email ou téléphone de cette indisponibilité et vous donnera la possibilité de choisir entre :

                </li>
                <li>
               – Changer votre commande en choisissant d’autres tailles, couleurs ou produits.
                </li>
                <li>
                – annuler votre commande en question.
                </li>
            </p>
            <mat-divider class="!mt-4"></mat-divider>
            </div>
        </section>
        <section>
            <div class="flex flex-col gap-y-1 px-32 py-8">
            <h3 class="!text-2xl !text-black !font-medium">Article 4 Commande</h3>
            <p class="!text-lg">
                <li>
1- Afin de passer une commande, il vous suffit de soumettre votre demande directement sur notre site et ceux 24/24, 7/7. Vous recevrez un email de confirmation résumant les articles achetés ainsi que toute information relative aux coordonnées de livraison et modalité de paiement                </li>
                <li>
2- Une fois votre commande crée, vous serez contacté par un de nos chargés client par téléphone afin de confirmer vos informations et votre commande. Cependant nous vous conseillons de prendre l’initiative de confirmer par vous-même votre commande en nous contactant sur le numéro de téléphone afin d’accélérer la préparation et l’envoi de vos achats


                </li>
                <li>
3- La confirmation téléphonique est obligatoire et valable pour la première commande uniquement. Une fois livrée, votre compte sera validé et vos commandes suivantes seront automatiquement validées par le système.

                </li>
                <li>
4- Une fois votre commande expédiée, le client ne pourra plus annuler sa commande.

                </li>

                <li>
                    5- Nous se réserve le droit d’annuler votre commande pour tout motif légitime suite notamment aux cas suivant :

            <ul class="mx-8 mt-6">
                <li>
                    * Le client ne répond pas aux tentatives d’appels de notre service clientèle.

                                    </li>
                                    <li>
                    * Le client ne confirme pas sa commande.

                                    </li>
                                    <li>
                    * Le client n’a pas répondu favorablement à la livraison d’une commande antérieure.

                                    </li>

                                    <li>
                    * Un litige non encore réglé relatif à une commande antérieur.

                                    </li>

                                    <li>
                    * La suspections de fraude ou de non crédibilité du client (Adresse ou profile erroné).

                                    </li>
                                </ul>

                </li>
            </p>
            <mat-divider class="!mt-4"></mat-divider>
            </div>
        </section>
   
        </div>
    `
})
export class TermsAndConditionsComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}