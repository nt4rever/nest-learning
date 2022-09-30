export function customFileName() {
    return (
        _req: any,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void,
    ) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const fileExtension = file.originalname.split('.')[1];
        callback(null, uniqueSuffix + '.' + fileExtension);
    };
}
