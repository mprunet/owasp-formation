import { Component, OnInit } from '@angular/core';
import {IOrder} from "./order";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PanierService} from "./panier.service";

@Component({
  selector: 'jhi-panier-confirm',
  templateUrl: './panier-confirm.component.html',
  styleUrls: ['./panier-confirm.component.scss']
})
export class PanierConfirmComponent implements OnInit {
  order!: IOrder;
  constructor(public activeModal: NgbActiveModal,
              protected panierService: PanierService) {

  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  placeOrder(): void {
    if (this.order) {
      this.panierService.placeOrder(this.order).subscribe(() => {
        this.activeModal.close();
      });
    }
  }
}
