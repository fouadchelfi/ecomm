import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonHttpService } from '../services';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Pipe({
    name: 'appAlgeriaCity'
})
export class AlgeriaCityPipe implements PipeTransform {

    constructor(private commonHttp: CommonHttpService) { }

    transform(code: string): Observable<any> {
        return this.commonHttp.cityByPostCode(code).pipe(
            map(city => city.name),
            catchError(() => of(null)) // Handle errors by returning null
        );
    }
}