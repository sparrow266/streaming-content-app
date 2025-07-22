import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { email: user.email, sub: user.id, username: user.username };
    
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const newUser = this.usersRepository.create(registerDto);
    const savedUser = await this.usersRepository.save(newUser);
    
    // Remove password from response
    const { password, ...result } = savedUser;
    
    return result;
  }

  // For demonstration purposes - creates a mock user when there are none
  async seedUser() {
    const count = await this.usersRepository.count();
    
    if (count === 0) {
      const mockUser = this.usersRepository.create({
        email: 'admin@example.com',
        username: 'admin',
        password: 'password123',
      });
      
      await this.usersRepository.save(mockUser);
      console.log('Mock user created');
    }
  }
}
