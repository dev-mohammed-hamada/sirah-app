import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getProfile(@CurrentUser() user: { id: string }) {
    return this.usersService.getProfile(user.id);
  }

  @Patch('me')
  updateProfile(
    @CurrentUser() user: { id: string },
    @Body() data: { displayName?: string; fcmToken?: string },
  ) {
    return this.usersService.updateProfile(user.id, data);
  }

  @Get('search')
  search(@Query('username') username: string) {
    return this.usersService.searchByUsername(username);
  }

  @Post('link-request')
  sendLinkRequest(@CurrentUser() user: { id: string }, @Body('username') username: string) {
    return this.usersService.sendLinkRequest(user.id, username);
  }

  @Get('link-requests')
  getPendingRequests(@CurrentUser() user: { id: string }) {
    return this.usersService.getPendingLinkRequests(user.id);
  }

  @Patch('link-request/:id')
  respondToLinkRequest(
    @Param('id') linkId: string,
    @CurrentUser() user: { id: string },
    @Body('accept') accept: boolean,
  ) {
    return this.usersService.respondToLinkRequest(linkId, user.id, accept);
  }

  @Get('linked')
  getLinkedAccounts(@CurrentUser() user: { id: string }) {
    return this.usersService.getLinkedAccounts(user.id);
  }

  @Delete('link/:id')
  unlink(@Param('id') linkId: string, @CurrentUser() user: { id: string }) {
    return this.usersService.unlink(linkId, user.id);
  }
}
