import { NgModule } from '@angular/core';
import { PanierComponent } from './panier.component';
import {DevsecSharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {panierRoute} from "./panier.route";
import { PanierConfirmComponent } from './panier-confirm.component';



@NgModule({
  declarations: [PanierComponent, PanierConfirmComponent],
  imports: [DevsecSharedModule, RouterModule.forChild(panierRoute)],})
export class DevSecPanierModule { }
