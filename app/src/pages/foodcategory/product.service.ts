import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { Product } from './product';

@Injectable()
export class ProductService {
    private _productUrl = environment.uri + 'product';

    constructor(private _http: Http) {}

    getProducts(): Observable<Product[]> {
        return this._http.get(this._productUrl)
            .map((response: Response) => <Product[]> response.json())
            .do(data => console.log('All: ' +  JSON.stringify(data || null)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
