import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryHttpService } from '../../../../shared/business/services/delivery-http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonHttpService } from '../../../../shared';

@Component({
    selector: 'app-provinces-pricing-form',
    template: `
        <div class="flex flex-col flex-1">
            <div class="flex flex-row items-center p-5 gap-x-4">
                <div class="text-black font-medium text-xl">Livraison et Tarification</div>
                <button (click)="save()" mat-flat-button color="primary">Enregistrer</button>
          </div>
          <div *ngIf="errors.length > 0"
            class="flex flex-col gap-y-1 bg-red-100 my-4 mx-5 px-4 py-3 w-fit rounded-sm text-red-600">
            <li *ngFor="let error of errors">{{ error }}</li>
          </div>
          <div class="flex flex-col p-5">
            <form [formGroup]="provincesFormGroup">
            <div  class="flex flex-col gap-y-2">
                <div class="flex flex-col bg-white border w-fit max-h-[calc(100vh-190px)] overflow-y-hidden">
                    <div class="flex flex-row items-center bg-gray-50  !border-b">
                        <div class="py-3 px-4 text-left font-medium text-black !w-32 tracking-wider">Code</div>
                        <div class="py-3 px-4 text-left font-medium text-black !w-56 tracking-wider">Wilaya</div>
                        <div class="py-3 px-4 text-left font-medium text-black !w-56 tracking-wider">Prix de Livraison au bureau</div>
                        <div class="py-3 px-4 text-left font-medium text-black !w-56 tracking-wider">Prix de Livraison à domicile</div>
                    </div>
                    <div formArrayName="provinces" class="bg-white overflow-y-auto">
                        <ng-container *ngFor="let province of provincesFormArr.controls; let i = index;">
                            <div [formGroupName]="i" class="!p-0 !h-12 !max-w-fit">
                                <input type="text" formControlName="code" class="!h-12 !border !px-4 !w-32 !text-sm !text-black !rounded-none">
                                <input type="text" formControlName="name" class="!h-12 !border !px-4 !w-56 !text-sm !text-black !rounded-none">
                                <input type="text" formControlName="officeDeliveryPrice" class="!h-12 !border !px-4 !w-56 !text-base !font-medium !text-black !rounded-none focus:!outline-none focus:!border-primary focus:!border-2">
                                <input type="text" formControlName="homeDeliveryPrice" class="!h-12 !border !px-4 !w-56 !text-base !font-medium !text-black !rounded-none focus:!outline-none focus:!border-primary focus:!border-2">
                            </div>
                        </ng-container>
                    </div>
                </div>
            </div>
          </form>
          </div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`app-provinces-pricing-form{ display: flex; flex: 1; }`]
})
export class ProvincesPricingFormComponent implements OnInit, AfterViewInit {

    errors: string[] = [];
    provincesFormGroup: FormGroup;
    algeriaProvinces: any[] = [];

    public get provincesFormArr() {
        return this.provincesFormGroup.get('provinces') as FormArray
    }

    constructor(
        private fb: FormBuilder,
        private deliveryHttp: DeliveryHttpService,
        private snackbar: MatSnackBar,
        private commonHttp: CommonHttpService,
    ) {
        this.provincesFormGroup = this.fb.group({
            'provinces': this.fb.array([]),
        });
    }

    ngAfterViewInit(): void {

    }
    ngOnInit(): void {
        this.commonHttp.allProvinces().subscribe({
            next: all => {
                this.algeriaProvinces = all;
                this.deliveryHttp.getProvincesPrices().subscribe({
                    next: items => {
                        this.algeriaProvinces.forEach(p => {
                            this.provincesFormArr.push(this.fb.group({
                                'code': [{ value: p.code, disabled: true }, [Validators.required]],
                                'name': [{ value: p.name, disabled: true }, [Validators.required]],
                                'officeDeliveryPrice': [items.find(i => i.code == p.code)?.officeDeliveryPrice ?? 0, [Validators.required]],
                                'homeDeliveryPrice': [items.find(i => i.code == p.code)?.homeDeliveryPrice ?? 0, [Validators.required]],
                            }));
                        });
                    }
                });
            }
        });
    }

    save() {
        this.deliveryHttp.updateProvincePrice(this.provincesFormGroup.getRawValue()).subscribe({
            next: res => {
                if (res.success) {
                    this.snackbar.open('Modification réussie!', '✅', { duration: 6000 });
                } else {
                    this.snackbar.open("L'opération a échoué!", '❌', { duration: 6000 });
                }
            }
        });
    }

}