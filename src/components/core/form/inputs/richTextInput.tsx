'use client';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import RichTextEditor from '../../input/richTextEditor';
import { useState } from 'react';

export default function RichTextInput({
    label,
    name,
    defaultValue = '',
    isRequired = false,
}: {
    label: string;
    name: string;
    defaultValue?: string;
    isRequired?: boolean;
}) {
    const [editorData, setEditorData] = useState(defaultValue);

    const handleEditorChange = (data: any) => {
        setEditorData(data);
    };
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <Input type='hidden' name={name} value={editorData} />
            <RichTextEditor
                initialData={editorData}
                onChange={handleEditorChange}
            />
        </FormControl>
    );
}
