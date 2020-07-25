import {IPanierItem} from "./panier-item";

export interface IOrder {
  items: IPanierItem[]
  total: number,

}

export class Order implements IOrder{
  constructor(
    public items: IPanierItem[],
    public total: number,
  ) {}
}
