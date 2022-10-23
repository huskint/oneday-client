import { observable } from 'mobx';

import { User, UserValidation } from '@lib/interface/user.interface';
import getValidationUser from '@lib/utils/getValidationUser';
import { signupUserApi } from '@lib/api/user/signupUserApi';

interface Store {
  user: Pick<User, 'email' | 'name'>;
  signUser: User;
  userValidation: UserValidation;
  onChangeSignUp: (name: string, value: string) => void;
  signupUser: () => Promise<boolean>;
}

export const store: Store = {
  user: {
    email: '',
    name: '',
  },

  signUser: {
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
  },

  userValidation: {
    email: false,
    password: false,
    passwordCheck: false,
    name: false,
  },

  onChangeSignUp(name: string, value: string) {
    const regexpCheckList = ['email', 'password', 'name'];
    let test: boolean = false;
    if (regexpCheckList.includes(name)) {
      test = getValidationUser(name as 'email' | 'password' | 'name', value);
    }
    if (name === 'passwordCheck') {
      test = this.signUser.password === value;
    }

    this.signUser = ({
      ...this.signUser,
      [name]: value,
    });

    this.userValidation = ({
      ...this.userValidation,
      [name]: test,
    });
  },

  async signupUser() {
    try {
      const params = {
        email: this.signUser.email,
        password: this.signUser.password,
        name: this.signUser.name,
      };
      const response = await signupUserApi(params);
      const userData: User = response.data.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default observable.object(store);
