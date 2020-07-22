import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMesContacts } from 'app/shared/model/mes-contacts.model';
import { MesContactsService } from './mes-contacts.service';
import { MesContactsDeleteDialogComponent } from './mes-contacts-delete-dialog.component';

@Component({
  selector: 'jhi-mes-contacts',
  templateUrl: './mes-contacts.component.html',
})
export class MesContactsComponent implements OnInit, OnDestroy {
  mesContacts?: IMesContacts[];
  eventSubscriber?: Subscription;

  constructor(
    protected mesContactsService: MesContactsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.mesContactsService.query().subscribe((res: HttpResponse<IMesContacts[]>) => (this.mesContacts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMesContacts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMesContacts): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMesContacts(): void {
    this.eventSubscriber = this.eventManager.subscribe('mesContactsListModification', () => this.loadAll());
  }

  delete(mesContacts: IMesContacts): void {
    const modalRef = this.modalService.open(MesContactsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mesContacts = mesContacts;
  }
}
