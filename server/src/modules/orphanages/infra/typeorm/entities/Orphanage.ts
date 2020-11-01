import User from '@modules/users/infra/typeorm/entities/User';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Image from './Image';

@Entity('orphanages')
class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @OneToOne(() => User, (user) => user.orphanages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Image, (image) => image.orphanage, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({
    name: 'orphanage_id',
  })
  images: Image[];
}

export default Orphanage;
