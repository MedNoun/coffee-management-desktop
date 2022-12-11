import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  'server' = 'SERVER',
  'admin' = 'ADMIN',
  'client' = 'CLIENT',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number = 0;
  @Column({ unique: true })
  username: string = 'MedNoun';
  @Column()
  firstName: string = 'Mohamed';
  @Column()
  lastName: string = 'Sahnoun';
  @Column({ enum: Role, default: Role.server })
  role: Role = Role.admin;
  @Column()
  salt: string = '123';
  @Column({ unique: true })
  email: string = 'mouhasahss@gmail.com';
  @Column()
  password: string = 'aezrty123';
}
