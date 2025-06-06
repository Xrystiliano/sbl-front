import { FC, useState, useEffect } from 'react';
import NewsCard from '../../components/news/NewsCard';
import NewsForm from '../../components/news/NewsForm';

interface News {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: string;
}

const STORAGE_KEY = 'news_data';

const NewsPage: FC = () => {
    const [news, setNews] = useState<News[]>(() => {
        const savedNews = localStorage.getItem(STORAGE_KEY);
        return savedNews ? JSON.parse(savedNews) : [];
    });
    const [isAddingNews, setIsAddingNews] = useState(false);
    const [editingNews, setEditingNews] = useState<News | null>(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(news));
    }, [news]);

    const handleAddNews = (data: { title: string; description: string; imageUrl: string }) => {
        const newNews: News = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString(),
        };
        setNews([newNews, ...news]);
        setIsAddingNews(false);
    };

    const handleEditNews = (data: { title: string; description: string; imageUrl: string }) => {
        if (editingNews) {
            setNews(news.map(item => 
                item.id === editingNews.id 
                    ? { ...item, ...data }
                    : item
            ));
            setEditingNews(null);
        }
    };

    const handleDeleteNews = (id: string) => {
        setNews(news.filter(item => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        News Feed
                    </h1>
                    <button
                        onClick={() => setIsAddingNews(true)}
                        className="py-2 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-md font-medium text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200"
                    >
                        Add News
                    </button>
                </div>

                {(isAddingNews || editingNews) && (
                    <div className="mb-8">
                        <NewsForm
                            initialData={editingNews || undefined}
                            onSubmit={editingNews ? handleEditNews : handleAddNews}
                            onCancel={() => {
                                setIsAddingNews(false);
                                setEditingNews(null);
                            }}
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map(item => (
                        <NewsCard
                            key={item.id}
                            {...item}
                            onEdit={() => setEditingNews(item)}
                            onDelete={() => handleDeleteNews(item.id)}
                        />
                    ))}
                </div>

                {news.length === 0 && !isAddingNews && (
                    <div className="text-center text-gray-400 py-12">
                        No news yet. Click "Add News" to create your first post!
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsPage; 