import { Box } from '@chakra-ui/react';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import { useRef } from 'react';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/languages/fr.js';
import FroalaEditor from 'react-froala-wysiwyg';

export default function RichTextEditor({
    initialData,
    onChange,
}: {
    initialData: any;
    onChange: (model: string) => void;
}) {
    const editorRef = useRef(null);
    return (
        <Box width={'100%'}>
            <FroalaEditor
                ref={editorRef}
                model={initialData}
                onModelChange={onChange}
                config={{
                    language: 'fr',
                    imageUploadURL: 'api/image',
                    imageUploadMethod: 'POST',
                    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
                    events: {
                        'image.removed': (image: any) => {
                            fetch(image[0].src, {
                                method: 'DELETE',
                            });
                        },
                    },
                }}
            />
        </Box>
    );
}
