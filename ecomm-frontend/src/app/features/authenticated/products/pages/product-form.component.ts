import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesHttpService, ProductsHttpService } from '../../../../shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-product-form',
  template: `
        <div class="flex flex-col flex-1">
          <div class="flex flex-row items-center p-5">
            <div class="text-black font-medium text-xl">
              {{ params.mode == 'creation' ? 'Nouveau Produit' : 'Modifier Catégorie' }}
            </div>
          </div>
          <div *ngIf="errors.length > 0"
            class="flex flex-col gap-y-1 bg-red-100 my-4 mx-5 px-4 py-3 w-fit rounded-sm text-red-600">
            <li *ngFor="let error of errors">{{ error }}</li>
          </div>
          <form [formGroup]="productFormGroup" class="flex flex-col gap-y-2 mt-6 px-5">
            <mat-tab-group animationDuration="0ms">
              <mat-tab label="Informations">
                <div class="!my-8">
                  <input formControlName="id" class="!hidden" type="number">
                  <my-form-field>
                    <my-label [required]="true">Nom du produit</my-label>
                    <input #nameField myInput formControlName="name" class="!w-96">
                    <my-error
                      *ngIf="(productFormGroup.get('name')?.dirty || productFormGroup.get('name')?.touched) && productFormGroup.get('name')?.getError('required')">
                      Champ obligatoire</my-error>
                  </my-form-field>
                  <div class="flex flex-row items-center gap-x-3 w-fit">
                    <my-form-field>
                      <my-label [required]="true">Ancien Prix</my-label>
                      <input myInput formControlName="oldPrice" class="!w-48" type="number">
                      <my-error
                        *ngIf="(productFormGroup.get('oldPrice')?.dirty || productFormGroup.get('oldPrice')?.touched) && productFormGroup.get('oldPrice')?.getError('required')">
                        Champ obligatoire</my-error>
                      <div
                        class="absolute right-0 top-8 px-2 text-sm py-1 mx-2 font-medium text-black bg-accent rounded">
                        DA</div>
                    </my-form-field>
                    <my-form-field>
                      <my-label [required]="true">Nouveau Prix</my-label>
                      <input myInput formControlName="newPrice" class="!w-48" type="number">
                      <my-error
                        *ngIf="(productFormGroup.get('newPrice')?.dirty || productFormGroup.get('newPrice')?.touched) && productFormGroup.get('newPrice')?.getError('required')">
                        Champ obligatoire</my-error>
                      <div
                        class="absolute right-0 top-8 px-2 text-sm py-1 mx-2 font-medium text-black bg-accent rounded">
                        DA</div>
                    </my-form-field>
                  </div>
                  <mat-checkbox formControlName="showAsDiscount">Aficher en tant que promotion?</mat-checkbox>
                  <div class="flex flex-col gap-y-3">
                    <mat-checkbox formControlName="showQuantityInStock" class="w-72">Afficher la quantité au stock?
                    </mat-checkbox>
                    <my-form-field>
                      <my-label [required]="true"> Quantité en Stock</my-label>
                      <input myInput formControlName="quantityInStock" class="!w-48" type="number">
                      <my-error
                        *ngIf="(productFormGroup.get('quantityInStock')?.dirty || productFormGroup.get('quantityInStock')?.touched) && productFormGroup.get('quantityInStock')?.getError('required')">
                        Champ obligatoire</my-error>
                    </my-form-field>
                  </div>
                  <my-form-field>
                    <my-label [required]="true">Catégorie</my-label>
                    <select formControlName="categoryId" myInput size="small" class="!max-w-80">
                      <ng-container *ngFor="let category of categories|async">
                        <option [value]="category.id">{{ category.name }}</option>
                      </ng-container>
                    </select>
                    <my-error
                      *ngIf="productFormGroup.get('categoryId')?.invalid && (productFormGroup.get('categoryId')?.dirty || productFormGroup.get('categoryId')?.touched) && productFormGroup.get('categoryId')?.getError('required')">
                      Veuillez remplir ce champ.
                    </my-error>
                  </my-form-field>
                  <my-form-field class="mt-6">
                    <my-label>Description</my-label>
                    <textarea myTextarea formControlName="description" class="!w-[600px] !h-80"></textarea>
                    <my-error
                      *ngIf="(productFormGroup.get('description')?.dirty || productFormGroup.get('description')?.touched) && productFormGroup.get('description')?.getError('required')">
                      Champ obligatoire</my-error>
                  </my-form-field>
                </div>
              </mat-tab>
              <mat-tab label="Images">
                <div>
                  <div class="relative my-8">
                    <div class="flex flex-col gap-y-1">
                      <div class="text-2xl font-medium text-black my-2">La Photo Pricipale</div>
                      <label for="mainImage"
                        class="flex flex-row items-center px-4 py-2 gap-x-3 w-fit cursor-pointer rounded border border-primary bg-blue-50 hover:bg-primary hover:text-white text-primary">
                        <i class="ri-upload-2-line"></i>
                        <span>Choisissez une image</span>
                      </label>
                      <small class="text-xs"><i class="ri-information-line"></i> Choisissez l'image principale pour le
                        produit.</small>
                      <input type="file" id="mainImage" (change)="onFileSelected($event)" class="!hidden">
                    </div>
                    <textarea myInput formControlName="image" class="!hidden"></textarea>
                    <img *ngIf="productFormGroup.get('image')?.value" [src]="productFormGroup.get('image')?.value"
                      alt="Photo Principale" class="!max-h-72 !max-w-max-h-72 mt-8 rounded-xl">
                    <my-error
                      *ngIf="(productFormGroup.get('image')?.dirty || productFormGroup.get('image')?.touched) && productFormGroup.get('image')?.getError('required')">
                      Champ obligatoire</my-error>
                  </div>
                  <div class="flex flex-col gap-y-2">
                    <div class="text-2xl font-medium text-black my-2">Autres Images</div>
                    <div formArrayName="images" class="flex flex-col !gap-y-8">
                      <div *ngFor="let imageCtrl of images.controls; let i = index;">
                        <div class="flex flex-row items-center gap-x-6">
                          <input type="file" [id]="i" (change)="onFileSelectedAt($event, i)" class="!hidden">
                          <textarea myInput [formControlName]="i" class="!hidden"></textarea>
                          <div class="flex flex-col">
                            <label [for]="i"
                              class="flex flex-row items-center px-4 py-2 gap-x-3 w-fit cursor-pointer rounded border border-primary bg-blue-50 hover:bg-primary hover:text-white text-primary">
                              <i class="ri-upload-2-line"></i>
                              <span>Choisissez une image</span>
                            </label>
                            <small class="text-xs"><i class="ri-information-line"></i> Choisissez une image.</small>
                            <button (click)="removeImageAt(i)" mat-stroked-button color="warn" class="!mt-3 !border !border-warn !bg-red-50 hover:!bg-warn hover:!text-white !text-warn">Supprimer</button>
                          </div>
                          <img *ngIf="images.at(i)?.value" [src]="images.at(i).value"
                            alt="Photo Principale" class="!max-h-36 !max-w-36max-h-36 !rounded-xl !shadow-sm">
                        </div>
                      </div>
                      <button mat-stroked-button color="accent" class="!w-fit mt-8" (click)="addImageItem()">
                        <i class="ri-add-line text-lg"></i> Ajouter une Photo
                      </button>
                    </div>
                  </div>
                </div>
              </mat-tab>
            </mat-tab-group>
          </form>
          <div class="flex flex-row p-5 gap-x-6 mt-6">
            <button mat-stroked-button color="primary" routerLink="/authenticated/products">Retour</button>
            <button mat-flat-button color="primary" [disabled]="productFormGroup.invalid"
              (click)="saveProduct()">Enregistrer</button>
          </div>
        </div>
    `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
      app-product-form { display: flex; flex: 1; }
    `],
})
export class ProductFormComponent implements OnInit, AfterViewInit {

  productFormGroup: FormGroup;
  params: { mode: any, id: any };
  @ViewChild('nameField') nameField: ElementRef;
  errors: string[] = [];
  categories: Observable<any[]>;


  public get images(): FormArray {
    return this.productFormGroup.get('images') as FormArray;
  }


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productsHttp: ProductsHttpService,
    private snackbar: MatSnackBar,
    private router: Router,
    private categoriesHttp: CategoriesHttpService,
  ) {
    this.productFormGroup = this.fb.group({
      'id': [undefined],
      'name': ['', [Validators.required]],
      'oldPrice': [0, [Validators.required]],
      'newPrice': [0, [Validators.required]],
      'showAsDiscount': [false, [Validators.required]],
      'showQuantityInStock': [false, [Validators.required]],
      'quantityInStock': [0, [Validators.required]],
      'image': ['', [Validators.required]],
      'description': [''],
      'categoryId': [undefined, [Validators.required]],
      'images': this.fb.array([]),
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
    this.productFormGroup.valueChanges.subscribe({
      next: data => this.errors = [],
    });
    if (this.params.mode == 'edit') {
      this.productsHttp.getProduct(this.params.id).subscribe({
        next: (res) => {
          this.productFormGroup.patchValue({
            id: res.id,
            name: res.name,
            oldPrice: res.oldPrice,
            newPrice: res.newPrice,
            showAsDiscount: res.showAsDiscount,
            showQuantityInStock: res.showQuantityInStock,
            quantityInStock: res.quantityInStock,
            image: res.image,
            description: res.description,
            categoryId: res.categoryId,
          });
          (res.images as any[]).forEach(image => {
            this.images.push(this.fb.control(image.content));
          });
        }
      });
    }
    this.categories = this.categoriesHttp.getCategories();
  }

  saveProduct() {
    if (this.params.mode == 'creation') {
      this.productsHttp.createProduct(this.productFormGroup.getRawValue()).subscribe({
        next: res => {
          if (res.success) {
            this.snackbar.open('Création réussie!', '✅', { duration: 6000 });
            this.router.navigate(['/authenticated/products']);
          }
        },
        error: err => {
          console.log(err);
          this.errors.push(err["error"]!["errors"]!["name"]);
        }
      });
    } else {
      this.productsHttp.updateProduct(this.productFormGroup.getRawValue()).subscribe({
        next: res => {
          if (res.success) {
            this.snackbar.open(res.message, '✅', { duration: 6000 });
            this.router.navigate(['/authenticated/products']);
          }
        },
        error: err => {
          console.log(err);
          this.errors.push(err["error"]!["errors"]!["name"]);
        }
      });
    }
  }

  /**
   * Handle Principale Image Upload.
   */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      this.productFormGroup.get('image')?.patchValue(base64String);
    };
  }

  addImageItem() {
    this.images.push(this.fb.control(''));
  }
  removeImageAt(index: number) {
    this.images.removeAt(index);
  }
  onFileSelectedAt(event: any, index: number) {
    const file: File = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;
      this.images.at(index).patchValue(base64String);
    };
  }
}