import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('login')
  async login(@Body() login: LoginDto) {
    const user = await this.authenticationService.validateUser(login)
    if (user) {
      return this.authenticationService.generateToken(user)
    }
    return new UnauthorizedException()
  }
}
