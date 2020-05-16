import * as Yup from 'yup';
import { addHours } from 'date-fns';
import bcrypt from 'bcrypt';
import User from '../user';
import Token, { TokenType } from '../../tokens/token';

export default class CreateUserDomain {
    name: string;

    email: string;

    phoneNumber: string;

    password: string;

    constructor(data: object) {
        Object.assign(this, data);
        this.email = this.email?.toLowerCase();
    }

    async validateFields(): Promise<void> {
        const schemaValidation = Yup.object().shape({
            name: Yup.string().required().max(250),
            email: Yup.string().required().email().max(250),
            phoneNumber: Yup.string().required().max(20),
            password: Yup.string().required().min(6).max(40),
        });

        await schemaValidation.validate(this, { abortEarly: false });
    }

    async createUser(): Promise<User> {
        const user = new User();
        Object.assign(user, this);
        user.password = await bcrypt.hash(user.password, 8);
        return user;
    }

    createToken(user: User): Token {
        const token = new Token();

        token.type = TokenType.EMAIL_CONFIRMATION;
        token.user = user;
        token.expires_at = addHours(new Date(), 1);

        return token;
    }
}
