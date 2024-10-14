import { NextRequest, NextResponse } from 'next/server';
import Provider from 'showed/lib/file/provider';
import Container from 'typedi';
import 'showed/lib/core/dependencyInjection/container';
import fs from 'fs';

type params = {
    params: { id: string };
};
export async function GET(request: NextRequest, context: params) {
    const id = context.params.id;
    const provider: Provider = Container.get('FileProvider');
    const file = await provider.getFile(id);
    if (!file) {
        return NextResponse.error();
    }
    const url = new URL(request.url);
    const mustReturnData = url.searchParams.get('mustReturnData');
    if (mustReturnData) {
        return NextResponse.json(file);
    } else {
        const audioFile = fs.readFileSync(file.filepath);

        const response = new NextResponse(audioFile, {
            status: 200,
            headers: new Headers({
                'content-type': 'audio/*',
                'content-disposition':
                    (('inline; filename="' +
                        file.filepath.split('/').pop()) as string) + '"',
                'content-length': audioFile.length.toString(),
            }),
        });
        return response;
    }
}

export async function DELETE(request: NextRequest, context: params) {
    const id = context.params.id;
    const provider: Provider = Container.get('FileProvider');
    const file = await provider.getFile(id);
    if (!file) {
        return NextResponse.error();
    }
    fs.unlinkSync(file.filepath);
    provider.deleteFile(id);
    return NextResponse.json({ message: 'File deleted' });
}
