import { Modal } from '@/shared/ui/modal'
import { PostEditor } from '@features/posts/components/post-editor'
import { Subcategory } from '@features/categories/types'

interface CreatePostModalProps {
    isOpen: boolean
    onClose: () => void
    subcategories: Subcategory[]
    onSubmit: (data: any) => Promise<void>
}

export function CreatePostModal({ isOpen, onClose, subcategories, onSubmit }: CreatePostModalProps) {
    const handleSubmit = async (data: any) => {
        await onSubmit(data)
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Создать пост"
            size="xl"
        >
            <PostEditor
                subcategories={subcategories}
                onSubmit={handleSubmit}
                onCancel={onClose}
            />
        </Modal>
    )
}