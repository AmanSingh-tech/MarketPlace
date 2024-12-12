'use client';

import { Upload } from 'lucide-react';
import Header from '@/components/Header';

export default function ArtUploader() {
  const handleArtUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      // Handle file upload logic here
    }
  };

  return (
    <>
    <Header></Header>
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Upload Your Art</h3>
      <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
        <span className="flex items-center space-x-2">
          <Upload className="w-6 h-6 text-gray-600" />
          <span className="font-medium text-gray-600">Click to upload art</span>
        </span>
        <input
          type="file"
          name="file_upload"
          className="hidden"
          onChange={handleArtUpload}
          accept="image/*"
        />
      </label>
    </div>
    </>
  );
}
