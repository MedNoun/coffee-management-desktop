import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  'server' = 'SERVER',
  'admin' = 'ADMIN',
  'client' = 'CLIENT',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column({ unique: true })
  username: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ enum: Role, default: Role.server })
  role: Role;
  @Column()
  salt: String;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
}
