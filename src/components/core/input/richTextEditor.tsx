import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box } from '@chakra-ui/react';

import { useState } from 'react';

export default function RichTextEditor({
    initialData = '',
    onChange,
}: {
    initialData?: string;
    onChange: (model: string) => void;
}) {
    const [value, setValue] = useState(initialData);
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image', 'blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };
    return (
        <Box width={'100%'} border='1px solid #ddd' padding='10px'>
            <ReactQuill
                theme='snow'
                value={value}
                modules={modules}
                onChange={(html) => {
                    if (html !== value) {
                        onChange(html);
                        setValue(html);
                    }
                }}
            />
        </Box>
    );
}
