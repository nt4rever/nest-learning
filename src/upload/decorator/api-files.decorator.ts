import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { destinationPath } from 'src/shared/helper';
import { customFileName, fileMineTypeFilter } from '../localOptions';

export function ApiFiles(
    fieldName: string = 'files',
    required: boolean = false,
    maxCount: number = 10,
    localOptions?: MulterOptions,
) {
    return applyDecorators(
        UseInterceptors(
            FilesInterceptor(fieldName, maxCount, {
                ...localOptions,
                fileFilter: fileMineTypeFilter('image', 'pdf'),
                storage: diskStorage({
                    filename: customFileName(),
                    destination: destinationPath,
                }),
            }),
        ),
        ApiConsumes('multipart/form-data'),
        ApiBody({
            schema: {
                type: 'object',
                required: required ? [fieldName] : [],
                properties: {
                    [fieldName]: {
                        type: 'array',
                        items: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                },
            },
        }),
    );
}
