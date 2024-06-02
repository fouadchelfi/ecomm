import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoriesHttpService } from '../../../../shared';
import { catchError, map, merge, Observable, of as observableOf, startWith, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories-grid',
    template: `
        <div class="flex flex-col flex-1">
            <div class="flex flex-row justify-between items-center px-6 py-4">
                <div class="text-xl font-medium text-black">Catégories</div>
                <button mat-flat-button color="primary" (click)="newItem()"><i class="ri-add-line text-lg"></i> Nouvelle Catégorie</button>
            </div>

             <div class="flex flex-col m-6 shadow">
                <div class="max-h-[calc(100vh-300px)] overflow-auto">
                    <table mat-table [dataSource]="data"
                        matSort matSortActive="id" matSortDisableClear matSortDirection="desc">

                        <ng-container matColumnDef="name">
                            <th mat-header-cell *matHeaderCellDef>Catégorie</th>
                            <td mat-cell *matCellDef="let row">{{row.name}}</td>
                        </ng-container>


                        <!-- Actions Column -->
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

                        <tr mat-header-row *matHeaderRowDef="displayedColumns" sticky></tr>
                        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                    </table>
                </div>
                <mat-paginator [pageSizeOptions]="[5, 10, 20, 30, 50, 100]" [length]="resultsLength" [pageSize]="20" [showFirstLastButtons]="true" aria-label="Select page of GitHub search results"></mat-paginator>

             </div>

        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`app-categories-grid{ display: flex; flex: 1; }`]
})
export class CategoriesGridComponent implements OnInit, AfterViewInit {

    displayedColumns: string[] = ['name', 'actions'];
    data: any[] = [];

    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    refresh = new EventEmitter<void>();


    constructor(
        private categoriesHttp: CategoriesHttpService,
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
                    return this.categoriesHttp!.paginateCategories(
                        this.sort.active,
                        this.sort.direction,
                        this.paginator.pageIndex,
                        this.paginator.pageSize,
                    ).pipe(catchError(() => observableOf(null)));
                }),
                map(res => {
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = (<[]>res.items).length == 0;

                    if (res.items === null) {
                        return [];
                    }

                    // Only refresh the result length if there is new items. In case of rate
                    // limit errors, we do not want to reset the paginator to zero, as that
                    // would prevent users from re-triggering requests.
                    this.resultsLength = res.totalCount;
                    return res.items;
                }),
            )
            .subscribe(data => (this.data = data));
    }
    ngOnInit() {

    }

    newItem(mode: 'creation' | 'edit' = 'creation', id: any = 0) {
        this.router.navigate([`/authenticated/categories/${mode}/${id}`]);
    }

    deleteItem(id: any) {
        if (confirm("Êtes-vous sûr de l'avoir fait?")) {
            this.categoriesHttp.deleteCategory(id).subscribe({
                next: res => {
                    this.refresh.emit();
                    this.snackbar.open('La suppression a été réussie', '✅', { duration: 6000 });
                }
            });
        }
    }
}