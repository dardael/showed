import { NextRequest, NextResponse } from 'next/server';
import Provider from 'showed/lib/file/provider';
import Container from 'typedi';
import 'showed/lib/core/dependencyInjection/container';
import fs from 'fs';

type params = {
    id: string;
};
export async function GET(request: NextRequest, context: params) {
    const { id } = context;
    const provider: Provider = Container.get('FileProvider');
    const file = await provider.getFile(id);
    if (!file) {
        return NextResponse.error();
    }
    const data = fs.readFileSync(file.filepath);
    const response = new NextResponse(data, {
        status: 200,
        headers: new Headers({ 'content-type': 'image/*' }),
    });

    return response;
}

export async function DELETE(request: NextRequest, context: params) {
    const { id } = context;
    const provider: Provider = Container.get('FileProvider');
    const file = await provider.getFile(id);
    if (!file) {
        return NextResponse.error();
    }
    fs.unlinkSync(file.filepath);
    provider.deleteFile(id);
    return NextResponse.json({ message: 'File deleted' });
}
