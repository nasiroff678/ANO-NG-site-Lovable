import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const BUCKET = 'images';

export function useImageUpload() {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function upload(file: File, path?: string): Promise<string | null> {
        setUploading(true);
        setError(null);

        const ext = file.name.split('.').pop();
        const filePath = path ?? `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
            .from(BUCKET)
            .upload(filePath, file, { upsert: true });

        if (uploadError) {
            setError(uploadError.message);
            setUploading(false);
            return null;
        }

        const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
        setUploading(false);
        return data.publicUrl;
    }

    async function remove(filePath: string): Promise<boolean> {
        const { error } = await supabase.storage.from(BUCKET).remove([filePath]);
        if (error) {
            setError(error.message);
            return false;
        }
        return true;
    }

    async function listFiles(folder?: string) {
        const { data, error } = await supabase.storage
            .from(BUCKET)
            .list(folder ?? '', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } });
        if (error) {
            setError(error.message);
            return [];
        }
        return data;
    }

    return { upload, remove, listFiles, uploading, error };
}
