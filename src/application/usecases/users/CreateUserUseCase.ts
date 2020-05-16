import { injectable, inject } from 'tsyringe';
import CreateUserDomain from '../../../domain/users/domains/CreateUserDomain';
import UsersRepository from '../../repositories/users/UsersRepository';
import TokensRepository from '../../repositories/tokens/TokensRepository';
import AppError from '../../../errors/AppError';
import User from '../../../domain/users/user';
import MailService from '../../../mail/MailService';

@injectable()
export default class CreateUserUseCase {
    constructor(
        @inject('UsersRepository') private usersRepository: UsersRepository,
        @inject('TokensRepository') private tokensRepository: TokensRepository,
        @inject('MailService') private mailService: MailService,
    ) {}

    async execute(createUserDomain: CreateUserDomain): Promise<User> {
        await createUserDomain.validateFields();

        const userByEmail = await this.usersRepository.findByEmail(
            createUserDomain.email,
        );

        if (userByEmail) {
            throw new AppError('Email já está sendo utilizado por outra conta');
        }

        let user = await createUserDomain.createUser();

        user = await this.usersRepository.save(user);

        await this.sendEmailConfirmation(user, createUserDomain);

        return user;
    }

    private async sendEmailConfirmation(
        user: User,
        createUserDomain: CreateUserDomain,
    ): Promise<void> {
        const token = createUserDomain.createToken(user);

        await this.tokensRepository.save(token);

        const confirmationLink = `${process.env.URL_API}/users/email-confirmation?token=${token.id}`;

        this.mailService.send({
            subject: 'Email de confirmação | Cadastro',
            to: user.email,
            from: 'no-reply@cadastros.com.br',
            html: `<p> Olá ${user.name}, segue link para confirmação de seu cadastro na plataforma. <a href="${confirmationLink}">${confirmationLink}</a> </p>`,
        });
    }
}
