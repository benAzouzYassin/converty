export function isValidType(fileType: string) {
    const imageMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
        'image/tiff',
        'image/svg+xml',
    ];

    return imageMimeTypes.includes(fileType);
}

