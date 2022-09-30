import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { BookmarkService } from './bookmark.service';
import {
    Controller,
    UseGuards,
    Post,
    Param,
    ParseIntPipe,
    Body,
    Get,
    Patch,
    Delete,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @Get()
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarks(userId);
    }

    @Post()
    createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto,
    ) {
        return this.bookmarkService.createBookmark(userId, dto);
    }

    @Get(':id')
    getBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.getBookmarkById(userId, bookmarkId);
    }

    @Patch(':id')
    editBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: CreateBookmarkDto,
    ) {
        return this.bookmarkService.editBookmarkById(userId, bookmarkId, dto);
    }

    @Delete(':id')
    deleteBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
    }
}
