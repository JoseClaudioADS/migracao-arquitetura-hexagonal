import * as Yup from 'yup';
import { isAfter } from 'date-fns';
import Token, { TokenType } from '../../tokens/token';
import AppError from '../../../errors/AppError';

export default class EmailConfirmationDomain {
    token: string;

    constructor(data: object) {
        Object.assign(this, data);
    }

    async validateFields(): Promise<void> {
        const schemaValidation = Yup.object().shape({
            token: Yup.string().required(),
        });

        await schemaValidation.validate(this);
    }

    validateTokenNotFound(token: Token): void {
        if (!token) {
            throw new AppError('Token não encontrado', 404);
        }
    }

    validateTokenType(token: Token): void {
        if (TokenType.EMAIL_CONFIRMATION !== token.type) {
            throw new AppError('Token de confirmação inválido');
        }
    }

    validateTokenExpiration(token: Token): void {
        const { expires_at } = token;

        if (isAfter(new Date(), expires_at)) {
            throw new AppError('Token expirado');
        }
    }

    validateUserAlreadyActivated(token: Token): void {
        const { user } = token;

        if (user.activated_at) {
            throw new AppError('Usuário já ativado');
        }
    }
}
