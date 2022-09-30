import { UnsupportedMediaTypeException } from '@nestjs/common';

export function fileMineTypeFilter(...minetypes: string[]) {
    return (
        _req: any,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
    ) => {
        if (minetypes.some((m) => file.mimetype.includes(m))) {
            callback(null, true);
        } else {
            callback(
                new UnsupportedMediaTypeException(
                    `File type is not matching: ${minetypes.join(', ')}`,
                ),
                false,
            );
        }
    };
}
