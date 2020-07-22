import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevsecSharedModule } from 'app/shared/shared.module';
import { RemoteFileComponent } from './remote-file.component';
import { RemoteFileDetailComponent } from './remote-file-detail.component';
import { RemoteFileDeleteDialogComponent } from './remote-file-delete-dialog.component';
import { RemoteFileNameDialogComponent } from "./remote-file-name-dialog.component";
import { remoteFileRoute } from './remote-file.route';


@NgModule({
  imports: [DevsecSharedModule, RouterModule.forChild(remoteFileRoute)],
  declarations: [RemoteFileComponent, RemoteFileDetailComponent, RemoteFileDeleteDialogComponent, RemoteFileNameDialogComponent],
  entryComponents: [RemoteFileDeleteDialogComponent, RemoteFileNameDialogComponent],
})
export class DevsecRemoteFileModule {}
