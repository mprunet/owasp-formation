import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMesContacts, MesContacts } from 'app/shared/model/mes-contacts.model';
import { MesContactsService } from './mes-contacts.service';
import { MesContactsComponent } from './mes-contacts.component';
import { MesContactsDetailComponent } from './mes-contacts-detail.component';
import { MesContactsUpdateComponent } from './mes-contacts-update.component';

@Injectable({ providedIn: 'root' })
export class MesContactsResolve implements Resolve<IMesContacts> {
  constructor(private service: MesContactsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMesContacts> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((mesContacts: HttpResponse<MesContacts>) => {
          if (mesContacts.body) {
            return of(mesContacts.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MesContacts());
  }
}

export const mesContactsRoute: Routes = [
  {
    path: '',
    component: MesContactsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MesContacts',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MesContactsDetailComponent,
    resolve: {
      mesContacts: MesContactsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MesContacts',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MesContactsUpdateComponent,
    resolve: {
      mesContacts: MesContactsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MesContacts',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MesContactsUpdateComponent,
    resolve: {
      mesContacts: MesContactsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MesContacts',
    },
    canActivate: [UserRouteAccessService],
  },
];
