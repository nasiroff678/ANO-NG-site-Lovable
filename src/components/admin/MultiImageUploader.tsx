import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Loader2 } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';

interface MultiImageUploaderProps {
    value: string[];
    onChange: (urls: string[]) => void;
    label?: string;
}

const MultiImageUploader = ({ value = [], onChange, label }: MultiImageUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { upload, uploading } = useImageUpload();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const newUrls: string[] = [];
        for (const file of files) {
            const url = await upload(file);
            if (url) newUrls.push(url);
        }

        if (newUrls.length > 0) {
            onChange([...value, ...newUrls]);
        }
    };

    const removeImage = (indexToRemove: number) => {
        onChange(value.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-white">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                    {value.map((url, index) => (
                        <div key={index} className="relative group">
                            <img src={url} alt={`Uploaded ${index}`} className="w-full h-24 object-cover rounded-lg" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="w-full py-6 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors border-2 border-dashed border-gray-100 rounded-lg"
                >
                    {uploading ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                        <Upload className="w-8 h-8" />
                    )}
                    <span className="text-sm">{uploading ? 'Загрузка...' : 'Загрузить фотографии'}</span>
                </button>
            </div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default MultiImageUploader;
