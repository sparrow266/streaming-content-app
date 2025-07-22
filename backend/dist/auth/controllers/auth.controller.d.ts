import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
