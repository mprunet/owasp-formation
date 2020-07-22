import { IUser } from 'app/core/user/user.model';

export interface IMesContacts {
  id?: number;
  nom?: string;
  prenom?: string;
  email?: string;
  fixe?: string;
  mobile?: string;
  user?: IUser;
}

export class MesContacts implements IMesContacts {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public email?: string,
    public fixe?: string,
    public mobile?: string,
    public user?: IUser
  ) {}
}
