import SaveForm from 'showed/components/core/form/saveForm';
import TextInput from 'showed/components/core/form/inputs/textInput';
import { Block } from 'showed/lib/page/models/block';
import { useEffect, useState } from 'react';
import * as BlockController from 'showed/controllers/page/blockController';
import FileInput from 'showed/components/core/form/inputs/fileInput';
import CheckBoxInput from 'showed/components/core/form/inputs/checkBoxInput';
import { FileType } from 'showed/components/core/input/fileType';
import SwitchInput from 'showed/components/core/form/inputs/switchInput';
import Loading from 'showed/components/core/feedback/loading';
import { getFile } from 'showed/controllers/image/imageController';

export default function BlockData({
    block,
    onBlockChange,
}: {
    block: Block;
    onBlockChange: (block: Block) => void;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasIconChanged, setHasIconChanged] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [initialFilePath, setInitialFilePath] = useState<string | null>(null);
    const handleFileChange = async (file: File | null) => {
        setFile(file);
        setHasIconChanged(true);
    };
    const handleSubmit = async (formData: FormData) => {
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
        const updatedBlock = await BlockController.saveBlock(formData);
        onBlockChange(updatedBlock);
        return updatedBlock;
    };
    useEffect(() => {
        if (block.backgroundImageId) {
            getFile(block.backgroundImageId).then((file) => {
                setInitialFilePath(file?.filepath as string);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, [block]);
    return (
        <Loading isLoading={isLoading}>
            <SaveForm
                parameters={[
                    { key: 'id', value: block._id },
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
                <SwitchInput
                    name='isVisibleOnlyWhenInvitedToReception'
                    label="Visible seulement si invité au vin d'honneur"
                    defaultValue={block.isVisibleOnlyWhenInvitedToReception}
                />
                <SwitchInput
                    name='isVisibleOnlyWhenInvitedToMeal'
                    label='Visible seulement si invité au repas'
                    defaultValue={block.isVisibleOnlyWhenInvitedToMeal}
                />
                <SwitchInput
                    name='isVisibleOnlyWhenInvitedToTownHall'
                    label='Visible seulement si invité a la mairie'
                    defaultValue={block.isVisibleOnlyWhenInvitedToTownHall}
                />
            </SaveForm>
        </Loading>
    );
}
