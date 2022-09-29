import { HttpException, HttpStatus } from '@nestjs/common';

export class Helper {
    static customFileName(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        let fileExtension = '';
        if (file.mimetype.indexOf('jpeg') > -1) {
            fileExtension = 'jpg';
        } else if (file.mimetype.indexOf('png') > -1) {
            fileExtension = 'png';
        }
        const originalName = file.originalname.split('.')[0];
        cb(null, originalName + '-' + uniqueSuffix + '.' + fileExtension);
    }

    static destinationPath(req, file, cb) {
        cb(null, './uploads/');
    }

    static imageFilter(req, file, cb) {
        // Accept images only
        if (
            !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)
        ) {
            req.fileValidationError = 'Only image files are allowed!';
            cb(
                new HttpException(
                    'Only image files are allowed!',
                    HttpStatus.UNPROCESSABLE_ENTITY,
                ),
                false,
            );
        }
        cb(null, true);
    }
}
