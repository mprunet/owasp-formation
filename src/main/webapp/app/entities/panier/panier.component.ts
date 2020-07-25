import {Component, OnInit} from '@angular/core';
import {IPanierItem, PanierItem} from "./panier-item";
import {IProduct, Product} from "./product";
import {PanierService} from "./panier.service";
import {HttpResponse} from "@angular/common/http";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PanierConfirmComponent} from "./panier-confirm.component";
import {Order} from "./order";
import {IRemoteFile} from "../../shared/model/remote-file.model";

@Component({
  selector: 'jhi-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  items: IPanierItem[] = [];
  products: IProduct[] = [
    new Product(1, "Galaxy S20+", 699),
    new Product(2, "Oreillette Bluetooth", 50),
  ];
  total = 0;

  constructor(protected panierService: PanierService, protected modalService: NgbModal) {
  }

  ngOnInit(): void {
//    this.products.forEach(p => this.items.push(new PanierItem(p, 0)));
    this.panierService.products().subscribe((res: HttpResponse<IProduct[]>) => this.fill(res));
  }
  fill(res: HttpResponse<IProduct[]>) : void {
    this.products = res.body || [];
    this.products.forEach(p => this.items.push(new PanierItem(p, 0)));
  }

  save(): void{

  }

  restore(): void{

  }

  order(): void {
    this.panierService.order(this.items).subscribe((res: HttpResponse<Order>) => this.confirm(res));
  }

  confirm(res: HttpResponse<Order>) :void {
    if (res.body) {
      const modalRef = this.modalService.open(PanierConfirmComponent, { size: 'lg', backdrop: 'static' });
      modalRef.componentInstance.order = res.body;
    }
  }


  price(item: IPanierItem) : number {
    return item.product.prixUnitaire * item.quantite;
  }

  delete(product: IPanierItem) : void{
    const idx = this.items.indexOf(product);
    if (idx >= 0) {
      this.items.splice(idx);
    }
  }

  computeTotal(): void {
    this.total = this.items.reduce((total :number, item: IPanierItem) => total + item.quantite * item.product.prixUnitaire, 0);
  }

  vider(item: IPanierItem) : void{
    item.quantite=0;
  }

}
