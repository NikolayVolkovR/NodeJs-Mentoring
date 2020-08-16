export interface userUpdateProps {
  login?: string;
  password?: string;
  age?: number;
}

export interface userCreateProps {
  login: string;
  password: string;
  age: number;
}

export interface userProps {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}
