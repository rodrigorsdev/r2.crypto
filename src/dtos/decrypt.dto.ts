import { ApiProperty } from "@nestjs/swagger";

export abstract class DecryptDto {

    @ApiProperty()
    key: string;

    @ApiProperty()
    encrypted: string;
}