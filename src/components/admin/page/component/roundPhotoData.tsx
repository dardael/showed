import FileInput from 'showed/components/core/form/inputs/fileInput';
import { FileType } from 'showed/components/core/input/fileType';

export default function RoundPhotoData({
    onIconChange,
    initialFilePath,
}: {
    onIconChange: (file: File | null) => void;
    initialFilePath: string | null;
}) {
    return (
        <>
            <FileInput
                isRequired
                name='photo'
                label='Photo'
                defaultValue={initialFilePath}
                onChange={onIconChange}
                allowedFileExtensions={['png', 'jpg', 'jpeg']}
                fileType={FileType.IMAGE}
            />
        </>
    );
}
