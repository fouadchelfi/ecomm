import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CheckoutService, CommonHttpService, DeliveryHttpService, OrdersHttpService, ProductsHttpService, parseFloatOrZero } from '../../../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { LangService } from '../../../core';

@Component({
  selector: 'app-landing-checkout',
  template: `
        <div class="flex flex-col flex-1 overflow-x-hidden">
          <div class="flex flex-row items-center bg-gray-100 py-4 px-2 sm:px-9 md:px-32">
            <div class="flex flex-wrap items-center gap-x-2 mt-2 text-lg">
              <h4>{{'LANDING.HOME'|translate}}</h4>
              <span class="mb-4">/</span>
              <h4 class="!text-lg !text-black">{{ currentProduct?.name }}</h4>
            </div>
          </div>
          <section>
            <div *ngIf="currentProduct" class="flex flex-wrap items-start px-1 sm:px-9 md:px-10 xl:px-32 py-3 md:py-10">
              <div class="flex flex-col w-full md:w-1/2 py-7 px-1 md:px-6 gap-y-8">
                <img [src]="currentImage" alt="produit" class="w-full h-full max-h-[500px] rounded">
                <div class="flex flex-wrap gap-3">
                  <img (click)="setCurrentImage(image)" *ngFor="let image of images" [src]="image"
                    [alt]="currentProduct.name  + 'image'" class="w-32 h-32 rounded cursor-pointer hover:border hover:border-gray-400">
                </div>
              </div>
              <div class="flex flex-col w-full md:w-1/2 py-7 px-2 md:px-6 gap-y-5">
                <h2 class="!text-4xl !text-black !font-semibold !-mb-1">{{ currentProduct?.name }}</h2>
                <div class="flex flex-row items-center gap-x-2">
                  <span class="text-primary text-2xl font-bold">{{ currentProduct?.oldPrice }}</span>
                  <s class="!text-base">{{ currentProduct?.newPrice }}</s>
                </div>
                <div *ngIf="currentProduct.showQuantityInStock" class="flex flex-row gap-x-1 text-dark-txt">
                  <i class="ri-checkbox-circle-line text-green-500 text-lg"></i>
                  <span class="text-base">{{ currentProduct?.quantityInStock }} en stock</span>
                </div>
                <p [innerHTML]="currentProduct?.description" class="!text-base"></p>
                <div *ngIf="errors.length > 0"
                  class="flex flex-col gap-y-1 bg-red-100 my-4 mx-3 sm:mx-9 md:mx-32 px-4 py-3 w-fit rounded-sm text-red-600">
                  <li *ngFor="let error of errors">{{ error }}</li>
                </div>
                <form [formGroup]="checkoutFormGroup" class="flex flex-col gap-y-3 flex-1">
                    <input type="number" formControlName="id" class="!hidden">
                    <my-form-field>
                      <my-label class="!text-black !text-xl !font-medium " [required]="true">{{'LANDING.FULLNAME'|translate}}</my-label>
                      <input #fullnameField myInput formControlName="fullname">
                      <my-error
                        *ngIf="checkoutFormGroup.get('fullname')?.invalid && (checkoutFormGroup.get('fullname')?.dirty || checkoutFormGroup.get('fullname')?.touched) && checkoutFormGroup.get('fullname')?.getError('required')">
                        {{'COMMON.VALIDATION.OBLIGATORY_FIELD'|translate}}
                      </my-error>
                    </my-form-field>
                    <my-form-field>
                      <my-label class="!text-black !text-xl !font-medium" [required]="true">{{'LANDING.PHONE_NUMBER'|translate}}</my-label>
                      <input myInput formControlName="phoneNumber">
                      <my-error
                        *ngIf="(checkoutFormGroup.get('phoneNumber')?.dirty || checkoutFormGroup.get('phoneNumber')?.touched) && checkoutFormGroup.get('phoneNumber')?.getError('required')">
                        {{'COMMON.VALIDATION.OBLIGATORY_FIELD'|translate}}</my-error>
                    </my-form-field>
                    <div class="flex flex-wrap items-center gap-x-2">
                      <my-form-field class="w-full md:w-[calc(50%-8px)]">
                      <my-label class="!text-black !text-xl !font-medium" [required]="true">{{'LANDING.PROVINCE'|translate}}</my-label>
                      <select formControlName="province" myInput size="small" class="!h-12">
                        <ng-container *ngFor="let province of algeriaProvinces">
                          <option [value]="province.code">{{ province.ar_name }}</option>
                        </ng-container>
                      </select>
                      <my-error
                        *ngIf="(checkoutFormGroup.get('province')?.dirty || checkoutFormGroup.get('province')?.touched) && checkoutFormGroup.get('province')?.getError('required')">
                        {{'COMMON.VALIDATION.OBLIGATORY_FIELD'|translate}}</my-error>
                    </my-form-field>

                    <my-form-field class="w-full md:w-[calc(50%-8px)]">
                      <my-label class="!text-black !text-xl !font-medium" [required]="true">{{'LANDING.CITY'|translate}}</my-label>
                      <select formControlName="city" myInput size="small" class="!h-12">
                        <ng-container *ngFor="let city of selectedProvinceCities">
                          <option [value]="city.post_code">{{ city.ar_name }}</option>
                        </ng-container>
                      </select>
                      <my-error
                        *ngIf="(checkoutFormGroup.get('city')?.dirty || checkoutFormGroup.get('city')?.touched) && checkoutFormGroup.get('city')?.getError('required')">
                        {{'COMMON.VALIDATION.OBLIGATORY_FIELD'|translate}}</my-error>
                    </my-form-field>
                    </div>
                    <my-form-field>
                      <my-label class="!text-black !text-xl !font-medium" [required]="true">{{'LANDING.ADDRESS'|translate}}</my-label>
                      <input myInput formControlName="address">
                      <my-error
                        *ngIf="(checkoutFormGroup.get('address')?.dirty || checkoutFormGroup.get('address')?.touched) && checkoutFormGroup.get('address')?.getError('required')">
                        {{'COMMON.VALIDATION.OBLIGATORY_FIELD'|translate}}</my-error>
                    </my-form-field>
                    <my-form-field>
                      <my-label class="!text-black !text-xl !font-medium" [required]="true">{{'LANDING.DELIVERY'|translate}}</my-label>
                      <select formControlName="deliveryDestination" myInput size="small" class="!h-12">
                           <option value="officeDelivery">{{'LANDING.OFFICE_DELIVERY'|translate}}</option>
                          <option value="homeDelivery">{{'LANDING.HOME_DELIVERY'|translate}}</option>
                      </select>
                      <my-error
                        *ngIf="(checkoutFormGroup.get('deliveryDestination')?.dirty || checkoutFormGroup.get('deliveryDestination')?.touched) && checkoutFormGroup.get('deliveryDestination')?.getError('required')">
                        {{'COMMON.VALIDATION.OBLIGATORY_FIELD'|translate}}</my-error>
                    </my-form-field>
                    <div class="flex flex-col gap-y-1">
                      <span class="text-base font-medium text-black">{{'LANDING.QUANTITY'|translate}}</span>
                      <div class="relative flex flex-row w-fit shadow-sm border rounded-full overflow-hidden">
                        <button (click)="decreaseQuantity()" class="h-12 w-16 px-4 bg-accent hover:bg-yellow-500"><i
                            class="ri-subtract-line text-black text-lg"></i></button>
                        <input formControlName="quantity" type="number"
                          class="border-none text-black text-center px-3 w-24 text-base font-medium">
                        <button (click)="increaseQuantity()" class="h-12 w-16 px-4 bg-accent hover:bg-yellow-500"><i
                            class="ri-add-line text-black text-lg"></i></button>
                      </div>
                    </div>
                    <div class="flex flex-col gap-y-3 bg-gray-50 rounded-md px-3 py-6 mt-3 overflow-hidden">
                      <div class="flex flex-row items-center justify-between">
                        <h5 class="!text-lg text-black !font-medium">{{'LANDING.PRODUCT'|translate}}</h5>
                        <h5 class="!text-lg text-black !font-medium">{{'LANDING.TOTAL'|translate}}</h5>
                      </div>
                      <div class="border-b border-b-gray-200"></div>
                      <div class="flex-row justify-between items-center mt-3 !hidden">
                        <h3>{{'LANDING.DELIVERY_COST'|translate}}</h3>
                        <input formControlName="deliveryCost" class="text-2xl text-right bg-gray-300 mb-4">
                        <my-error
                          *ngIf="(checkoutFormGroup.get('deliveryCost')?.dirty || checkoutFormGroup.get('deliveryCost')?.touched) && checkoutFormGroup.get('deliveryCost')?.getError('required')">
                          {{'COMMON.VALIDATION.OBLIGATORY_FIELD'|translate}}</my-error>
                      </div>
                      <div class="flex flex-row justify-between items-center">
                        <h3 class="min-w-24">{{"LANDING.SALE_PRICE"|translate}}</h3>
                        <input formControlName="salePrice" class="!hidden">
                        <span class="text-lg font-medium text-right mb-4 text-black">{{checkoutFormGroup.get('salePrice')?.value}}</span>
                      </div>
                      <div class="border-b border-b-gray-200"></div>
                      <div class="flex flex-row items-center justify-between">
                        <h4>{{'LANDING.DELIVERY_COST'|translate}}</h4>
                        <input formControlName="deliveryCost" type="number" class="!hidden">
                        <span
                          class="text-accent text-lg font-medium bg-transparent text-right">{{ checkoutFormGroup.get('deliveryCost')?.value|number:'1.2-2' }}</span>
                      </div>
                      <div class="border-b border-b-gray-200"></div>
                      <div class="flex flex-row items-center justify-between">
                        <h3 class="!text-2xl !text-black">{{'LANDING.TOTAL'|translate}}</h3>
                        <input formControlName="total" type="number" class="!hidden">
                        <span
                          class="!text-3xl !font-medium text-primary">{{ checkoutFormGroup.get('total')?.value|number:'1.2-2' }}</span>
                      </div>
                      <div>
                        <mat-radio-button checked class="-ml-2">
                          <span class="text-lg">{{'LANDING.COD'|translate}}</span>
                        </mat-radio-button>
                        <button mat-flat-button color="primary" (click)="saveOrder()"
                          class="!h-14 !w-full !text-xl mt-5"><div>{{ 'LANDING.ORDER_NOW'|translate }}</div></button>
                      </div>
                    </div>
                </form>
              </div>
            </div>
          </section>
        </div>
    `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
      app-landing-checkout { display: flex; flex: 1; }
    `],
})
export class LandingCheckoutComponent implements OnInit, AfterViewInit, OnDestroy {

  checkoutFormGroup: FormGroup;
  @ViewChild('fullnameField') fullnameField: ElementRef;
  algeriaProvinces: any[] = [];
  selectedProvinceCities: any[] = [];
  errors: string[] = [];
  images: string[] = [];
  currentImage: string;
  currentProduct: any;
  params: { id: any };

  constructor(
    private checkout: CheckoutService,
    private fb: FormBuilder,
    private productsHttp: ProductsHttpService,
    private ordersHttp: OrdersHttpService,
    private router: Router,
    private snackBar: MatSnackBar,
    private deliveryHttp: DeliveryHttpService,
    private activatedRoute: ActivatedRoute,
    private title: Title,
    private commonHttp: CommonHttpService,
    private lang: LangService
  ) {
    this.checkoutFormGroup = this.fb.group({
      'id': [undefined],
      'fullname': ['', [Validators.required]],
      'province': ['', [Validators.required]],
      'city': ['', [Validators.required]],
      'address': ['', [Validators.required]],
      'phoneNumber': ['', [Validators.required]],
      'deliveryDestination': ['homeDelivery', [Validators.required]],
      'deliveryCost': [{ value: 0, disabled: true }, [Validators.required]],
      'quantity': [1, [Validators.required]],
      'salePrice': [{ value: 0, disabled: true }, [Validators.required]],
      'total': [0, [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.lang.setLang('fr');
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.fullnameField?.nativeElement.focus();
    }, 200);
  }

  ngOnInit() {

    this.checkoutFormGroup.get('province')?.valueChanges.subscribe({
      next: province => {

        this.commonHttp.citiesByProvinceId(province).subscribe({
          next: cities => {
            this.selectedProvinceCities = cities;
          }
        });

        this.deliveryHttp.getDeliveryPrice(province).subscribe({
          next: provincePrice => {
            this.setDeliveryPrice(
              this.checkoutFormGroup.get('deliveryDestination')?.value,
              provincePrice
            );

            this.calcTotal();
          }
        })
      }
    });

    this.checkoutFormGroup.get('deliveryDestination')?.valueChanges.subscribe({
      next: deliveryDestination => {
        this.deliveryHttp.getDeliveryPrice(this.checkoutFormGroup.get('province')?.value).subscribe({
          next: provincePrice => {

            this.setDeliveryPrice(
              this.checkoutFormGroup.get('deliveryDestination')?.value,
              provincePrice
            );

            this.calcTotal();

          }
        })
      }
    });

    this.activatedRoute.paramMap.subscribe({
      next: params => {
        this.params = { id: params.get('id') };
        if (this.params && this.params?.id) {
          this.productsHttp.getProduct(this.params.id).subscribe({
            next: product => {
              this.currentProduct = product;

              this.title.setTitle(`${environment.websiteName} | ${this.currentProduct?.name}`);

              //Handling images.
              this.images = [];
              this.images.push(product?.image);
              this.currentImage = product?.image;
              (this.currentProduct.images as any[]).forEach(image => {
                this.images.push(image?.content);
              });

              this.checkoutFormGroup.get('salePrice')?.patchValue(this.currentProduct.newPrice);

              this.calcTotal();
            }
          });
        }
      }
    });

    this.checkoutFormGroup.get('quantity')?.valueChanges.subscribe({
      next: quantity => {
        this.calcTotal();
      }
    });

    this.commonHttp.allProvinces().subscribe({
      next: all => {
        this.algeriaProvinces = all;
      }
    });

    this.lang.setLang('ar');
  }

  saveOrder() {
    if (this.checkoutFormGroup.valid) {
      let order = {
        ...this.checkoutFormGroup.getRawValue(),
        sinfo: localStorage.getItem('sinfo'),
        status: 'En attente',
        items: [{
          productId: this.params.id,
          quantity: this.checkoutFormGroup.get('quantity')?.getRawValue(),
          amount: this.checkoutFormGroup.get('total')?.getRawValue(),
          salePrice: parseFloatOrZero(this.checkoutFormGroup.get('salePrice')?.getRawValue()),
        }]
      }
      this.ordersHttp.createOrder(order).subscribe({
        next: (result) => {
          if (result.success) {
            this.snackBar.open('تم التسجيل بنجاح، سنتصل بك في أقرب وقت', '✅', { duration: 10000 });
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

  calcTotal() {
    let quantity = parseFloatOrZero(this.checkoutFormGroup.get('quantity')?.value);
    let salePrice = parseFloatOrZero(this.checkoutFormGroup.get('salePrice')?.value);
    let deliveryCost = parseFloatOrZero(this.checkoutFormGroup.get('deliveryCost')?.value);
    this.checkoutFormGroup.get('total')?.setValue(quantity * salePrice + deliveryCost);
  }

  decreaseQuantity() {
    this.checkoutFormGroup.get('quantity')?.setValue(parseFloatOrZero(this.checkoutFormGroup.get('quantity')?.value) - 1)
  }

  increaseQuantity() {
    this.checkoutFormGroup.get('quantity')?.setValue(parseFloatOrZero(this.checkoutFormGroup.get('quantity')?.value) + 1)
  }

  setCurrentImage(image: string) {
    this.currentImage = image;
  }

  setDeliveryPrice(destination: any, provincePrice: any) {
    if (destination == 'homeDelivery') {
      this.checkoutFormGroup.get('deliveryCost')?.setValue(parseFloatOrZero(provincePrice.homeDeliveryPrice));
    } else {
      this.checkoutFormGroup.get('deliveryCost')?.setValue(parseFloatOrZero(provincePrice.officeDeliveryPrice));
    }
  }
}