import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOwaspComments, OwaspComments } from 'app/shared/model/owasp-comments.model';
import { OwaspCommentsService } from './owasp-comments.service';

@Component({
  selector: 'jhi-owasp-comments-update',
  templateUrl: './owasp-comments-update.component.html',
})
export class OwaspCommentsUpdateComponent implements OnInit {
  isSaving = false;
  commentDateDp: any;

  editForm = this.fb.group({
    id: [],
    commentDate: [],
    comment: [],
    author: [],
  });

  constructor(protected owaspCommentsService: OwaspCommentsService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ owaspComments }) => {
      this.updateForm(owaspComments);
    });
  }

  updateForm(owaspComments: IOwaspComments): void {
    this.editForm.patchValue({
      id: owaspComments.id,
      commentDate: owaspComments.commentDate,
      comment: owaspComments.comment,
      author: owaspComments.author,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const owaspComments = this.createFromForm();
    if (owaspComments.id !== undefined) {
      this.subscribeToSaveResponse(this.owaspCommentsService.update(owaspComments));
    } else {
      this.subscribeToSaveResponse(this.owaspCommentsService.create(owaspComments));
    }
  }

  private createFromForm(): IOwaspComments {
    return {
      ...new OwaspComments(),
      id: this.editForm.get(['id'])!.value,
      commentDate: this.editForm.get(['commentDate'])!.value,
      comment: this.editForm.get(['comment'])!.value,
      author: this.editForm.get(['author'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOwaspComments>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
