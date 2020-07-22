import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevsecSharedModule } from 'app/shared/shared.module';
import { MesContactsComponent } from './mes-contacts.component';
import { MesContactsDetailComponent } from './mes-contacts-detail.component';
import { MesContactsUpdateComponent } from './mes-contacts-update.component';
import { MesContactsDeleteDialogComponent } from './mes-contacts-delete-dialog.component';
import { mesContactsRoute } from './mes-contacts.route';

@NgModule({
  imports: [DevsecSharedModule, RouterModule.forChild(mesContactsRoute)],
  declarations: [MesContactsComponent, MesContactsDetailComponent, MesContactsUpdateComponent, MesContactsDeleteDialogComponent],
  entryComponents: [MesContactsDeleteDialogComponent],
})
export class DevsecMesContactsModule {}
