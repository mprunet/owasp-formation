import { Moment } from 'moment';
import { FileType } from 'app/shared/model/enumerations/file-type.model';

export interface IRemoteFile {
  id?: number;
  path?: string;
  name?: string;
  modification?: Moment;
  rights?: string;
  fileType?: FileType;
}

export class RemoteFile implements IRemoteFile {
  constructor(
    public id?: number,
    public path?: string,
    public name?: string,
    public modification?: Moment,
    public rights?: string,
    public fileType?: FileType
  ) {}
}
