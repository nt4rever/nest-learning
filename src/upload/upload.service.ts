import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
    constructor(private prismaService: PrismaService) {}
    async uploadFile(file: Express.Multer.File) {
        const f = await this.prismaService.file.create({
            data: {
                filename: file.filename,
                path: file.path,
            },
        });
        return f;
    }
}
