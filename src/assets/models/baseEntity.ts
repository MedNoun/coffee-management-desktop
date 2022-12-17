import { Column, CreateDateColumn, DeleteDateColumn, Entity } from 'typeorm';

@Entity()
export class BaseEntity {
  @CreateDateColumn()
  createAt: Date;
  @DeleteDateColumn()
  deletedAt: Date | null;
  @Column({ default: false })
  synced: boolean;
}
