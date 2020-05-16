import { Router } from 'express';
import { container } from 'tsyringe';
import CreateUserUseCase from '../application/usecases/users/CreateUserUseCase';
import CreateUserDomain from '../domain/users/domains/CreateUserDomain';
import EmailConfirmationDomain from '../domain/users/domains/EmailConfirmationDomain';
import EmailConfirmationUseCase from '../application/usecases/users/EmailConfirmationUseCase';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
    const createUserDomain = new CreateUserDomain(request.body);

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute(createUserDomain);
    delete user.password;
    response.status(201).json(user);
});

userRouter.get(`/email-confirmation`, async (request, response) => {
    const emailConfirmationDomain = new EmailConfirmationDomain(request.query);

    const emailConfirmationUseCase = container.resolve(
        EmailConfirmationUseCase,
    );

    await emailConfirmationUseCase.execute(emailConfirmationDomain);

    response.sendStatus(204);
});

export default userRouter;
