import User from '../../../domain/users/user';

export default interface UsersRepository {
    findByEmail(email: string): Promise<User | undefined>;

    save(user: User): Promise<User>;

    update(id: string, data: object): Promise<number>;
}
