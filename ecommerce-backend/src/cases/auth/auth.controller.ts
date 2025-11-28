import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { CustomerService } from "../customers/customer.service";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly customerService: CustomerService
    ) { }

    @Post('register')
    async register(@Body() body: {
        name: string,
        username: string,
        password: string,
        address: string,
        zipcode: string,
        cityId?: string
    }) {
        // Verifica se username já existe
        const existingCustomer = await this.customerService.findByUsername(body.username);

        if (existingCustomer) {
            throw new HttpException('Username já está em uso', HttpStatus.BAD_REQUEST);
        }

        // Cria novo customer
        const newCustomer = await this.customerService.save({
            name: body.name,
            username: body.username,
            password: body.password,
            address: body.address,
            zipcode: body.zipcode,
            city: body.cityId ? { id: body.cityId } as any : null
        } as any);

        // Retorna token e customer (já logado)
        return {
            token: newCustomer.id,
            customer: {
                id: newCustomer.id,
                name: newCustomer.name,
                username: newCustomer.username,
                address: newCustomer.address,
                zipcode: newCustomer.zipcode,
                city: newCustomer.city
            }
        };
    }

    @Post('login')
    async login(@Body() body: { username: string, password: string }) {
        const customer = await this.customerService.findByUsername(body.username);

        if (!customer || customer.password !== body.password) {
            throw new HttpException('Usuário ou senha incorretos', HttpStatus.UNAUTHORIZED);
        }

        // Retorna token fake (id do customer) e dados do customer
        return {
            token: customer.id,
            customer: {
                id: customer.id,
                name: customer.name,
                username: customer.username,
                address: customer.address,
                zipcode: customer.zipcode,
                city: customer.city
            }
        };
    }
}