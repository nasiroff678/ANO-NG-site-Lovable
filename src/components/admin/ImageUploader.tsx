import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2 } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';

interface ImageUploaderProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

const ImageUploader = ({ value, onChange, label }: ImageUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { upload, uploading } = useImageUpload();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = await upload(file);
        if (url) onChange(url);
    };

    return (
        <div>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-white">
                {value ? (
                    <div className="relative group">
                        <img src={value} alt="" className="w-full h-40 object-cover rounded-lg" />
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        disabled={uploading}
                        className="w-full py-8 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {uploading ? (
                            <Loader2 className="w-8 h-8 animate-spin" />
                        ) : (
                            <Upload className="w-8 h-8" />
                        )}
                        <span className="text-sm">{uploading ? 'Загрузка...' : 'Нажмите для загрузки'}</span>
                    </button>
                )}
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ImageUploader;
