import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { FaPlus, FaTimes, FaUpload } from 'react-icons/fa'
import { cn } from '@/shared/utils/helpers'
import { Subcategory } from '@features/categories/types'

const postSchema = z.object({
    title: z.string().min(3, 'Заголовок должен быть не менее 3 символов').max(200, 'Заголовок слишком длинный'),
    content: z.string().min(10, 'Содержание должно быть не менее 10 символов'),
    subcategoryId: z.number().min(1, 'Выберите категорию'),
    tags: z.array(z.string()).max(10, 'Максимум 10 тегов'),
})

type PostFormData = z.infer<typeof postSchema>

interface PostEditorProps {
    subcategories: Subcategory[]
    onSubmit: (data: PostFormData & { photos: File[] }) => Promise<void>
    onCancel: () => void
    initialData?: Partial<PostFormData>
}

export function PostEditor({ subcategories, onSubmit, onCancel, initialData }: PostEditorProps) {
    const [photos, setPhotos] = useState<File[]>([])
    const [tagInput, setTagInput] = useState('')
    const [tags, setTags] = useState<string[]>(initialData?.tags || [])

    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: initialData?.title || '',
            content: initialData?.content || '',
            subcategoryId: initialData?.subcategoryId || undefined,
            tags: initialData?.tags || [],
        },
    })

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const fileArray = Array.from(files)
            if (photos.length + fileArray.length > 10) {
                alert('Максимум 10 фотографий')
                return
            }
            setPhotos(prev => [...prev, ...fileArray])
        }
    }

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index))
    }

    const addTag = () => {
        const trimmed = tagInput.trim()
        if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
            const newTags = [...tags, trimmed]
            setTags(newTags)
            setValue('tags', newTags)
            setTagInput('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter(tag => tag !== tagToRemove)
        setTags(newTags)
        setValue('tags', newTags)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag()
        }
    }

    const onSubmitForm = async (data: PostFormData) => {
        await onSubmit({ ...data, photos })
    }

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            {/* Title */}
            <Input
                label="Заголовок"
                {...register('title')}
                error={errors.title?.message}
                placeholder="Введите заголовок поста"
            />

            {/* Subcategory */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                    Категория
                </label>
                <select
                    {...register('subcategoryId', { valueAsNumber: true })}
                    className={cn(
                        'w-full px-3 py-2 border rounded-lg transition-colors',
                        'bg-white dark:bg-stone-800',
                        'border-stone-300 dark:border-stone-700',
                        'text-stone-900 dark:text-stone-100',
                        'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent',
                        errors.subcategoryId && 'border-red-500 focus:ring-red-500'
                    )}
                >
                    <option value="">Выберите категорию</option>
                    {subcategories.map(subcategory => (
                        <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                        </option>
                    ))}
                </select>
                {errors.subcategoryId && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.subcategoryId.message}</p>
                )}
            </div>

            {/* Content */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                    Содержание
                </label>
                <textarea
                    {...register('content')}
                    rows={6}
                    className={cn(
                        'w-full px-3 py-2 border rounded-lg transition-colors',
                        'bg-white dark:bg-stone-800',
                        'border-stone-300 dark:border-stone-700',
                        'text-stone-900 dark:text-stone-100',
                        'placeholder:text-stone-400 dark:placeholder:text-stone-500',
                        'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent',
                        errors.content && 'border-red-500 focus:ring-red-500'
                    )}
                    placeholder="Расскажите о своей активности..."
                />
                {errors.content && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
                )}
            </div>

            {/* Tags */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                    Теги (максимум 10)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm"
                        >
                            #{tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 hover:text-red-500"
                            >
                                <FaTimes className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex space-x-2">
                    <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Введите тег и нажмите Enter"
                        className="flex-1"
                    />
                    <Button type="button" onClick={addTag} disabled={tags.length >= 10}>
                        <FaPlus />
                    </Button>
                </div>
                {errors.tags && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.tags.message}</p>
                )}
            </div>

            {/* Photos */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                    Фотографии (максимум 10)
                </label>
                <div
                    className={cn(
                        'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                        'border-stone-300 dark:border-stone-700 hover:border-amber-400 cursor-pointer'
                    )}
                >
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer block">
                        <FaUpload className="w-8 h-8 mx-auto mb-2 text-stone-400" />
                        <p className="text-stone-600 dark:text-stone-400">
                            Кликните для выбора фотографий
                        </p>
                        <p className="text-sm text-stone-500 dark:text-stone-500 mt-1">
                            Максимум 10 файлов (JPEG, PNG, GIF, WebP)
                        </p>
                    </label>
                </div>

                {/* Photo previews */}
                {photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
                        {photos.map((photo, index) => (
                            <div key={index} className="relative aspect-square">
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePhoto(index)}
                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                                >
                                    <FaTimes className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Отмена
                </Button>
                <Button type="submit" loading={isSubmitting}>
                    Опубликовать
                </Button>
            </div>
        </form>
    )
}