import { ApiProperty } from "@nestjs/swagger";

export abstract class EncryptDto {

    @ApiProperty()
    key: string;

    @ApiProperty()
    payload: string;
}