'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AddPostValues } from '@/utils/formValue';
import { addpost } from '@/actions/addpost';
import { getSession } from 'next-auth/react';
import Header from '@/components/Header';

export default function AddPost() {
    const [formData, setFormData] = useState<AddPostValues>({
        title: '',
        price: '',
        description: '',
        bidEndDate: '',
        filePath: '',
    });
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const router = useRouter();
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const currentSession = await getSession();
            setSession(currentSession);

            if (!currentSession) {
                router.push('/unauthorized');
            }
        };

        fetchSession();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setError(null); // Clear errors on input change
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setImage(file);
                setPreviewUrl(URL.createObjectURL(file));
                setError(null);
            } else {
                setError('Please select a valid image file.');
            }
        } else {
            setError('Please select an image file.');
        }
    };

    const validateForm = (): string | null => {
        if (!image) return 'Please select an image to upload.';
        if (!formData.title.trim()) return 'Please enter a title for your art.';
        if (!formData.price.trim() || isNaN(Number(formData.price)))
            return 'Please enter a valid price for your art.';
        if (!formData.description.trim()) return 'Please provide a description for your art.';
        if (!formData.bidEndDate.trim() || new Date(formData.bidEndDate) <= new Date())
            return 'Please set a valid closing date for bids.';
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const imageData = new FormData();
            imageData.append('file', image as File);

            const responseUpload = await fetch('/api/upload', {
                method: 'POST',
                body: imageData,
            });

            if (!responseUpload.ok) {
                throw new Error('Failed to upload image. Please try again.');
            }

            const { filePath } = await responseUpload.json();

            const response = await addpost({ ...formData, filePath });
            if (response.error) {
                throw new Error(response.error);
            }
            if (response.success) setError(response.success);
            console.log('Post uploaded successfully');

            if (session?.user?.username) {
                router.push(`/user/profile/${session.user.username}`);
            } else {
                console.error('Session or username is not defined');
            }

            setUploading(false);
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('An error occurred while uploading. Please try again.');
            setUploading(false);
        }
    };

    return (
        <>
        <Header></Header>
        <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Add Post</h1>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-2 block w-full border border-gray-300 rounded-md"
                    />
                    {previewUrl && (
                        <div className="mt-4">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-md"
                            />
                        </div>
                    )}
                </div>

                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="mt-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="mt-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-2 block w-full border border-gray-300 rounded-md"
                        rows={4}
                    ></textarea>
                </div>

                {/* Closing Date */}
                <div>
                    <label htmlFor="bidEndDate" className="block text-sm font-medium text-gray-700">
                        Closing Date
                    </label>
                    <input
                        type="date"
                        id="bidEndDate"
                        value={formData.bidEndDate}
                        onChange={handleInputChange}
                        className="mt-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                        uploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Submit'}
                </button>
            </form>
        </div>
        </>
    );
}
