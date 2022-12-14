import { Controller, Get, Patch, UseGuards, Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    getMe(@GetUser() user: User) {
        return user;
    }

    @Patch()
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.userService.editUser(userId, dto);
    }
}
