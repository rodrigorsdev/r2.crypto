import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import express, { Request, Response } from 'express';
import { ResponseDto } from "../dtos/response.dto";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    _logger = new Logger(HttpExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        let status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        let messsageErros: string[] = [];

        if (exception.response.errors && exception.response.errors.length > 0)
            messsageErros += exception.response.errors;

        if (exception.response.message && exception.response.message.length > 0)
            messsageErros += exception.response.message;

        if (exception.response.detail)
            messsageErros += exception.response.detail;

        if (!status)
            status = HttpStatus.INTERNAL_SERVER_ERROR;

        response
            .status(status)
            .json(new ResponseDto(false, null, messsageErros));
    }
}