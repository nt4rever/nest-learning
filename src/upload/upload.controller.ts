import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiFiles, ApiImageFile, ApiImageFiles } from './decorator';
import { ParseFile } from './validation/parse-file.pipe';

@Controller('files')
export class UploadController {
    @Post('upload')
    @ApiImageFile('image', true)
    uploadFile(
        @UploadedFile(ParseFile)
        file: Express.Multer.File,
    ) {
        return file;
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
