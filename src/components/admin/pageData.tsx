import { Box } from '@chakra-ui/react';
import SaveForm from '../core/form/saveForm';
import RichTextInput from '../core/form/inputs/richTextInput';
import TextInput from '../core/form/inputs/textInput';
import { Page } from 'showed/lib/page/models/page';

export default function PageData({
    page,
    onPageChange,
}: {
    page: Page;
    onPageChange: (data: FormData) => Promise<any>;
}) {
    return (
        <>
            <Box padding={'40px'}>
                <SaveForm
                    parameters={[
                        { key: 'id', value: page._id },
                        { key: 'position', value: page.position },
                    ]}
                    action={onPageChange}
                >
                    <TextInput
                        isRequired
                        name='title'
                        label='Titre'
                        placeholder='Titre affiché dans le menu'
                        defaultValue={page?.title}
                    />
                    <RichTextInput
                        isRequired
                        name='content'
                        label='Contenu'
                        defaultValue={page?.content}
                    />
                </SaveForm>
            </Box>
        </>
    );
}
