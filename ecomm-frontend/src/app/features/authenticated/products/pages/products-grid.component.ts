import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductsHttpService } from '../../../../shared';
import { catchError, map, merge, Observable, of as observableOf, startWith, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-products-grid',
    template: `
        <div class="flex flex-col flex-1">
            <div class="flex flex-row justify-between items-center px-6 py-4">
                <div class="text-xl font-medium text-black">Produits</div>
                <button mat-flat-button color="primary" (click)="newItem()"><i class="ri-add-line text-lg"></i> Nouveau Produit</button>
            </div>
             <div class="flex flex-col m-6 shadow">
                <div class="max-h-[calc(100vh-300px)] overflow-auto">
                    <table mat-table [dataSource]="data"
                        matSort matSortActive="id" matSortDisableClear matSortDirection="desc">

                        <ng-container matColumnDef="name">
                            <th mat-header-cell *matHeaderCellDef>Produit</th>
                            <td mat-cell *matCellDef="let row">{{row.name}}</td>
                        </ng-container>
                        <ng-container matColumnDef="oldPrice">
                            <th mat-header-cell *matHeaderCellDef>Ancien Prix</th>
                            <td mat-cell *matCellDef="let row">{{row.oldPrice}}</td>
                        </ng-container>
                        <ng-container matColumnDef="newPrice">
                            <th mat-header-cell *matHeaderCellDef>Nouveau Prix</th>
                            <td mat-cell *matCellDef="let row">{{row.newPrice}}</td>
                        </ng-container>
                        <ng-container matColumnDef="showAsDiscount">
                            <th mat-header-cell *matHeaderCellDef>Réduction</th>
                            <td mat-cell *matCellDef="let row">
                                <div *ngIf="row.showAsDiscount" class="px-2 py-1 w-fit bg-red-100 text-red-600 rounded font-medium !text-sm min-w-24 text-center">Remise</div>
                                <div *ngIf="!row.showAsDiscount" class="px-2 py-1 w-fit bg-gray-100 text-gray-600 rounded font-medium !text-sm min-w-24 text-center">Prix Normal</div>
                            </td>
                        </ng-container>
                        <ng-container matColumnDef="showQuantityInStock">
                            <th mat-header-cell *matHeaderCellDef>Afficher la Quantité en Stock</th>
                            <td mat-cell *matCellDef="let row">
                                <div *ngIf="row.showQuantityInStock" class="px-2 py-1 w-fit bg-blue-100 text-primary rounded font-medium !text-sm min-w-24 text-center">Visible</div>
                                <div *ngIf="!row.showQuantityInStock" class="px-2 py-1 w-fit bg-orange-100 text-orange-600 rounded font-medium !text-sm min-w-24 text-center">Cachée</div>
                            </td>
                        </ng-container>
                        <ng-container matColumnDef="quantityInStock">
                            <th mat-header-cell *matHeaderCellDef>Quantité en Stock</th>
                            <td mat-cell *matCellDef="let row">{{row.quantityInStock}}</td>
                        </ng-container>
                        <ng-container matColumnDef="image">
                            <th mat-header-cell *matHeaderCellDef>Image</th>
                            <td mat-cell *matCellDef="let row">
                                <img [src]="row.image" alt="row.name" class="rounded-full w-9 h-9">
                            </td>
                        </ng-container>
                        <ng-container matColumnDef="category.name">
                            <th mat-header-cell *matHeaderCellDef>Catégorie</th>
                            <td mat-cell *matCellDef="let row">{{row.category.name}}</td>
                        </ng-container>

                        <!-- Actions Column -->
                        <ng-container matColumnDef="actions">
                            <th mat-header-cell *matHeaderCellDef class="!text-center w-20 ">Action</th>
                            <td mat-cell *matCellDef="let item, let i = index">
                                <div class="flex flex-row items-center">
                                    <button mat-icon-button (click)="copyLandingCheckoutLink(item.id)" [matTooltip]="'Copier le lien'"><i class="ri-link-m text-primary"></i></button>
                                    <button mat-icon-button (click)="goToLandingCheckout(item.id)" [matTooltip]="'Aperçu'"><i class="ri-eye-line text-green-500"></i></button>
                                    <button mat-icon-button (click)="newItem('edit', item.id)" [matTooltip]="'Modifier'"><i class="ri-pencil-line"></i></button>
                                    <button mat-icon-button (click)="deleteItem(item.id)" [matTooltip]="'Supprimer'"><i class="ri-delete-bin-6-line text-red-600"></i></button>
                                </div>
                            </td>
                        </ng-container>

                        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky:true"></tr>
                        <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="hover:bg-gray-50"></tr>
                    </table>
                </div>
                <mat-paginator [pageSizeOptions]="[5, 10, 20, 30, 50, 100]" [length]="resultsLength" [pageSize]="20" [showFirstLastButtons]="true" aria-label="Select page of GitHub search results"></mat-paginator>

             </div>

        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`app-products-grid{ display: flex; flex: 1; }`]
})
export class ProductsGridComponent implements OnInit, AfterViewInit {


    displayedColumns: string[] = ['name', 'category.name', 'oldPrice', 'newPrice', 'showAsDiscount', 'showQuantityInStock', 'quantityInStock', 'image', 'actions'];
    data: any[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    refresh = new EventEmitter<void>();


    constructor(
        private productsHttp: ProductsHttpService,
        private snackbar: MatSnackBar,
        private router: Router,
        private clipboard: Clipboard
    ) { }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

        merge(this.sort.sortChange, this.paginator.page, this.refresh)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.productsHttp!.paginateProducts(
                        this.sort.active,
                        this.sort.direction,
                        this.paginator.pageIndex,
                        this.paginator.pageSize,
                    ).pipe(catchError(() => observableOf(null)));
                }),
                map(res => {
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = (<[]>res?.items)?.length == 0;

                    if (res?.items === null) {
                        return [];
                    }

                    // Only refresh the result length if there is new items. In case of rate
                    // limit errors, we do not want to reset the paginator to zero, as that
                    // would prevent users from re-triggering requests.
                    this.resultsLength = res?.totalCount;
                    return res?.items;
                }),
            )
            .subscribe(data => (this.data = data));
    }
    ngOnInit() {

    }

    newItem(mode: 'creation' | 'edit' = 'creation', id: any = 0) {
        this.router.navigate([`/authenticated/products/${mode}/${id}`]);
    }

    deleteItem(id: any) {
        if (confirm("Êtes-vous sûr de l'avoir fait?")) {
            this.productsHttp.deleteProduct(id).subscribe({
                next: res => {
                    this.refresh.emit();
                    this.snackbar.open('La suppression a été réussie', '✅', { duration: 6000 });
                }
            });
        }
    }

    copyLandingCheckoutLink(id: any) {
        this.clipboard.copy(`${environment.websiteUrl}/#/landing/checkout/${id}`);
    }

    goToLandingCheckout(id: any) {
        this.router.navigate([`/landing/checkout/${id}`]);
    }
}