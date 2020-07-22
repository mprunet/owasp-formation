import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMesContacts } from 'app/shared/model/mes-contacts.model';

type EntityResponseType = HttpResponse<IMesContacts>;
type EntityArrayResponseType = HttpResponse<IMesContacts[]>;

@Injectable({ providedIn: 'root' })
export class MesContactsService {
  public resourceUrl = SERVER_API_URL + 'api/mes-contacts';

  constructor(protected http: HttpClient) {}

  create(mesContacts: IMesContacts): Observable<EntityResponseType> {
    return this.http.post<IMesContacts>(this.resourceUrl, mesContacts, { observe: 'response' });
  }

  update(mesContacts: IMesContacts): Observable<EntityResponseType> {
    return this.http.put<IMesContacts>(this.resourceUrl, mesContacts, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMesContacts>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMesContacts[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
