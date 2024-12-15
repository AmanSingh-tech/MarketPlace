import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { getServerSession } from 'next-auth';


const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
});

export const POST = async (req: NextRequest) => {
  try {
    const form = await req.formData();
    const file = form.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = `./public/uploads/${Date.now()}-${file.name}`;
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ filePath: filePath.replace('./public', '') });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
};

export const config = {
  api: {
    bodyParser: false, // Required to handle multipart/form-data
  },
};
