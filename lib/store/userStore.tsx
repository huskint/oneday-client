import { observable } from 'mobx';

import { User, UserValidation } from '@lib/interface/user.interface';
import getValidationUser from '@lib/utils/getValidationUser';
import { signupUserApi } from '@lib/api/user/signupUserApi';
import { signinUserApi } from '@lib/api/user/signinUserApi';

const initialSignUser: User = {
  email: '',
  password: '',
  passwordCheck: '',
  name: '',
};

const initialUserValidation: UserValidation = {
  email: false,
  password: false,
  passwordCheck: false,
  name: false,
};

interface Store {
  user: Pick<User, 'email' | 'name'>;
  signUser: User;
  userValidation: UserValidation;
  isTerm: boolean;
  resetSignUp: () => void;
  onChangeSignUp: (name: string, value: string) => void;
  signupUser: () => Promise<boolean>;
  signinUser: () => Promise<boolean>;
}

export const store: Store = {
  user: {
    email: '',
    name: '',
  },

  signUser: initialSignUser,

  userValidation: initialUserValidation,

  isTerm: false,

  resetSignUp() {
    this.signUser = initialSignUser;
    this.userValidation = initialUserValidation;
    this.isTerm = false;
  },

  onChangeSignUp(name: string, value: string) {
    const regexpCheckList = ['email', 'password', 'name'];
    let regexp: boolean = false;

    if (regexpCheckList.includes(name)) {
      regexp = getValidationUser(name as 'email' | 'password' | 'name', value);
    }

    if (name === 'passwordCheck') {
      regexp = this.signUser.password === value;
    }

    this.signUser = ({
      ...this.signUser,
      [name]: value,
    });

    this.userValidation = ({
      ...this.userValidation,
      [name]: regexp,
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

  async signinUser() {
    try {
      const params = {
        email: this.signUser.email,
        password: this.signUser.password,
      };
      const response = await signinUserApi(params);
      const userData: User = response.data.data.user;
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default observable.object(store);
