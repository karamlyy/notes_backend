import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../users/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepo: Repository<Note>,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAllForUser(userId: number) {
    return this.notesRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneForUser(userId: number, noteId: number) {
    const note = await this.notesRepo.findOne({
      where: { id: noteId },
      relations: ['user'],
    });

    if (!note) {
      throw new NotFoundException('Note tapılmadı');
    }

    if (note.user.id !== userId) {
      throw new ForbiddenException('Bu nota çıxış icazən yoxdur');
    }

    return note;
  }

  async createForUser(userId: number, dto: CreateNoteDto) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User tapılmadı');
    }

    const note = this.notesRepo.create({
      title: dto.title,
      content: dto.content,
      user,
    });

    return this.notesRepo.save(note);
  }

  async updateForUser(userId: number, noteId: number, dto: UpdateNoteDto) {
    const note = await this.findOneForUser(userId, noteId);

    Object.assign(note, dto, { updatedAt: new Date() });

    return this.notesRepo.save(note);
  }

  async deleteForUser(userId: number, noteId: number) {
    const note = await this.findOneForUser(userId, noteId);
    await this.notesRepo.delete(note.id);
  }
}