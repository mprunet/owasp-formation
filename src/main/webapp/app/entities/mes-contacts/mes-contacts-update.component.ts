import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMesContacts, MesContacts } from 'app/shared/model/mes-contacts.model';
import { MesContactsService } from './mes-contacts.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-mes-contacts-update',
  templateUrl: './mes-contacts-update.component.html',
})
export class MesContactsUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    prenom: [],
    email: [],
    fixe: [],
    mobile: [],
    user: [],
  });

  constructor(
    protected mesContactsService: MesContactsService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mesContacts }) => {
      this.updateForm(mesContacts);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(mesContacts: IMesContacts): void {
    this.editForm.patchValue({
      id: mesContacts.id,
      nom: mesContacts.nom,
      prenom: mesContacts.prenom,
      email: mesContacts.email,
      fixe: mesContacts.fixe,
      mobile: mesContacts.mobile,
      user: mesContacts.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mesContacts = this.createFromForm();
    if (mesContacts.id !== undefined) {
      this.subscribeToSaveResponse(this.mesContactsService.update(mesContacts));
    } else {
      this.subscribeToSaveResponse(this.mesContactsService.create(mesContacts));
    }
  }

  private createFromForm(): IMesContacts {
    return {
      ...new MesContacts(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      email: this.editForm.get(['email'])!.value,
      fixe: this.editForm.get(['fixe'])!.value,
      mobile: this.editForm.get(['mobile'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMesContacts>>): void {
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

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
