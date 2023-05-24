import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum FileType {
  PHOTOS = 'photos',
  TRASH = 'trash',
}

@Entity('files')
export class FileEntity {
  @ApiProperty({
    description: 'id файла',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'переделанное имя файла',
  })
  @Column()
  fileName: string;

  @ApiProperty({
    description: 'оригинальное имя файла',
  })
  @Column()
  originalName: string;

  @ApiProperty({
    description: 'размер файла',
  })
  @Column()
  size: number;

  @ApiProperty({
    description: 'тип файла',
  })
  @Column()
  mimetype: string;

  @ManyToOne(() => UserEntity, (user) => user.files)
  user: UserEntity;

  @DeleteDateColumn()
  deleteAt?: Date;
}
