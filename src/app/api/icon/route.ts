import { NextRequest, NextResponse } from 'next/server';
import 'showed/lib/core/dependencyInjection/container';
import { writeFile } from 'fs/promises';
export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const files = formData.getAll('file') as File[];
    const fileToStorage = files[0];
    const buffer = Buffer.from(await fileToStorage.arrayBuffer());
    const filepath = `./public/favicon.ico`;
    await writeFile(filepath, buffer);
    return NextResponse.json({
        success: true,
    });
}
