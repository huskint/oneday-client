import { requestPost } from '@lib/api/client';
import { User } from '@lib/interface/user.interface';

export const signupUserApi = async (params: Pick<User, 'email' | 'password' | 'name'>) => {
  const response = await requestPost({
    url: '/user/signup',
    data: params,
  });
  return response;
};
