import {
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { ApiFiles, ApiImageFile, ApiImageFiles } from './decorator';
import { UploadService } from './upload.service';
import { ParseFile } from './validation/parse-file.pipe';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('files')
export class UploadController {
    constructor(private uploadService: UploadService) {}
    @Post('upload')
    @ApiImageFile('image', true)
    uploadFile(
        @UploadedFile(ParseFile)
        file: Express.Multer.File,
    ) {
        return this.uploadService.uploadFile(file);
    }

    @Post('uploads')
    @ApiFiles('files', true, 10)
    uploadFiles(@UploadedFiles(ParseFile) files: Array<Express.Multer.File>) {
        return files;
    }

    @Post('uploadFields')
    @ApiImageFiles([
        { name: 'avatar', maxCount: 1 },
        { name: 'background', maxCount: 1 },
    ])
    uploadMultipleFiles(
        @UploadedFiles(ParseFile) files: Express.Multer.File[],
    ) {
        return files;
    }
}
