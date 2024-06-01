import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesHttpService } from '../../../../shared';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-category-form',
    template: `
        <div class="flex flex-col flex-1">
            <div class="flex flex-row items-center p-5">
                <div class="text-black font-medium text-lg">{{params.mode == 'creation' ? 'Nouvelle Catégorie' : 'Modifier Catégorie'}}</div>
            </div>
            <div *ngIf="errors.length > 0" class="flex flex-col gap-y-1 bg-red-100 my-4 mx-5 px-4 py-3 w-fit rounded-sm text-red-600">
                <li *ngFor="let error of errors">{{ error }}</li>
            </div>
            <form [formGroup]="categoryFormGroup" class="mt-6 px-5">
                <my-form-field>
                    <my-label>Nom</my-label>
                    <input #nameField myInput formControlName="name" class="!max-w-72">
                    <my-error *ngIf="(categoryFormGroup.get('name')?.dirty || categoryFormGroup.get('name')?.touched) && categoryFormGroup.get('name')?.getError('required')">Champ obligatoire</my-error>
                </my-form-field>
            </form>
            <div class="flex flex-row p-5 gap-x-6">
                <button mat-stroked-button color="primary" routerLink="/authenticated/categories">Retour</button>
                <button mat-flat-button color="primary" [disabled]="categoryFormGroup.invalid" (click)="saveCategory()">Enregistrer</button>
            </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`
      app-category-form { display: flex; flex: 1; }
    `],
})
export class CategoryFormComponent implements OnInit, AfterViewInit {

    categoryFormGroup: FormGroup;
    params: { mode: any, id: any };
    @ViewChild('nameField') nameField: ElementRef;
    errors: string[] = [];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private categoriesHttp: CategoriesHttpService,
        private snackbar: MatSnackBar,
        private router: Router,
    ) {
        this.categoryFormGroup = this.fb.group({
            'name': ['', [Validators.required]]
        });
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.nameField.nativeElement.focus();
        }, 300);
    }
    ngOnInit() {
        this.params = {
            mode: this.route.snapshot.paramMap.get('mode'),
            id: this.route.snapshot.paramMap.get('id'),
        };
        this.categoryFormGroup.valueChanges.subscribe({
            next: data => this.errors = [],
        });
    }

    saveCategory() {
        if (this.params.mode == 'creation') {
            this.categoriesHttp.createCategory(this.categoryFormGroup.getRawValue()).subscribe({
                next: res => {
                    if (res.success) {
                        this.snackbar.open('Création réussie!', '✅', { duration: 6000 });
                        this.router.navigate(['/authenticated/categories']);
                    }
                },
                error: err => {
                    console.log(err);
                    this.errors.push(err["error"]["errors"]["name"]);
                }
            });
        }
    }
}