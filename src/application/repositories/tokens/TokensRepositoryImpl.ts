import { Repository, getRepository } from 'typeorm';
import TokensRepository from './TokensRepository';
import Token from '../../../domain/tokens/token';

export default class TokensRepositoryImpl implements TokensRepository {
    private repository: Repository<Token>;

    constructor() {
        this.repository = getRepository(Token);
    }

    save(token: Token): Promise<Token> {
        return this.repository.save(token);
    }

    async delete(id: string): Promise<number> {
        const deleteResult = await this.repository.delete(id);
        return deleteResult.affected;
    }

    findById(id: string): Promise<Token | undefined> {
        return this.repository.findOne(id, { relations: ['user'] });
    }
}
