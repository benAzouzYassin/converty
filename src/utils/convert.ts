import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

function getFileExtension(fileName: string) {
    const regex = /(?:\.([^.]+))?$/;
    const match = regex.exec(fileName);
    if (match && match[1]) {
        return match[1];
    }
    return '';
}

function removeFileExtension(fileName: string) {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        return fileName.slice(0, lastDotIndex);
    }
    return fileName;
}

export default async function convertImage(
    ffmpeg: FFmpeg,
    file: File,
): Promise<any> {
    const input = getFileExtension(file.name);
    const output = removeFileExtension(file.name) + '.webp';
    ffmpeg.writeFile(input, await fetchFile(file));

    await ffmpeg.exec(['-i', input, output]);

    const data = (await ffmpeg.readFile(output)) as any;
    const blob = new Blob([data], { type: "webp" });
    const url = URL.createObjectURL(blob);
    return url
}
