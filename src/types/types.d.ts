export interface ITodo {
  _id?: string;
  description: string;
  completed?: boolean;
  owner?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ITodoContext {
  todos: ITodo[] | [];
  todo: ITodo | null;
  loading: boolean;
  getTodo: (id: string | undefined) => void;
  getTodos: () => void;
  createTodo: (todo: ITodo) => void;
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (todo: ITodo) => void;
}

export interface IUser {
  age: number;
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IToken {
  token: string;
}

export interface IResponseAuth {
  user: IUser;
  token: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthContext {
  token: IToken | null;
  user: IUser | null;
  onLogin: (loginData: ILogin) => void;
  onRegister: (registerData: IRegister) => void;
  onLogout: () => void;
}
