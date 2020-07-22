import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRemoteFile } from 'app/shared/model/remote-file.model';
import { RemoteFileService } from './remote-file.service';

@Component({
  templateUrl: './remote-file-delete-dialog.component.html',
})
export class RemoteFileDeleteDialogComponent {
  remoteFile?: IRemoteFile;

  constructor(
    protected remoteFileService: RemoteFileService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.remoteFileService.delete(id).subscribe(() => {
      this.eventManager.broadcast('remoteFileListModification');
      this.activeModal.close();
    });
  }
}
