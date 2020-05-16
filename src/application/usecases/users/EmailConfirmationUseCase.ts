import { injectable, inject } from 'tsyringe';
import EmailConfirmationDomain from '../../../domain/users/domains/EmailConfirmationDomain';
import TokensRepository from '../../repositories/tokens/TokensRepository';
import UsersRepository from '../../repositories/users/UsersRepository';

@injectable()
export default class EmailConfirmationUseCase {
    constructor(
        @inject('TokensRepository') private tokensRepository: TokensRepository,
        @inject('UsersRepository') private usersRepository: UsersRepository,
    ) {}

    async execute(
        emailConfirmationDomain: EmailConfirmationDomain,
    ): Promise<void> {
        await emailConfirmationDomain.validateFields();

        const token = await this.tokensRepository.findById(
            emailConfirmationDomain.token,
        );

        emailConfirmationDomain.validateTokenNotFound(token);
        emailConfirmationDomain.validateTokenType(token);
        emailConfirmationDomain.validateTokenExpiration(token);
        emailConfirmationDomain.validateUserAlreadyActivated(token);

        const { user } = token;

        await this.usersRepository.update(user.id, {
            activated_at: new Date(),
        });

        await this.tokensRepository.delete(token.id);
    }
}
