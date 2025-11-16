import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

@ApiTags('notes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOperation({ summary: 'Hazırkı istifadəçinin bütün notlarını qaytarır' })
  @ApiOkResponse({ description: 'Notlar siyahısı qaytarıldı' })
  findAll(@Req() req: any) {
    return this.notesService.findAllForUser(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID-yə görə 1 notu qaytarır (yalnız öz notun)' })
  @ApiOkResponse({ description: 'Note tapıldı' })
  @ApiNotFoundResponse({ description: 'Note tapılmadı' })
  @ApiForbiddenResponse({ description: 'Bu nota çıxış icazən yoxdur' })
  findOne(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.notesService.findOneForUser(req.user.userId, id);
  }

  @Post()
  @ApiOperation({ summary: 'Yeni note yaradır' })
  @ApiCreatedResponse({ description: 'Note yaradıldı' })
  create(@Req() req: any, @Body() dto: CreateNoteDto) {
    return this.notesService.createForUser(req.user.userId, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Note-u yeniləyir' })
  @ApiOkResponse({ description: 'Note yeniləndi' })
  update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.notesService.updateForUser(req.user.userId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Note-u silir' })
  @ApiOkResponse({ description: 'Note silindi' })
  remove(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.notesService.deleteForUser(req.user.userId, id);
  }
}