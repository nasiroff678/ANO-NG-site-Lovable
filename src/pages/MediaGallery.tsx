import { useState, useEffect } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, Copy, Loader2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MediaGallery = () => {
    const { upload, remove, listFiles, uploading } = useImageUpload();
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const loadFiles = async () => {
        setLoading(true);
        const result = await listFiles();
        setFiles(result.filter((f: any) => f.name !== '.emptyFolderPlaceholder'));
        setLoading(false);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = await upload(file);
        if (url) {
            toast({ title: 'Загружено!' });
            loadFiles();
        }
    };

    const handleDelete = async (name: string) => {
        const ok = await remove(name);
        if (ok) {
            toast({ title: 'Удалено!' });
            loadFiles();
        }
    };

    const getPublicUrl = (name: string) =>
        `https://ryiyjogozakefslipqpz.supabase.co/storage/v1/object/public/images/${name}`;

    const copyUrl = (name: string) => {
        navigator.clipboard.writeText(getPublicUrl(name));
        toast({ title: 'URL скопирован!' });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Медиа</h1>
                    <p className="text-sm text-gray-500 mt-1">{files.length} файлов</p>
                </div>
                <label>
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
                        <span>
                            {uploading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Upload className="w-4 h-4 mr-2" />
                            )}
                            Загрузить
                        </span>
                    </Button>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : files.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Нет загруженных файлов</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {files.map((file) => (
                        <div
                            key={file.name}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden group"
                        >
                            <div className="h-40 bg-gray-100">
                                <img
                                    src={getPublicUrl(file.name)}
                                    alt={file.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-3">
                                <p className="text-xs text-gray-500 truncate mb-2">{file.name}</p>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs flex-1"
                                        onClick={() => copyUrl(file.name)}
                                    >
                                        <Copy className="w-3 h-3 mr-1" /> URL
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs text-red-500 hover:text-red-700"
                                        onClick={() => handleDelete(file.name)}
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MediaGallery;
