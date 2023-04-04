import {atom} from 'recoil';

export type RegisterForm = {
  email: string;
  internationalTransfer: boolean;
  name: string;
  password: string;
  phoneNumber: string;
  privacyPolicy: boolean;
  termsOfService: boolean;
  username: string;
};

export const recoilRegister = atom<RegisterForm>({
  key: 'registerForm',
  default: {
    email: '',
    internationalTransfer: false,
    name: '',
    password: '',
    phoneNumber: '',
    privacyPolicy: false,
    termsOfService: false,
    username: '',
  },
});

export const recoilLogin = atom<{isLogin: boolean; userId: number}>({
  key: 'user',
  default: {isLogin: false, userId: 0},
});
