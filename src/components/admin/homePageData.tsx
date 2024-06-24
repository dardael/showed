'use client';
import { Box, Spinner } from '@chakra-ui/react';
import SaveForm from '../core/form/saveForm';
import RichTextInput from '../core/form/inputs/richTextInput';
import TextInput from '../core/form/inputs/textInput';
import { useEffect, useState } from 'react';
import { Page } from 'showed/lib/page/models/page';
import { getPage, savePage } from 'showed/controllers/page/pageController';

export default function HomePageData() {
    const [page, setPage] = useState<Page | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getPage().then((foundPage: Page | undefined) => {
            setPage(foundPage);
            setIsLoading(false);
        });
    }, []);
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <Box padding={'40px'}>
                    {' '}
                    <SaveForm
                        parameters={[{ key: 'id', value: page?._id }]}
                        action={async (formData: FormData) => {
                            return savePage(formData).then((updatedPage) => {
                                setPage(updatedPage);
                            });
                        }}
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
            )}
        </>
    );
}
