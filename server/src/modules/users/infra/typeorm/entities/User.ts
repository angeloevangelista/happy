import Orphanage from '@modules/orphanages/infra/typeorm/entities/Orphanage';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Orphanage, (orphanage) => orphanage.user)
  orphanages: Orphanage[];
}

export default User;
