import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface NewsCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    fullText: string;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const NewsCard: FC<NewsCardProps> = ({ 
    id, 
    title, 
    description, 
    imageUrl, 
    createdAt,
    fullText,
    onEdit,
    onDelete 
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Сохраняем данные новости в localStorage перед навигацией
        const newsData = {
            id,
            title,
            description,
            imageUrl,
            createdAt,
            fullText
        };
        localStorage.setItem('currentNews', JSON.stringify(newsData));
        navigate(`/news/${id}`);
    };

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg shadow-cyan-500/10 p-6 backdrop-blur-sm cursor-pointer hover:shadow-cyan-500/20 transition-all duration-200" onClick={handleClick}>
            <div className="relative">
                <img 
                    src={imageUrl} 
                    alt={title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="absolute top-2 right-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {onEdit && (
                        <button
                            onClick={() => onEdit(id)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(id)}
                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-red-400 hover:text-red-300 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
                {title}
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-2">
                {description}
            </p>
            <div className="text-sm text-gray-400">
                {new Date(createdAt).toLocaleDateString()}
            </div>
        </div>
    );
};

export default NewsCard; 