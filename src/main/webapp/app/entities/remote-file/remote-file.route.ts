import { Routes } from '@angular/router';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { RemoteFileComponent } from './remote-file.component';

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
];
