import { Controller, Post, UploadedFile } from '@nestjs/common';
import { ApiFile } from './decorator/api-file.decorator';
import { fileMineTypeFilter } from './filter/file-minetype-filter';
import { ParseFile } from './validation/parse-file.pipe';

@Controller('upload')
export class UploadController {
    @Post()
    @ApiFile('file', true, { fileFilter: fileMineTypeFilter('image') })
    uploadFile(
        @UploadedFile(ParseFile)
        file: Express.Multer.File,
    ) {
        console.log(file);
    }
}
