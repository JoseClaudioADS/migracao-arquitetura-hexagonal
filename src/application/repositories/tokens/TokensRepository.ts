import Token from '../../../domain/tokens/token';

export default interface TokensRepository {
    save(token: Token): Promise<Token>;

    delete(id: string): Promise<number>;

    findById(id: string): Promise<Token | undefined>;
}
