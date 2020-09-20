export interface UserUpdateProps {
  login?: string;
  password?: string;
  age?: number;
}

export interface UserCreateProps {
  login: string;
  password: string;
  age: number;
}

export interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}
