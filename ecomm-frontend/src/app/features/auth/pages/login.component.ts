import { Component, ElementRef, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../../shared';
import { Router } from '@angular/router';
import { AppStateService } from '../../../core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  template: `
    <div class="flex flex-1 items-center justify-center bg-gradient-to-br py-16">
      <div class="flex flex-col gap-y-1 bg-white w-[400px] h-fit p-6 mt-8 rounded shadow-md">
        <div class="flex flex-col justify-center items-center self-center gap-x-2 text-center">
          <a routerLink="/"><img src="./assets/icons/logo-text.ico" alt="logo" class="h-10" /></a>
        <div class="text-xl font-medium mt-3">Connectez-vous</div>
        </div>
        <my-global-errors *ngIf="errors.length > 0" [errors]="errors"></my-global-errors>
        <form [formGroup]="authFormGroup" class="flex flex-col gap-y-3 mt-5">
          <my-form-field>
            <my-label [required]="true">Email</my-label>
            <input #firstFocused formControlName="email" type="email" myInput autocomplete="username">
            <my-error
              *ngIf="authFormGroup.get('email')?.invalid && (authFormGroup.get('email')?.dirty || authFormGroup.get('email')?.touched) && authFormGroup.get('email')?.getError('required')">
              Veuillez remplir ce champ.
            </my-error>
          </my-form-field>
          <my-form-field>
            <my-label [required]="true">Mot de passe</my-label>
            <input formControlName="password" type="password" myInput autocomplete="new-password">
            <my-error
              *ngIf="authFormGroup.get('password')?.invalid && (authFormGroup.get('password')?.dirty || authFormGroup.get('password')?.touched) && authFormGroup.get('password')?.getError('required')">
              Veuillez remplir ce champ.
            </my-error>
          </my-form-field>
          <button (click)="login()" mat-flat-button color="primary" class="!h-12 mt-3 !text-base">Se connecter</button>
        </form>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`app-login{display: flex; flex: 1; background-color: #fcfcfc;}`],
})
export class LoginComponent implements AfterViewInit {

  authFormGroup: FormGroup;
  errors: any[] = [];
  @ViewChild('firstFocused') firstFocused: ElementRef;

  constructor(
    private authHttp: AuthHttpService,
    private router: Router,
    private fb: FormBuilder,
    private appState: AppStateService,
    private localStorage: LocalStorageService,
    private auth: AuthService,
    private matDialog: MatDialog
  ) {
    this.authFormGroup = this.fb.group({//Initialize the form and it's validations.
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.firstFocused.nativeElement.focus();
    }, 300);
  }

  login() {
    if (this.authFormGroup.valid) {
      this.authHttp.login(this.authFormGroup.getRawValue()).subscribe({
        next: res => {
          if (res.success) {
            this.localStorage.setAuthToken(res?.data?.token);
            localStorage.setItem('user', JSON.stringify(res?.data?.user));
            this.router.navigate(['/authenticated']);
          } else {
            this.errors = [res.message];
          }
        },
      });
    } else {
      this.authFormGroup.markAllAsTouched();
    }
  }
}