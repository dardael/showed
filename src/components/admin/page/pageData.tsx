import SaveForm from 'showed/components/core/form/saveForm';
import TextInput from 'showed/components/core/form/inputs/textInput';
import { Page } from 'showed/lib/page/models/page';
import { useEffect, useState } from 'react';
import { FileType } from 'showed/components/core/input/fileType';
import FileInput from 'showed/components/core/form/inputs/fileInput';
import { getFile } from 'showed/controllers/image/imageController';
import NumberInput from 'showed/components/core/form/inputs/numberInput';
import Loading from 'showed/components/core/feedback/loading';
import { savePage } from 'showed/controllers/page/pageController';

export default function PageData({
    page,
    onPageChange,
}: {
    page: Page;
    onPageChange: (page: Page) => void;
}) {
    const [hasSoundChanged, setHasSoundChanged] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [initialFilePath, setInitialFilePath] = useState<string | null>(null);
    const handleFileChange = async (file: File | null) => {
        setFile(file);
        setHasSoundChanged(true);
    };
    const handleSubmit = async (formData: FormData) => {
        if (hasSoundChanged) {
            if (page.soundId) {
                await fetch(`api/image/${page.soundId}`, {
                    method: 'DELETE',
                });
                formData.delete('soundId');
            }
            if (file) {
                const fileFormData = new FormData();
                fileFormData.append('file', file);
                const result = await (
                    await fetch('api/sound', {
                        method: 'POST',
                        body: fileFormData,
                    })
                ).json();

                formData.set('soundId', result.id);
            }
            setHasSoundChanged(false);
            setFile(null);
        }

        const updatedPage = await savePage(formData);
        onPageChange(updatedPage);
        return updatedPage;
    };
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        if (page.soundId) {
            getFile(page.soundId).then((file) => {
                setInitialFilePath(file?.filepath as string);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [page]);
    return (
        <Loading isLoading={isLoading}>
            <SaveForm
                parameters={[
                    { key: 'id', value: page._id },
                    {
                        key: 'position',
                        value: page.position.toString(),
                    },
                ]}
                action={handleSubmit}
            >
                <TextInput
                    isRequired
                    name='title'
                    label='Titre'
                    placeholder='Titre affiché dans le menu'
                    defaultValue={page?.title}
                />
                <FileInput
                    name='sound'
                    label='Son'
                    onChange={handleFileChange}
                    defaultValue={initialFilePath}
                    fileType={FileType.AUDIO}
                    allowedFileExtensions={['mp3', 'mp4', 'wav']}
                />
                <NumberInput
                    name='width'
                    label='Largeur'
                    placeholder='Largeur de la page'
                    defaultValue={page?.width}
                />
            </SaveForm>
        </Loading>
    );
}
