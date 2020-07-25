import { Routes } from '@angular/router';
import {Authority} from "../../shared/constants/authority.constants";
import {PanierComponent} from "./panier.component";


export const panierRoute: Routes = [
  {
    path: '',
    component: PanierComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Panier',
    },
  },
];
