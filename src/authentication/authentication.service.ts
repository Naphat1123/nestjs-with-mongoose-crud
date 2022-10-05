import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  async validateUser(login: LoginDto) {
    const user = await this.userService.findByUsername(login.username)
    if (user && user.password === login.password) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async generateToken(user: any) {
    const payload = { username: user.username, sub: user._id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
