import { NextRequest, NextResponse } from 'next/server';
import 'showed/lib/core/dependencyInjection/container';
import Provider from 'showed/lib/file/service/provider';
import { Container } from 'typedi';
import { nanoid } from 'nanoid';
import { writeFile } from 'fs/promises';
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const files = formData.getAll('file') as File[];
    const fileToStorage = files[0];
    const buffer = Buffer.from(await fileToStorage.arrayBuffer());
    const filename = nanoid() + '_' + fileToStorage.name;
    const provider: Provider = Container.get('FileProvider');
    const filepath = `./public/images/${filename}`;
    const savedImage = await provider.createFile({ filepath: filepath });
    await writeFile(filepath, buffer);
    return NextResponse.json({ link: `/api/image/` + savedImage._id });
}
export async function DELETE(request: NextRequest) {
    const formData = await request.formData();
    const imagePath = formData.get('src');
    console.log(imagePath);
}
