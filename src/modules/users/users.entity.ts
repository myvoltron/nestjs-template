import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SignType } from './users.constant';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({ enum: SignType })
  signType: SignType;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;
}
