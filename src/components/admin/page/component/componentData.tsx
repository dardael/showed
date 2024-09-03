import TextInput from 'showed/components/core/form/inputs/textInput';
import SaveForm from 'showed/components/core/form/saveForm';
import { Component } from 'showed/lib/page/models/component';
import { ComponentType } from 'showed/lib/page/models/componentType';
import RichTextEditorData from 'showed/components/admin/page/component/richTextEditorData';
import CountdownData from 'showed/components/admin/page/component/coutdownData';
import HeaderData from './headerData';
import TextData from './textData';
import BoldTextData from './boldTextData';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import StainedGlassPhotoData from './stainedGlassPhotoData';
import SpacerData from './spacerData';
import CalendarButtonData from './calendarButtonData';
import RoundPhotoData from './roundPhotoData';

export default function ComponentData({
    component,
    onSave,
}: {
    component: Component;
    onSave: (data: FormData) => Promise<Component>;
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
            if (component.content) {
                await fetch(`api/image/${component.content}`, {
                    method: 'DELETE',
                });
                formData.delete('content');
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

                formData.set('content', result.id);
            }
            setHasIconChanged(false);
            setFile(null);
        }
        return onSave(formData);
    };
    useEffect(() => {
        if (
            component.content &&
            component.componentType === ComponentType.STAINED_GLASS_PHOTO
        ) {
            fetch(`api/image/${component.content}?mustReturnData=1`).then(
                async (response) => {
                    const result = await response.json();
                    setInitialFilePath(result.filepath);
                    setIsLoading(false);
                }
            );
        } else {
            setIsLoading(false);
        }
    }, []);
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <SaveForm
                    parameters={[
                        { key: 'id', value: component._id },
                        { key: 'position', value: component.position },
                    ]}
                    action={handleSubmit}
                >
                    <TextInput
                        isRequired
                        name='title'
                        label='Titre'
                        placeholder='Titre'
                        defaultValue={component.title}
                    />
                    <TextInput
                        name='description'
                        label='Type de composant'
                        defaultValue={ComponentType.getComponentTypeLabel(
                            component.componentType
                        )}
                        readOnly
                    />
                    {component.componentType ===
                        ComponentType.RICH_TEXT_EDITOR && (
                        <RichTextEditorData component={component} />
                    )}
                    {component.componentType === ComponentType.COUNTDOWN && (
                        <CountdownData component={component} />
                    )}
                    {component.componentType === ComponentType.HEADER && (
                        <HeaderData component={component} />
                    )}
                    {component.componentType === ComponentType.BOLD_TEXT && (
                        <BoldTextData component={component} />
                    )}
                    {component.componentType === ComponentType.TEXT && (
                        <TextData component={component} />
                    )}
                    {component.componentType ===
                        ComponentType.STAINED_GLASS_PHOTO && (
                        <StainedGlassPhotoData
                            initialFilePath={initialFilePath}
                            onIconChange={handleFileChange}
                        />
                    )}
                    {component.componentType === ComponentType.ROUND_PHOTO && (
                        <RoundPhotoData
                            initialFilePath={initialFilePath}
                            onIconChange={handleFileChange}
                        />
                    )}
                    {component.componentType === ComponentType.SPACER && (
                        <SpacerData component={component} />
                    )}
                    {component.componentType ===
                        ComponentType.CALENDAR_BUTTON && (
                        <CalendarButtonData component={component} />
                    )}
                </SaveForm>
            )}
        </>
    );
}
