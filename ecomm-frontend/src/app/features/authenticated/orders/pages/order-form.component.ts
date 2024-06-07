import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ALGERIA_PROVINCES, CheckoutService, OrdersHttpService, ProductsHttpService, currentDate, parseFloatOrZero } from '../../../../shared';

@Component({
    selector: 'app-order-form',
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
          <form [formGroup]="orderFormGroup" class="flex flex-wrap justify-between flex-1 px-28 py-6">
            <div class="flex flex-col w-full md:w-[calc(50%-8px)] px-2 gap-y-3">
                <input formControlName="id" type="number" class="!hidden">
                <my-form-field>
                    <my-label [required]="true">Nom et Prénom</my-label>
                    <input myInput formControlName="fullname">
                    <my-error
                      *ngIf="orderFormGroup.get('fullname')?.invalid && (orderFormGroup.get('fullname')?.dirty || orderFormGroup.get('fullname')?.touched) && orderFormGroup.get('fullname')?.getError('required')">
                      Veuillez remplir ce champ.
                    </my-error>
                </my-form-field>
                <my-form-field>
                    <my-label [required]="true">Téléphone</my-label>
                    <input myInput formControlName="phoneNumber">
                    <my-error *ngIf="(orderFormGroup.get('phoneNumber')?.dirty || orderFormGroup.get('phoneNumber')?.touched) && orderFormGroup.get('phoneNumber')?.getError('required')">
                    Champ obligatoire</my-error>
                    <a [href]="'tel:+'+orderFormGroup.get('phoneNumber')?.value" mat-flat-button color="accent" class="!absolute !right-1 !top-[26px] !w-fit">
                        <i class="ri-phone-fill"></i> Appeler
                    </a>
                </my-form-field>
                <my-form-field>
                    <my-label [required]="true">Wilaya</my-label>
                    <select formControlName="province" myInput size="small" class="!h-12">
                        <ng-container *ngFor="let province of provinces">
                        <option [value]="province.code">{{ province.name }}</option>
                        </ng-container>
                    </select>
                    <my-error *ngIf="(orderFormGroup.get('province')?.dirty || orderFormGroup.get('province')?.touched) && orderFormGroup.get('province')?.getError('required')">
                    Champ obligatoire</my-error>
                </my-form-field>
                <my-form-field>
                    <my-label [required]="true">Commune et Adresse de livraison</my-label>
                    <input myInput formControlName="address">
                    <my-error *ngIf="(orderFormGroup.get('address')?.dirty || orderFormGroup.get('address')?.touched) && orderFormGroup.get('address')?.getError('required')">
                    Champ obligatoire</my-error>
                </my-form-field>
                <my-form-field>
                    <my-label [required]="true">État</my-label>
                    <input #statusField myInput formControlName="status" class="!border-2 !border-green-500">
                    <my-error *ngIf="(orderFormGroup.get('status')?.dirty || orderFormGroup.get('status')?.touched) && orderFormGroup.get('status')?.getError('required')">
                    Champ obligatoire</my-error>
                </my-form-field>
                <my-form-field>
                    <my-label [required]="true">Notes</my-label>
                    <textarea myTextarea formControlName="notes" class="!border-2 !border-green-500"></textarea>
                </my-form-field>
                <button (click)="saveOrder()" mat-flat-button color="primary" class="!h-14 !mt-5 !w-fit !px-10 !text-base">Enregistrer</button>
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
                    <span class="text-accent text-lg font-medium bg-transparent text-right">{{orderFormGroup.get('deliveryCost')?.value|number:'1.2-2'}}</span>
                </div>
                <div class="border-b border-b-gray-200"></div>
                <div class="flex flex-col py-8">
                    <div class="flex flex-row items-center justify-between">
                        <h3 class="!text-2xl">Total</h3>
                        <span class="!text-3xl !font-medium text-primary">{{total|number:'1.2-2'}}</span>
                    </div>
                    <mat-radio-button checked class="-ml-2">Cash On Delivery (COD)</mat-radio-button>
                </div>
            </div>
          </form>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`
      app-order-form { display: flex; flex: 1; }
    `],
})
export class OrderFormComponent implements OnInit, AfterViewInit {

    orderFormGroup: FormGroup;
    @ViewChild('statusField') statusField: ElementRef;
    provinces = ALGERIA_PROVINCES;
    errors: string[] = [];
    total = 0;
    params: { mode: any, id: any };

    public get items() {
        return this.orderFormGroup.get('items') as FormArray;
    }

    constructor(
        private checkout: CheckoutService,
        private fb: FormBuilder,
        private productsHttp: ProductsHttpService,
        private ordersHttp: OrdersHttpService,
        private router: Router,
        private snackBar: MatSnackBar,
        private activatedRoute: ActivatedRoute,
    ) {
        this.orderFormGroup = this.fb.group({
            'id': [undefined],
            'fullname': [{ value: '', disabled: true }, [Validators.required]],
            'province': [{ value: '', disabled: true }, [Validators.required]],
            'address': [{ value: '', disabled: true }, [Validators.required]],
            'phoneNumber': [{ value: '', disabled: true }, [Validators.required]],
            'status': [{ value: '', disabled: false }, [Validators.required]],
            'deliveryCost': [600, [Validators.required]],
            'notes': [''],
            'items': this.fb.array([])
        });
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.statusField.nativeElement.focus();
        }, 200);
    }

    ngOnInit() {
        this.params = {
            mode: this.activatedRoute.snapshot.paramMap.get('mode'),
            id: this.activatedRoute.snapshot.paramMap.get('id'),
        };
        this.orderFormGroup.valueChanges.subscribe({
            next: data => this.errors = [],
        });
        this.ordersHttp.getOrder(this.params.id).subscribe({
            next: order => {
                this.orderFormGroup.patchValue({
                    'id': order.id,
                    'fullname': order.fullname,
                    'province': order.province,
                    'address': order.address,
                    'phoneNumber': order.phoneNumber,
                    'status': order.status,
                    'deliveryCost': order.deliveryCost,
                    'notes': order.notes,
                });
                this.total = order.total;
                (order.items as any[]).forEach(item => {
                    this.items.push(this.fb.group({
                        'productId': item.id,
                        'productName': item.product.name,
                        'salePrice': item.sale,
                        'quantity': item.quantity,
                        'amount': item.amount,
                    }));
                });
            }
        });
    }

    saveOrder() {
        if (this.orderFormGroup.valid) {
            let order = {
                ...this.orderFormGroup.getRawValue(),
            };
            this.ordersHttp.updateOrder(order).subscribe({
                next: (result) => {
                    if (result.success) {
                        this.snackBar.open('Modification réussie!', '✅', { duration: 5000 });
                        this.router.navigate(['/authenticated/orders']);
                    }
                },
                error: err => {
                    console.error(err?.error?.errors);
                }
            });
        } else {
            this.orderFormGroup.markAsTouched();
        }
    }

}