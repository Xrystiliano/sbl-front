import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewsForm from '../../components/news/NewsForm';

interface News {
    id: string;
    title: string;
    description: string;
    fullText: string;
    imageUrl: string;
    createdAt: string;
}

const STORAGE_KEY = 'news_data';

const NewsDetailPage: FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState<News | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Получаем данные из localStorage
        const savedNews = localStorage.getItem(STORAGE_KEY);
        if (savedNews) {
            const newsArray = JSON.parse(savedNews);
            const currentNews = newsArray.find((item: News) => item.id === id);
            if (currentNews) {
                setNews(currentNews);
            }
        }
    }, [id]);

    const handleEdit = (data: { title: string; description: string; imageUrl: string; fullText: string }) => {
        if (news) {
            const updatedNews = { ...news, ...data };
            setNews(updatedNews);
            
            // Обновляем данные в общем списке новостей
            const savedNews = localStorage.getItem(STORAGE_KEY);
            if (savedNews) {
                const newsArray = JSON.parse(savedNews);
                const updatedArray = newsArray.map((item: News) => 
                    item.id === news.id ? updatedNews : item
                );
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArray));
            }
            setIsEditing(false);
        }
    };

    const handleDelete = () => {
        if (news && window.confirm('Are you sure you want to delete this news?')) {
            const savedNews = localStorage.getItem(STORAGE_KEY);
            if (savedNews) {
                const newsArray = JSON.parse(savedNews);
                const updatedArray = newsArray.filter((item: News) => item.id !== news.id);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArray));
            }
            navigate('/news');
        }
    };

    if (!news) {
        return <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
            News not found
        </div>;
    }

    if (isEditing) {
        return (
            <div className="min-h-screen bg-gray-900 text-gray-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                            Edit News
                        </h1>
                        <button
                            onClick={() => navigate('/news')}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            ← Back to News
                        </button>
                    </div>
                    <NewsForm
                        initialData={news}
                        onSubmit={handleEdit}
                        onCancel={() => setIsEditing(false)}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-cyan-500/10 p-6 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={() => navigate('/news')}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            ← Back to News
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-md font-medium text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200"
                            >
                                Edit News
                            </button>
                            <button
                                onClick={handleDelete}
                                className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md font-medium text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-200"
                            >
                                Delete News
                            </button>
                        </div>
                    </div>

                    <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-[400px] object-cover rounded-lg mb-6"
                    />

                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
                        {news.title}
                    </h1>

                    <div className="text-gray-400 text-sm mb-6">
                        {new Date(news.createdAt).toLocaleDateString()}
                    </div>

                    <div className="prose prose-invert max-w-none">
                        {news.fullText.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="text-gray-300 mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage; 