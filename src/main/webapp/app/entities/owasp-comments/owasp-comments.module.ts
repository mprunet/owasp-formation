import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DevsecSharedModule } from 'app/shared/shared.module';
import { OwaspCommentsComponent } from './owasp-comments.component';
import { OwaspCommentsDetailComponent } from './owasp-comments-detail.component';
import { OwaspCommentsUpdateComponent } from './owasp-comments-update.component';
import { OwaspCommentsDeleteDialogComponent } from './owasp-comments-delete-dialog.component';
import { owaspCommentsRoute } from './owasp-comments.route';

@NgModule({
  imports: [DevsecSharedModule, RouterModule.forChild(owaspCommentsRoute)],
  declarations: [OwaspCommentsComponent, OwaspCommentsDetailComponent, OwaspCommentsUpdateComponent, OwaspCommentsDeleteDialogComponent],
  entryComponents: [OwaspCommentsDeleteDialogComponent],
})
export class DevsecOwaspCommentsModule {}
