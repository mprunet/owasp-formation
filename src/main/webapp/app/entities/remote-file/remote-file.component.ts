import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {IRemoteFile, RemoteFile} from 'app/shared/model/remote-file.model';
import { RemoteFileService } from './remote-file.service';
import { RemoteFileDeleteDialogComponent } from './remote-file-delete-dialog.component';
import {ActivatedRoute} from "@angular/router";
import {FileType} from "../../shared/model/enumerations/file-type.model";
import {IOwaspComments} from "../../shared/model/owasp-comments.model";
import {RemoteFileNameDialogComponent} from "./remote-file-name-dialog.component";

@Component({
  selector: 'jhi-remote-file',
  templateUrl: './remote-file.component.html',
})
export class RemoteFileComponent implements OnInit, OnDestroy {
  remoteFiles?: IRemoteFile[];
  eventSubscriber?: Subscription;
  path = "/";
  directory = FileType.DIRECTORY;

  constructor(protected remoteFileService: RemoteFileService, protected eventManager: JhiEventManager, protected modalService: NgbModal,
              protected activatedRoute: ActivatedRoute) {}

  loadAll(path: string | null): void {
    /* eslint-disable no-console */
    console.log("PATH ");
    console.log(path);
    /* eslint-enable no-console */

    if (path) {
      this.path = path;

    } else {
      this.path = "/";
    }
    this.remoteFileService.query(this.path).subscribe((res: HttpResponse<IRemoteFile[]>) => (this.remoteFiles = res.body || []));
  }

  fullPath(remoteFile :IRemoteFile) : string {
    return (remoteFile.path ? remoteFile.path : '')+remoteFile.name;
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params=> {
      this.loadAll(params.get("path"));
    });
    this.registerChangeInRemoteFiles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }


  downloadFile(remoteFile : RemoteFile): void{
    this.remoteFileService.download(remoteFile).subscribe(
      (response: any) =>{
        const dataType = response.type;
        const binaryData = [];
        binaryData.push(response);
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        downloadLink.target = "_blank";
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }
  uploadFile(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('path', this.path);
      this.remoteFileService.upload(formData).subscribe((res: HttpResponse<IRemoteFile[]>) => (this.remoteFiles = res.body || []));
    }
  }


  trackId(index: number, item: IRemoteFile): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRemoteFiles(): void {
    this.eventSubscriber = this.eventManager.subscribe('remoteFileListModification', () => this.loadAll(this.path));
  }

  delete(): void {
    const remoteFile = new RemoteFile();
    remoteFile.name = "New-Directory";
    remoteFile.path = this.path;
    const modalRef = this.modalService.open(RemoteFileDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.remoteFile = remoteFile;
  }
  createDir(): void {
    const remoteFile = new RemoteFile();
    remoteFile.name = "New-Directory";
    remoteFile.path = this.path;
    const modalRef = this.modalService.open(RemoteFileNameDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.remoteFile = remoteFile;
  }

}
