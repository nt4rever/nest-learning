export class Helper {
    static vnToSlug(str: string) {
        str = str.toLowerCase();
        str = str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
        str = str
            .replace(/[^a-z0-9 ]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
        return str;
    }
}

export const destinationPath = 'uploads';
