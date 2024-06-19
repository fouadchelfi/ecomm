import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

const LANGS = [
    { code: 'ar', text: 'عربي', dir: 'rtl' },
    { code: 'fr', text: 'Français', dir: 'ltr' },
]

@Injectable({ providedIn: 'root' })
export class LangService {

    private langSubject = new BehaviorSubject<any>(LANGS[0]);
    lang$ = this.langSubject.asObservable();

    constructor(private translate: TranslateService) { }

    setLang(code: string) {
        this.langSubject.next(code);
        document.documentElement.dir = LANGS.find(lang => lang.code == code)?.dir ?? 'ltr';
        this.translate.setDefaultLang(code);
    }
}