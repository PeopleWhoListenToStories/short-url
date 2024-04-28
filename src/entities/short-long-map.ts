import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShortLongMap {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ length: 10, comment: '压缩码' })
    shortUrl: string;

    @ApiProperty()
    @Column({ length: 200, comment: '原始 url' })
    longUrl: string;

    @ApiProperty()
    @CreateDateColumn()
    createTime: Date;
}