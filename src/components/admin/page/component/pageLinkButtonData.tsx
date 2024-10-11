import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SelectInput from 'showed/components/core/form/inputs/selectInput';
import TextInput from 'showed/components/core/form/inputs/textInput';
import { getPages } from 'showed/controllers/page/pageController';
import { Component } from 'showed/lib/page/models/component';
import { Page } from 'showed/lib/page/models/page';

export default function PageLinkButtonData({
    component,
}: {
    component: Component;
}) {
    const [pages, setPages] = useState<Page[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getPages().then((foundPages: Page[]) => {
            setPages(foundPages);
            setIsLoading(false);
        });
    }, []);

    const options =
        pages?.map((page) => ({
            value: page._id as string,
            label: page.title,
        })) || [];
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <>
                    <TextInput
                        isRequired
                        name='content'
                        label='Texte'
                        placeholder='Texte à afficher'
                        defaultValue={component.content}
                    />
                    <SelectInput
                        isRequired
                        name='link'
                        label='Page'
                        defaultValue={component.link}
                        options={options}
                    />
                </>
            )}
        </>
    );
}
