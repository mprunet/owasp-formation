import {Product} from "./product";

export interface IPanierItem {
  product: Product,
  quantite: number,

}

export class PanierItem implements IPanierItem{
  constructor(
    public product: Product,
    public quantite: number = 0
  ) {}
}
