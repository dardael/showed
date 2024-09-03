import FileInput from 'showed/components/core/form/inputs/fileInput';

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
            />
        </>
    );
}
