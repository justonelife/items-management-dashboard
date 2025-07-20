export interface AuthForm {
  email: string;
  password: string;
}

export type SignInForm = Pick<AuthForm, 'email' | 'password'>;
