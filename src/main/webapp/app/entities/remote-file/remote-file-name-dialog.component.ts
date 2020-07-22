import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {RemoteFileService} from "./remote-file.service";
import {IRemoteFile, RemoteFile} from "../../shared/model/remote-file.model";
import {FileType} from "../../shared/model/enumerations/file-type.model";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: './remote-file-name-dialog.component.html',
})
export class RemoteFileNameDialogComponent {
  remoteFile: IRemoteFile = new RemoteFile();

  editForm = this.fb.group({
    dirName: [],
    path: [],
  });


  constructor(
    protected remoteFileService: RemoteFileService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager,
    private fb: FormBuilder,
    protected activatedRoute: ActivatedRoute,
  ) {}

  private createFromForm(): RemoteFile {
    return {
      ...new RemoteFile(),
      path: this.editForm.get(['path'])!.value,
      name: this.editForm.get(['dirName'])!.value,
      fileType: FileType.DIRECTORY,
    };
  }


  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmCreate(): void {
    this.remoteFileService.createDirectory(this.remoteFile).subscribe(() => {
      this.eventManager.broadcast('remoteFileListModification');
      this.activeModal.close();
    });
  }
}
