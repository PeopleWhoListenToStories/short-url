import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UniqueCode {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ length: 10, comment: '压缩码' })
    code: string;

    @ApiProperty()
    @Column({ comment: '状态, 0 未使用、1 已使用' })
    status: number;
}