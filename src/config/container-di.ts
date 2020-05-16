import { container } from 'tsyringe';
import UsersRepository from '../application/repositories/users/UsersRepository';
import UsersRepositoryImpl from '../application/repositories/users/UsersRepositoryImpl';
import TokensRepository from '../application/repositories/tokens/TokensRepository';
import TokensRepositoryImpl from '../application/repositories/tokens/TokensRepositoryImpl';
import MailService from '../mail/MailService';
import MailServiceImpl from '../mail/MailServiceImpl';

container.registerSingleton<UsersRepository>(
    'UsersRepository',
    UsersRepositoryImpl,
);

container.registerSingleton<TokensRepository>(
    'TokensRepository',
    TokensRepositoryImpl,
);

container.registerSingleton<MailService>('MailService', MailServiceImpl);
