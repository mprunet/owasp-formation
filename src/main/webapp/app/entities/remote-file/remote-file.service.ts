import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import {IRemoteFile, RemoteFile} from 'app/shared/model/remote-file.model';
import {IOwaspComments} from "../../shared/model/owasp-comments.model";

type EntityResponseType = HttpResponse<IRemoteFile>;
type EntityArrayResponseType = HttpResponse<IRemoteFile[]>;

@Injectable({ providedIn: 'root' })
export class RemoteFileService {
  public resourceUrl = SERVER_API_URL + 'api/remote-files';

  constructor(protected http: HttpClient) {}

  query(thepath: string): Observable<EntityArrayResponseType> {
    const options = createRequestOption({'path': thepath});
    return this.http
      .get<IRemoteFile[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  download(remoteFile: RemoteFile): Observable<any> {
    const copy = this.convertDateFromClient(remoteFile);
    return this.http.post(this.resourceUrl + "/download", copy, {responseType: 'blob' as 'json'});
  }

  upload(data: FormData): Observable<EntityArrayResponseType> {
    return this.http
      .post<RemoteFile[]>(this.resourceUrl, data, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  createDirectory(data: IRemoteFile) : Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(data);
    return this.http
      .post<IOwaspComments>(this.resourceUrl + "/create-directory", copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));

  }


  protected convertDateFromClient(remoteFile: IRemoteFile): IRemoteFile {
    const copy: IRemoteFile = Object.assign({}, remoteFile, {
      modification: remoteFile.modification && remoteFile.modification.isValid() ? remoteFile.modification.format(DATE_TIME_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.modification = res.body.modification ? moment(res.body.modification) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((remoteFile: IRemoteFile) => {
        remoteFile.modification = remoteFile.modification ? moment(remoteFile.modification) : undefined;
      });
    }
    return res;
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}

