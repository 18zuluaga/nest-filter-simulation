import { Role } from 'src/common/enum/role.enum';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @OneToMany(() => Transaction, (transactions) => transactions.user)
  transactions: Transaction[];
}
