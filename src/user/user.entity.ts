import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn() // genera un SERIAL por defecto en Postgres
    id!: number;

    @Column({ length: 150 })
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ nullable: true })
    password!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}
