import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { DevsecSharedModule } from 'app/shared/shared.module';
import { DevsecCoreModule } from 'app/core/core.module';
import { DevsecAppRoutingModule } from './app-routing.module';
import { DevsecHomeModule } from './home/home.module';
import { DevsecEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    DevsecSharedModule,
    DevsecCoreModule,
    DevsecHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    DevsecEntityModule,
    DevsecAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class DevsecAppModule {}
