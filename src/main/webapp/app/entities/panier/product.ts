
export interface IProduct {
  id: number,
  libelle: string
  prixUnitaire: number,

}

export class Product implements IProduct{
  constructor(
    public id: number,
    public libelle: string,
    public prixUnitaire: number,
  ) {}
}
