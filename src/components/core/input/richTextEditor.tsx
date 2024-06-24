import { Box } from '@chakra-ui/react';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/languages/fr.js';
import 'froala-editor/js/plugins.pkgd.min.js';

export default function RichTextEditor({
    initialData,
    onChange,
}: {
    initialData: any;
    onChange: (model: string) => void;
}) {
    return (
        <Box width={'100%'}>
            <FroalaEditor
                model={initialData}
                onModelChange={onChange}
                config={{ language: 'fr' }}
            />
        </Box>
    );
}
