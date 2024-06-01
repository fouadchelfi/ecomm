import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-new-item-button',
    template: `
        <button class="absolute right-1 top-1 text-sm text-primary">Nouveau</button>
    `
})

export class MyNewItemButtonComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}