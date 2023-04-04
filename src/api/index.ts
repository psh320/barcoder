import {RegisterForm} from '../state';
import {customAxios} from './customAxios';

export const getTopItemList = async () => {
  const {data} = await customAxios().get('/api/v1/items/top');
  return data;
};

export const getSearchList = async (search: string) => {
  const {data} = await customAxios().get(`/api/v1/items/search/${search}`);
  return data;
};

export const getScanItemList = async (userId: number) => {
  const {data} = await customAxios().get(`/api/v1/scans/${userId}`);
  return data;
};

export const postScan = async (barcodeNumber: string, userId: number) => {
  const {data} = await customAxios().post('/api/v1/scans', {
    barcodeNumber: barcodeNumber,
    userId: userId,
  });
  return data;
};

export const postSendSMS = async (phoneNumber: {
  countryCode: string;
  to: string;
}) => {
  const {data} = await customAxios().post('/api/v1/send-sms', phoneNumber);
  return data;
};

export const getUsernameExist = async (username: string) => {
  const {data} = await customAxios().get(`/api/v1/users/${username}/exists`);
  return data;
};

export const postRegisterUser = async (registerData: RegisterForm) => {
  const {data} = await customAxios().post('/api/v1/users', registerData);
  return data;
};

export const putChangePassword = async (
  password: string,
  phoneNumber: string,
) => {
  const {data} = await customAxios().put('/api/v1/users/password', {
    password: password,
    phoneNumber: phoneNumber,
  });
};

export const postLoginUser = async (loginData: {
  loginId: string;
  password: string;
}) => {
  const {data} = await customAxios().post('/api/v1/users/login', loginData);
  return data;
};

export const getUserInfo = async (userId: number) => {
  const {data} = await customAxios().get(`/api/v1/users/${userId}`);
  return data;
};

export const putUserInfo = async (userData: {email: string; name: string}) => {
  const {data} = await customAxios().put('/api/v1/users/me', userData);
  return data;
};

export const deleteUser = async () => {
  const {data} = await customAxios().delete('/api/v1/users/me');
  return data;
};
