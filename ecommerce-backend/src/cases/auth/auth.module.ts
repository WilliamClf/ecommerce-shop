import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CustomerModule } from '../customers/customer.module';

@Module({
    imports: [CustomerModule],
    controllers: [AuthController],
})
export class AuthModule { }