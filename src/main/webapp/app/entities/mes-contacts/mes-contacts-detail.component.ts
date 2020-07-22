import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMesContacts } from 'app/shared/model/mes-contacts.model';

@Component({
  selector: 'jhi-mes-contacts-detail',
  templateUrl: './mes-contacts-detail.component.html',
})
export class MesContactsDetailComponent implements OnInit {
  mesContacts: IMesContacts | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mesContacts }) => (this.mesContacts = mesContacts));
  }

  previousState(): void {
    window.history.back();
  }
}
