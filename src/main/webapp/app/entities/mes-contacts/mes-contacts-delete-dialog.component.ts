import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMesContacts } from 'app/shared/model/mes-contacts.model';
import { MesContactsService } from './mes-contacts.service';

@Component({
  templateUrl: './mes-contacts-delete-dialog.component.html',
})
export class MesContactsDeleteDialogComponent {
  mesContacts?: IMesContacts;

  constructor(
    protected mesContactsService: MesContactsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mesContactsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('mesContactsListModification');
      this.activeModal.close();
    });
  }
}
