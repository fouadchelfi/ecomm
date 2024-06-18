import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LangService, SpinnerService } from './core';
import { UserInfoService } from './shared';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
      <mat-progress-bar *ngIf="visible" mode="indeterminate" class="!absolute !top-0 !left-0"></mat-progress-bar>
      <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, AfterViewInit {

  visible: boolean;

  constructor(
    private spinner: SpinnerService,
    private cdr: ChangeDetectorRef,
    private userInfo: UserInfoService,
    private translate: TranslateService,
    private lang: LangService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    translate.setDefaultLang('fr'); // Set default language
  }

  ngOnInit(): void {
    if (!localStorage.getItem('sinfo')) localStorage.setItem('sinfo', this.userInfo.generateUUID());
  }

  ngAfterViewInit(): void {
    this.spinner.spinnerState.subscribe({
      next: visible => {
        this.visible = visible;
        this.cdr.detectChanges(); // Manually trigger change detection
      }
    });
  }
}