import {
    ManyToOne,
    JoinColumn,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Entity,
} from 'typeorm';
import User from '../users/user';

export enum TokenType {
    EMAIL_CONFIRMATION = 'email_confirmation',
}

@Entity('tokens')
export default class Token {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: TokenType })
    type: TokenType;

    @Column()
    user_id: string;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    expires_at: Date;
}
