import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseFile implements PipeTransform {
    transform(
        files: Express.Multer.File | Express.Multer.File[],
        metaData: ArgumentMetadata,
    ): Express.Multer.File | Express.Multer.File[] {
        if (files === undefined || files === null) {
            throw new BadRequestException(
                `Validation failed (file is expected)`,
            );
        }
        if (Array.isArray(files) && files.length === 0) {
            throw new BadRequestException(
                `Validation failed (file is expected)`,
            );
        }
        return files;
    }
}
