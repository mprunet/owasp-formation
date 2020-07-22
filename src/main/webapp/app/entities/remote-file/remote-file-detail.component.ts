import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRemoteFile } from 'app/shared/model/remote-file.model';

@Component({
  selector: 'jhi-remote-file-detail',
  templateUrl: './remote-file-detail.component.html',
})
export class RemoteFileDetailComponent implements OnInit {
  remoteFile: IRemoteFile | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ remoteFile }) => (this.remoteFile = remoteFile));
  }

  previousState(): void {
    window.history.back();
  }
}
