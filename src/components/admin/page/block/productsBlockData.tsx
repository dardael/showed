import { Box, Spinner } from '@chakra-ui/react';
import SaveForm from 'showed/components/core/form/saveForm';
import TextInput from 'showed/components/core/form/inputs/textInput';
import { Block } from 'showed/lib/page/models/block';
import { useEffect, useState } from 'react';
import FileInput from 'showed/components/core/form/inputs/fileInput';
import CheckBoxInput from 'showed/components/core/form/inputs/checkBoxInput';
import { FileType } from 'showed/components/core/input/fileType';

export default function ProductsBlockData<U>({
    block,
    onBlockChange,
}: {
    block: Block;
    onBlockChange: (data: FormData) => Promise<U>;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasIconChanged, setHasIconChanged] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [initialFilePath, setInitialFilePath] = useState<string | null>(null);
    const handleFileChange = async (file: File | null) => {
        setFile(file);
        setHasIconChanged(true);
    };
    const handleSubmit = async (formData: FormData): Promise<U> => {
        if (hasIconChanged) {
            if (block.backgroundImageId) {
                await fetch(`api/image/${block.backgroundImageId}`, {
                    method: 'DELETE',
                });
                formData.delete('backgroundImageId');
            }
            if (file) {
                const fileFormData = new FormData();
                fileFormData.append('file', file);
                const result = await (
                    await fetch('api/image', {
                        method: 'POST',
                        body: fileFormData,
                    })
                ).json();

                formData.set('backgroundImageId', result.id);
            }
            setHasIconChanged(false);
            setFile(null);
        }
        return onBlockChange(formData);
    };
    useEffect(() => {
        if (block.backgroundImageId) {
            fetch(`api/image/${block.backgroundImageId}?mustReturnData=1`).then(
                async (response) => {
                    response.json().then((result) => {
                        setInitialFilePath(result.filepath);
                        setIsLoading(false);
                    });
                }
            );
        } else {
            setIsLoading(false);
        }
    }, [block.backgroundImageId]);
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <Box padding={'40px'}>
                    <SaveForm
                        parameters={[
                            { key: 'id', value: block._id as string },
                            {
                                key: 'position',
                                value: block.position.toString(),
                            },
                            {
                                key: 'backgroundImageId',
                                value: block.backgroundImageId,
                            },
                        ]}
                        action={handleSubmit}
                    >
                        <TextInput
                            isRequired
                            name='title'
                            label='Titre'
                            placeholder='Titre'
                            defaultValue={block?.title}
                        />
                        <FileInput
                            name='backgroundImage'
                            label='Image en arriére plan'
                            defaultValue={initialFilePath}
                            onChange={handleFileChange}
                            allowedFileExtensions={['png, jpg, jpeg']}
                            fileType={FileType.IMAGE}
                        />
                        <CheckBoxInput
                            name='hasTransparentBackground'
                            label='Fond transparent'
                            defaultValue={block.hasTransparentBackground}
                        />
                    </SaveForm>
                </Box>
            )}
        </>
    );
}
