import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        user: any;
        access_token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: number;
        email: string;
        username: string;
        created_at: Date;
    }>;
    seedUser(): Promise<void>;
}
