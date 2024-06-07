import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrdersHttpService } from '../../../../shared';
import { catchError, map, merge, Observable, of as observableOf, startWith, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-orders-grid',
    template: `
        <div class="flex flex-col flex-1">
            <div class="flex flex-row justify-start items-center px-6 py-4">
                <div class="text-xl font-medium text-black">Commandes</div>
            </div>
             <div class="flex flex-col m-6 shadow">
                <div class="max-h-[calc(100vh-300px)] overflow-auto">
                    <table mat-table [dataSource]="data"
                        matSort matSortActive="id" matSortDisableClear matSortDirection="desc">

                        <ng-container matColumnDef="fullname">
                            <th mat-header-cell *matHeaderCellDef>Nom et Prénom</th>
                            <td mat-cell *matCellDef="let row">{{row.fullname}}</td>
                        </ng-container>
                        <ng-container matColumnDef="phoneNumber">
                            <th mat-header-cell *matHeaderCellDef>phoneNumber</th>
                            <td mat-cell *matCellDef="let row">{{row.phoneNumber}}</td>
                        </ng-container>
                        <ng-container matColumnDef="address">
                            <th mat-header-cell *matHeaderCellDef>Adresse</th>
                            <td mat-cell *matCellDef="let row">{{row.address}}</td>
                        </ng-container>
                        <ng-container matColumnDef="province">
                            <th mat-header-cell *matHeaderCellDef>Wilaya</th>
                            <td mat-cell *matCellDef="let row">{{row.province|appAlgeriaProvince}}</td>
                        </ng-container>
                        <ng-container matColumnDef="total">
                            <th mat-header-cell *matHeaderCellDef>Total</th>
                            <td mat-cell *matCellDef="let row">{{row.total}}</td>
                        </ng-container>

                        <ng-container matColumnDef="quantityInStock">
                            <th mat-header-cell *matHeaderCellDef>Quantité en Stock</th>
                            <td mat-cell *matCellDef="let row">{{row.quantityInStock}}</td>
                        </ng-container>
                  
                        <ng-container matColumnDef="status">
                            <th mat-header-cell *matHeaderCellDef>status</th>
                            <td mat-cell *matCellDef="let row">
                                <div *ngIf="row.status == 'En attente'" class="px-2 py-[2px] bg-red-100 text-red-600 w-fit rounded">{{row.status}}</div>
                                <div *ngIf="row.status != 'En attente'" class="px-2 py-[2px] bg-blue-200 text-blue-600 w-fit rounded">{{row.status}}</div>
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="date">
                            <th mat-header-cell *matHeaderCellDef>Date</th>
                            <td mat-cell *matCellDef="let row">{{row.date|date:'dd/MM/yyyy'}}</td>
                        </ng-container>

                        <ng-container matColumnDef="actions">
                            <th mat-header-cell *matHeaderCellDef class="!text-center w-20 ">Action</th>
                            <td mat-cell *matCellDef="let item, let i = index">
                                <div class="flex flex-row items-center space-x-2">
                                <button mat-icon-button (click)="deleteItem(item.id)"><i
                                    class="ri-delete-bin-6-line text-red-600"></i></button>
                                <button mat-icon-button (click)="newItem('edit', item.id)"><i class="ri-pencil-line"></i></button>
                                </div>
                            </td>
                        </ng-container>

                        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky:true"></tr>
                        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                    </table>
                </div>
                <mat-paginator [pageSizeOptions]="[5, 10, 20, 30, 50, 100]" [length]="resultsLength" [pageSize]="20" [showFirstLastButtons]="true" aria-label="Select page of GitHub search results"></mat-paginator>
             </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`app-orders-grid{ display: flex; flex: 1; }`]
})
export class OrdersGridComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['fullname', 'phoneNumber', 'address', 'province', 'total', 'date', 'status', 'actions'];
    data: any[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    refresh = new EventEmitter<void>();


    constructor(
        private ordersHttp: OrdersHttpService,
        private snackbar: MatSnackBar,
        private router: Router
    ) { }

    ngAfterViewInit() {
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

        merge(this.sort.sortChange, this.paginator.page, this.refresh)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.ordersHttp!.paginateOrders(
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
        this.router.navigate([`/authenticated/orders/${mode}/${id}`]);
    }

    deleteItem(id: any) {
        if (confirm("Êtes-vous sûr de l'avoir fait?")) {
            this.ordersHttp.deleteOrder(id).subscribe({
                next: res => {
                    this.refresh.emit();
                    this.snackbar.open('La suppression a été réussie', '✅', { duration: 6000 });
                }
            });
        }
    }
}