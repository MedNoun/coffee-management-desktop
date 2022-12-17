import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './baseEntity';

export enum Role {
  'server' = 'SERVER',
  'admin' = 'ADMIN',
  'client' = 'CLIENT',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ enum: Role, default: Role.server })
  role: Role;
  @Column()
  salt: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
}
