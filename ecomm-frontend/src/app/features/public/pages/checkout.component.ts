import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CheckoutService, OrdersHttpService, ProductsHttpService, currentDate, parseFloatOrZero } from '../../../shared';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALGERIA_PROVINCES } from '../../../shared/common/data/algeria-provinces';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-checkout',
    template: `
        <div class="flex flex-col flex-1">
          <div class="flex flex-row items-center bg-gray-100 py-4 px-32">
            <div class="flex flex-wrap items-center gap-x-2 mt-2 text-lg">
              <h4>Accueil</h4>
              <span class="mb-4">/</span>
              <h4 class="!text-lg !text-black">La caisse</h4>
            </div>
          </div>
          <div *ngIf="errors.length > 0"
            class="flex flex-col gap-y-1 bg-red-100 my-4 mx-32 px-4 py-3 w-fit rounded-sm text-red-600">
            <li *ngFor="let error of errors">{{ error }}</li>
          </div>
          <form [formGroup]="checkoutFormGroup" class="flex flex-wrap justify-between flex-1 px-28 py-6">
            <div class="flex flex-col w-full md:w-[calc(50%-8px)] px-2 gap-y-3">
                <my-form-field>
                    <my-label [required]="true">Nom et Prénom</my-label>
                    <input #fullnameField myInput formControlName="fullname">
                    <my-error
                      *ngIf="checkoutFormGroup.get('fullname')?.invalid && (checkoutFormGroup.get('fullname')?.dirty || checkoutFormGroup.get('fullname')?.touched) && checkoutFormGroup.get('fullname')?.getError('required')">
                      Veuillez remplir ce champ.
                    </my-error>
                </my-form-field>
                <my-form-field>
                    <my-label [required]="true">Téléphone</my-label>
                    <input myInput formControlName="phoneNumber">
                    <my-error *ngIf="(checkoutFormGroup.get('phoneNumber')?.dirty || checkoutFormGroup.get('phoneNumber')?.touched) && checkoutFormGroup.get('phoneNumber')?.getError('required')">
                    Champ obligatoire</my-error>
                </my-form-field>
                <my-form-field>
                    <my-label [required]="true">Wilaya</my-label>
                    <select formControlName="province" myInput size="small" class="!h-12">
                        <ng-container *ngFor="let province of provinces">
                        <option [value]="province.code">{{ province.name }}</option>
                        </ng-container>
                    </select>
                    <my-error *ngIf="(checkoutFormGroup.get('province')?.dirty || checkoutFormGroup.get('province')?.touched) && checkoutFormGroup.get('province')?.getError('required')">
                    Champ obligatoire</my-error>
                </my-form-field>
                <my-form-field>
                    <my-label [required]="true">Commune et Adresse de livraison</my-label>
                    <input myInput formControlName="address">
                    <my-error *ngIf="(checkoutFormGroup.get('address')?.dirty || checkoutFormGroup.get('address')?.touched) && checkoutFormGroup.get('address')?.getError('required')">Champ obligatoire</my-error>
                </my-form-field>
            </div>
            <div class="flex flex-col w-full md:w-[calc(50%-8px)] h-fit px-8 bg-gray-50 mt-5 py-6">
                <div class="flex flex-row items-center justify-between">
                    <h5 class="!text-lg text-black !font-medium">Produit</h5>
                    <h5 class="!text-lg text-black !font-medium">Total</h5>
                </div>
                <div formArrayName="items" class="flex flex-col gap-y-2 mt-4">
                    <div *ngFor="let item of items.controls; let i = index;" [formGroupName]="i" class="flex flex-col gap-y-2">
                        <div class="border-b border-b-gray-200"></div>
                        <div class="flex flex-row items-center justify-between">
                            <input formControlName="productId" class="!hidden" type="number">
                            <input formControlName="productName" class="!hidden" type="text">
                            <input formControlName="salePrice" class="!hidden" type="number">
                            <input formControlName="quantity" class="!hidden" type="number">
                            <input formControlName="amount" class="!hidden" type="number">
                            <div class="flex flex-col">
                                <h3 class="bg-transparent border-none">{{item.get('productName')?.value}}</h3>
                                <div class="flex flex-row items-center gap-x-2">
                                    <span class="text-primary !text-lg">{{item.get('salePrice')?.value|number:'1.2-2'}}</span>
                                    <span>x</span>
                                    <span class="text-base text-black">{{item.get('quantity')?.value}}</span>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <div></div>
                                <div class="self-end text-accent text-xl mt-11">{{item.get('amount')?.value|number:'1.2-2'}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="border-b border-b-gray-200"></div>
                </div>
                <div class="flex flex-row items-center justify-between py-4">
                    <h4 class="!mt-2">Frais de livraison</h4>
                    <input formControlName="deliveryCost" type="number" class="!hidden">
                    <span class="text-accent text-lg font-medium bg-transparent text-right">{{checkoutFormGroup.get('deliveryCost')?.value|number:'1.2-2'}}</span>
                </div>
                <div class="border-b border-b-gray-200"></div>
                <div class="flex flex-col py-8">
                    <div class="flex flex-row items-center justify-between">
                        <h3 class="!text-2xl">Total</h3>
                        <span class="!text-3xl !font-medium text-primary">{{total|number:'1.2-2'}}</span>
                    </div>
                    <mat-radio-button checked class="-ml-2">Cash On Delivery (COD)</mat-radio-button>
                    <button (click)="saveOrder()" mat-flat-button color="primary" class="!h-14 !mt-5 !w-fit !px-10">PASSER LA COMMANDE</button>
                </div>
            </div>
          </form>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`
      app-checkout { display: flex; flex: 1; }
    `],
})
export class CheckoutComponent implements OnInit, AfterViewInit {

    checkoutFormGroup: FormGroup;
    @ViewChild('fullnameField') fullnameField: ElementRef;
    provinces = ALGERIA_PROVINCES;
    errors: string[] = [];
    total = 0;

    public get items() {
        return this.checkoutFormGroup.get('items') as FormArray;
    }

    constructor(
        private checkout: CheckoutService,
        private fb: FormBuilder,
        private productsHttp: ProductsHttpService,
        private ordersHttp: OrdersHttpService,
        private router: Router,
        private snackBar: MatSnackBar,
    ) {
        this.checkoutFormGroup = this.fb.group({
            'id': [undefined],
            'fullname': ['', [Validators.required]],
            'province': ['', [Validators.required]],
            'address': ['', [Validators.required]],
            'phoneNumber': ['', [Validators.required]],
            'deliveryCost': [600, [Validators.required]],
            'items': this.fb.array([])
        });
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.fullnameField.nativeElement.focus();
        }, 200);
    }

    ngOnInit() {
        let totalAmount = 0;
        this.checkout.getCardItems().forEach(item => {
            this.productsHttp.getProduct(item.id).subscribe({
                next: product => {
                    this.items.push(this.fb.group({
                        'productId': item.id,
                        'productName': product.name,
                        'salePrice': product.newPrice,
                        'quantity': item.quantity,
                        'amount': parseFloatOrZero(product.newPrice) * parseFloatOrZero(item.quantity),
                    }));
                    totalAmount += parseFloatOrZero(product.newPrice) * parseFloatOrZero(item.quantity);
                    this.total = totalAmount + parseFloatOrZero(this.checkoutFormGroup.get('deliveryCost')?.value);
                }
            });
        });
    }

    saveOrder() {
        if (this.checkoutFormGroup.valid) {
            let order = {
                ...this.checkoutFormGroup.value,
                sinfo: localStorage.getItem('sinfo'),
                total: this.total,
                date: currentDate(),
                status: 'En attente',
            }
            this.ordersHttp.createOrder(order).subscribe({
                next: (result) => {
                    if (result.success) {
                        this.snackBar.open('Création réussie!', '✅', { duration: 10000 });
                        this.checkout.clearCard();
                        this.router.navigate(['/']);
                    }
                },
                error: err => {
                    console.error(err?.error?.errors);
                }
            });
        } else {
            this.checkoutFormGroup.markAllAsTouched();
        }
    }


}