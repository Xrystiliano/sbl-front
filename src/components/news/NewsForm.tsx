import { FC, FormEvent, useState } from 'react';

interface NewsFormProps {
    initialData?: {
        id: string;
        title: string;
        description: string;
        fullText: string;
        imageUrl: string;
    };
    onSubmit: (data: {
        title: string;
        description: string;
        fullText: string;
        imageUrl: string;
    }) => void;
    onCancel: () => void;
}

const NewsForm: FC<NewsFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [fullText, setFullText] = useState(initialData?.fullText || '');
    const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');
    const [previewUrl, setPreviewUrl] = useState(initialData?.imageUrl || '');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description, fullText, imageUrl });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImageUrl(result);
                setPreviewUrl(result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-cyan-500/10 p-6 backdrop-blur-sm">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    {initialData ? 'EDIT NEWS' : 'ADD NEWS'}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                    {initialData ? 'Update your news' : 'Create new news post'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter news title"
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                        Short Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter short description"
                        required
                        rows={2}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="fullText" className="block text-sm font-medium text-gray-300">
                        Full Article Text
                    </label>
                    <textarea
                        id="fullText"
                        value={fullText}
                        onChange={(e) => setFullText(e.target.value)}
                        placeholder="Enter full article text"
                        required
                        rows={10}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                        Image
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    {previewUrl && (
                        <div className="mt-2">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md font-medium text-white transition-colors"
                    >
                        CANCEL
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-2 px-4 text-center bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-md font-medium text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200"
                    >
                        {initialData ? 'UPDATE' : 'PUBLISH'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewsForm; 