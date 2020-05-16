import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TokenType } from '../../domain/tokens/token';

export default class CreateTokensTable1588205435735
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tokens',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: [TokenType.EMAIL_CONFIRMATION],
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                    },
                    {
                        name: 'expires_at',
                        type: 'timestamp with time zone',
                    },
                ],
            }),
            true,
            false,
            false,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tokens');
    }
}
