import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import CryptoUtil from "../utils/crypto.util";
import { DecryptDto } from "../dtos/decrypt.dto";
import { EncryptDto } from "../dtos/encrypt.dto";
import { ResponseDto } from "../dtos/response.dto";
import { BcryptEncryptDto } from "../dtos/bcrypt-encrypt.dto";
import * as bcrypt from 'bcryptjs';

@ApiTags('crypto')
@Controller('crypto')
export class CryptoController {

    constructor() { }

    @Post('encrypt')
    async encrypt(
        @Body() dto: EncryptDto
    ) {
        const result = CryptoUtil.encrypt(
            dto.key,
            dto.payload
        );

        return new ResponseDto(
            true,
            result,
            null
        );
    }

    @Post('decrypt')
    async decrypt(
        @Body() dto: DecryptDto
    ) {
        const result = CryptoUtil.decrypt(
            dto.key,
            dto.encrypted
        );

        return new ResponseDto(
            true,
            result,
            null
        );
    }

    @Post('bcrypt/encrypt')
    async bcrypEncrypt(
        @Body() dto: BcryptEncryptDto
    ) {
        const result =  await bcrypt.hash(dto.password, 13);

        return new ResponseDto(
            true,
            result,
            null
        );
    }
}