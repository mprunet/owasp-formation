import { Moment } from 'moment';

export interface IOwaspComments {
  id?: number;
  commentDate?: Moment;
  comment?: string;
  author?: string;
}

export class OwaspComments implements IOwaspComments {
  constructor(public id?: number, public commentDate?: Moment, public comment?: string, public author?: string) {}
}
