import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOwaspComments } from 'app/shared/model/owasp-comments.model';

@Component({
  selector: 'jhi-owasp-comments-detail',
  templateUrl: './owasp-comments-detail.component.html',
})
export class OwaspCommentsDetailComponent implements OnInit {
  owaspComments: IOwaspComments | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ owaspComments }) => (this.owaspComments = owaspComments));
  }

  previousState(): void {
    window.history.back();
  }
}
