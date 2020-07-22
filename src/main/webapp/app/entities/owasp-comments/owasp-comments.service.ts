import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOwaspComments } from 'app/shared/model/owasp-comments.model';

type EntityResponseType = HttpResponse<IOwaspComments>;
type EntityArrayResponseType = HttpResponse<IOwaspComments[]>;

@Injectable({ providedIn: 'root' })
export class OwaspCommentsService {
  public resourceUrl = SERVER_API_URL + 'api/owasp-comments';

  constructor(protected http: HttpClient) {}

  create(owaspComments: IOwaspComments): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(owaspComments);
    return this.http
      .post<IOwaspComments>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  upload(data: FormData): Observable<EntityArrayResponseType> {
    return this.http
      .post<IOwaspComments[]>(SERVER_API_URL + '/api/owasp/xxe', data, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  update(owaspComments: IOwaspComments): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(owaspComments);
    return this.http
      .put<IOwaspComments>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOwaspComments>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOwaspComments[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(owaspComments: IOwaspComments): IOwaspComments {
    const copy: IOwaspComments = Object.assign({}, owaspComments, {
      commentDate:
        owaspComments.commentDate && owaspComments.commentDate.isValid() ? owaspComments.commentDate.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.commentDate = res.body.commentDate ? moment(res.body.commentDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((owaspComments: IOwaspComments) => {
        owaspComments.commentDate = owaspComments.commentDate ? moment(owaspComments.commentDate) : undefined;
      });
    }
    return res;
  }
}
