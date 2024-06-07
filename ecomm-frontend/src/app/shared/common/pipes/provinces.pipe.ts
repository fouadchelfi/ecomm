import { Pipe, PipeTransform } from '@angular/core';
import { ALGERIA_PROVINCES } from '../data';

@Pipe({
    name: 'appAlgeriaProvince'
})

export class AlgeriaProvincePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return ALGERIA_PROVINCES.find(p => p.code == value)?.name;
    }
}