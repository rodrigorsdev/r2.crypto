import { ApiProperty } from "@nestjs/swagger";

export abstract class BcryptEncryptDto {

    @ApiProperty()
    password: string;
}