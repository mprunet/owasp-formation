import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRemoteFile, RemoteFile } from 'app/shared/model/remote-file.model';
import { RemoteFileService } from './remote-file.service';
import { RemoteFileComponent } from './remote-file.component';
import { RemoteFileDetailComponent } from './remote-file-detail.component';

@Injectable({ providedIn: 'root' })
export class RemoteFileResolve implements Resolve<IRemoteFile> {
  constructor(private service: RemoteFileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRemoteFile> | Observable<never> {
    const id = route.params['id'];/*
    if (id) {
      return this.service.find(id).pipe(
        flatMap((remoteFile: HttpResponse<RemoteFile>) => {
          if (remoteFile.body) {
            return of(remoteFile.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    */
    return of(new RemoteFile());
  }
}

export const remoteFileRoute: Routes = [
  {
    path: '',
    component: RemoteFileComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RemoteFiles',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RemoteFileDetailComponent,
    resolve: {
      remoteFile: RemoteFileResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RemoteFiles',
    },
    canActivate: [UserRouteAccessService],
  },
];
