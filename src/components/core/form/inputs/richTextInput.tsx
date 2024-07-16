'use client';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('../../input/richTextEditor'), {
    ssr: false,
});

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
        <FormControl isRequired={isRequired} paddingBottom={5}>
            <FormLabel>{label}</FormLabel>
            <Input type='hidden' name={name} value={editorData} />
            <RichTextEditor
                initialData={editorData}
                onChange={handleEditorChange}
            />
        </FormControl>
    );
}
