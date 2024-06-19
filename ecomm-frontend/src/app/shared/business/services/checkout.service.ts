import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const CARD_KEY = 'card';

@Injectable({ providedIn: 'root' })
export class CheckoutService {

    public items$ = new BehaviorSubject<any[]>([]);
    public totalQuantity$ = new BehaviorSubject<number>(this.totalCardQuantity());

    constructor() { }

    get cardEmpty(): boolean {
        return this.getCardItems().length == 0;
    }

    addToCard(productId: any, quantity: number, addition: boolean = false) {
        if (this.cardEmpty) {
            this.setCardItems([{ id: productId, quantity: quantity }]);
        } else {
            let items = this.getCardItems();
            let index = items.findIndex(item => item.id == productId);
            if (index == -1) {
                items.push({ id: productId, quantity: quantity });
            } else {
                if (addition) {
                    items[index] = { id: productId, quantity: items[index].quantity + quantity };
                } else {
                    items[index] = { id: productId, quantity: quantity };
                }
            }
            this.setCardItems(items);
        }
    }

    setCardItems(value: any) {
        localStorage.setItem('card', JSON.stringify(value));
        //Update
        this.items$.next(this.getCardItems());
        this.totalQuantity$.next(this.totalCardQuantity());
    }

    getCardItems(): any[] {
        return JSON.parse(localStorage.getItem(CARD_KEY) ?? '[]');
    }

    totalCardQuantity() {
        let items = this.getCardItems();
        let total = 0;
        items.forEach(item => {
            total += item.quantity;
        });
        return total;
    }

    clearCard() {
        localStorage.removeItem('card');
        this.items$.next([]);
        this.totalQuantity$.next(0);
    }
}