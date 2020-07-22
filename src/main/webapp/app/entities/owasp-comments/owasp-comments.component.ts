import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOwaspComments } from 'app/shared/model/owasp-comments.model';
import { OwaspCommentsService } from './owasp-comments.service';
import { OwaspCommentsDeleteDialogComponent } from './owasp-comments-delete-dialog.component';

@Component({
  selector: 'jhi-owasp-comments',
  templateUrl: './owasp-comments.component.html',
})
export class OwaspCommentsComponent implements OnInit, OnDestroy {
  owaspComments?: IOwaspComments[];
  eventSubscriber?: Subscription;

  constructor(
    protected owaspCommentsService: OwaspCommentsService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      this.owaspCommentsService.upload(formData).subscribe((res: HttpResponse<IOwaspComments[]>) => (this.owaspComments = res.body || []));
    }
  }

  loadAll(): void {
    this.owaspCommentsService.query().subscribe((res: HttpResponse<IOwaspComments[]>) => (this.owaspComments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOwaspComments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOwaspComments): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOwaspComments(): void {
    this.eventSubscriber = this.eventManager.subscribe('owaspCommentsListModification', () => this.loadAll());
  }

  delete(owaspComments: IOwaspComments): void {
    const modalRef = this.modalService.open(OwaspCommentsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.owaspComments = owaspComments;
  }
}
