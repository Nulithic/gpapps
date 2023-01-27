export interface Role {
  _id: string;
  role: string;
  parent: string | null;
  path: string;
  name: string;
  status: boolean;
  children: Role[];
}

export interface User {
  username: string;
  lastLogin: string;
  online: boolean;
  roles: Role[];
  admin: boolean;
}

export interface AuthType {
  currentUser: User | undefined;
}
