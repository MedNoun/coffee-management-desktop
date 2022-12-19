import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createAt: Date;
  @DeleteDateColumn()
  deletedAt: Date | null;
  @Column({ default: false })
  synced: boolean;
}
