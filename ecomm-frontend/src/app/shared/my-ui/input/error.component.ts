import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-error',
    template: `
        <div class="relative text-red-600 text-sm">
            <ng-content></ng-content>
        </div>
    `,
})

export class MyErrorComponent implements OnInit {
    constructor() { }
    ngOnInit() { }
}