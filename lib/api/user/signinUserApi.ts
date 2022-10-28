import { requestPost } from '@lib/api/client';
import { User } from '@lib/interface/user.interface';

export const signinUserApi = async (params: Pick<User, 'email' | 'password'>) => {
  const response = await requestPost({
    url: '/user/signin',
    data: params,
  });
  return response;
};
