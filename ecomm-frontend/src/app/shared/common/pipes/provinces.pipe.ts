import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonHttpService } from '../services';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Pipe({
    name: 'appAlgeriaProvince'
})
export class AlgeriaProvincePipe implements PipeTransform {

    constructor(private commonHttp: CommonHttpService) { }

    transform(code: string): Observable<any> {

        console.log(code);

        return this.commonHttp.allProvinces().pipe(
            map(provinces => {
                const province = provinces.find(p => p.code === code);
                return province ? province.name : null;
            }),
            catchError(() => of(null)) // Handle errors by returning null
        );
    }
}