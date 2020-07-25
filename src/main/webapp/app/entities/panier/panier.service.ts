import { Injectable } from '@angular/core';
import {SERVER_API_URL} from "../../app.constants";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {IProduct} from "./product";
import {IOrder} from "./order";
import {IPanierItem} from "./panier-item";

type OrderResponseType = HttpResponse<IOrder>;
type ProductArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  public resourceUrl = SERVER_API_URL + 'api/order';

  constructor(protected http: HttpClient) {}

  products(): Observable<ProductArrayResponseType> {
    return this.http
      .get<IProduct[]>(this.resourceUrl+"/products", { observe: 'response' })
      .pipe(map((res: ProductArrayResponseType) => res));
  }
  save(products: IPanierItem[]) : Observable<OrderResponseType> {
    return this.http
      .post<IOrder>(this.resourceUrl + "/save", products, { observe: 'response' })
      .pipe(map((res: OrderResponseType) => res));

  }

  restore(products: IPanierItem[]) : Observable<OrderResponseType> {
    return this.http
      .post<IOrder>(this.resourceUrl + "/restore", products, { observe: 'response' })
      .pipe(map((res: OrderResponseType) => res));

  }

  order(products: IPanierItem[]) : Observable<OrderResponseType> {
    return this.http
      .post<IOrder>(this.resourceUrl + "/order", products, { observe: 'response' })
      .pipe(map((res: OrderResponseType) => res));
  }
  placeOrder(order: IOrder) : Observable<OrderResponseType> {
    const copy = Object.assign({}, order);
    return this.http
      .post<IOrder>(this.resourceUrl + "/placeOrder", copy, { observe: 'response' })
      .pipe(map((res: OrderResponseType) => res));
  }

}
