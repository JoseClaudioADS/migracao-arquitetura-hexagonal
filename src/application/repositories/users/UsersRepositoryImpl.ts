import { Repository, getRepository } from 'typeorm';
import UsersRepository from './UsersRepository';
import User from '../../../domain/users/user';

export default class UsersRepositoryImpl implements UsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    findByEmail(email: string): Promise<User | undefined> {
        return this.repository.findOne({
            where: {
                email,
            },
        });
    }

    save(user: User): Promise<User> {
        return this.repository.save(user);
    }

    async update(id: string, data: object): Promise<number> {
        const userUpdated = await this.repository.update(id, data);
        return userUpdated.affected;
    }
}
