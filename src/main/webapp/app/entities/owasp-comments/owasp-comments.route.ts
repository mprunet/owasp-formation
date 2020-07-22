import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOwaspComments, OwaspComments } from 'app/shared/model/owasp-comments.model';
import { OwaspCommentsService } from './owasp-comments.service';
import { OwaspCommentsComponent } from './owasp-comments.component';
import { OwaspCommentsDetailComponent } from './owasp-comments-detail.component';
import { OwaspCommentsUpdateComponent } from './owasp-comments-update.component';

@Injectable({ providedIn: 'root' })
export class OwaspCommentsResolve implements Resolve<IOwaspComments> {
  constructor(private service: OwaspCommentsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOwaspComments> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((owaspComments: HttpResponse<OwaspComments>) => {
          if (owaspComments.body) {
            return of(owaspComments.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OwaspComments());
  }
}

export const owaspCommentsRoute: Routes = [
  {
    path: '',
    component: OwaspCommentsComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'OwaspComments',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OwaspCommentsDetailComponent,
    resolve: {
      owaspComments: OwaspCommentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'OwaspComments',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OwaspCommentsUpdateComponent,
    resolve: {
      owaspComments: OwaspCommentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'OwaspComments',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OwaspCommentsUpdateComponent,
    resolve: {
      owaspComments: OwaspCommentsResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'OwaspComments',
    },
    canActivate: [UserRouteAccessService],
  },
];
