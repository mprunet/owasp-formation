import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'owasp-comments',
        loadChildren: () => import('./owasp-comments/owasp-comments.module').then(m => m.DevsecOwaspCommentsModule),
      },
      {
        path: 'remote-file',
        loadChildren: () => import('./remote-file/remote-file.module').then(m => m.DevsecRemoteFileModule),
      },
      {
        path: 'mes-contacts',
        loadChildren: () => import('./mes-contacts/mes-contacts.module').then(m => m.DevsecMesContactsModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class DevsecEntityModule {}
