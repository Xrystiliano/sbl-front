import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import NewsForm from '../../components/news/NewsForm';

const AddNewsPage: FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (data: { title: string; description: string; imageUrl: string; fullText: string }) => {
        // В реальном приложении здесь будет запрос к API
        console.log('New news:', data);
        navigate('/news');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        Add New Article
                    </h1>
                    <button
                        onClick={() => navigate('/news')}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        ← Back to News
                    </button>
                </div>

                <NewsForm
                    onSubmit={handleSubmit}
                    onCancel={() => navigate('/news')}
                />
            </div>
        </div>
    );
};

export default AddNewsPage; 