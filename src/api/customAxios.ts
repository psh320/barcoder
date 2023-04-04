import axios, {AxiosInstance} from 'axios';
import * as Keychain from 'react-native-keychain';

const getAccessToken = async () => {
  try {
    const value = await Keychain.getGenericPassword();
    if (value) {
      return value.username;
    }
  } catch (e) {
    console.log(e);
  }
};

const getRefreshToken = async () => {
  try {
    const value = await Keychain.getGenericPassword();
    if (value) {
      return value.password;
    }
  } catch (e) {
    console.log(e);
  }
};

export const customAxios = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: 'https://serverdomain.com',
  });

  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const token = await getAccessToken();
      // const token = '';
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      // 요청 시 에러 처리
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const {
        config,
        response: {status},
      } = error;
      if (status === 401) {
        const accessToken = await getAccessToken();
        const refreshToken = await getRefreshToken();
        const originalRequest = config;
        // token refresh 요청
        await axios
          .post(
            'https://dev.barcoder.co.kr/api/v1/users/token', // token refresh api
            {accessToken: accessToken, refreshToken: refreshToken},
          )
          .then(async d => {
            // 새로운 토큰 저장
            console.log('토큰이 만료 되어 토큰 갱신한 데이터: ', d.data);
            const newAccessToken = d.data.accessToken;
            const newRefreshToken = d.data.refreshToken;
            await Keychain.setGenericPassword(newAccessToken, newRefreshToken);
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
            return axios(originalRequest);
          })
          .catch(async e => {
            console.log('토큰이 만료 되어 토큰 갱신한 데이터: ', e);
            await Keychain.resetGenericPassword();
          });
      }
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};
