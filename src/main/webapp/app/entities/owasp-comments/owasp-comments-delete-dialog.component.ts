import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOwaspComments } from 'app/shared/model/owasp-comments.model';
import { OwaspCommentsService } from './owasp-comments.service';

@Component({
  templateUrl: './owasp-comments-delete-dialog.component.html',
})
export class OwaspCommentsDeleteDialogComponent {
  owaspComments?: IOwaspComments;

  constructor(
    protected owaspCommentsService: OwaspCommentsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.owaspCommentsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('owaspCommentsListModification');
      this.activeModal.close();
    });
  }
}
