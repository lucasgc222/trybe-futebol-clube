import * as bcrypt from 'bcryptjs';
import JWT from '../utils/JWT';
import { ServiceResponse, Message } from '../types/response';
import UsersSequelizeModel from '../database/models/UserSequelizeModel';
import { Login } from '../types/Login';

const errorLogin: ServiceResponse<Message> = {
  status: 'unauthorized',
  data: { message: 'Invalid email or password' },
};

export default class LoginService {
  constructor(private userModel = UsersSequelizeModel) {}

  async login(login: Login): Promise<ServiceResponse<string | Message>> {
    const { email, password } = login;
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) return errorLogin;

    const { id, role, password: pw } = user.dataValues;

    if (!bcrypt.compareSync(password, pw)) return errorLogin;

    const token = JWT.createToken({ id, role });

    return { status: 'successful', data: { token } };
  }

  static getRole(role: string | undefined): ServiceResponse<string | undefined> {
    return { status: 'successful', data: { role } };
  }
}
