import { Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { ThemeContext } from 'showed/app/providers';

export default function TimePartBlock({
    value,
    label,
}: {
    value: number;
    label: string;
}) {
    const { theme } = useContext(ThemeContext);

    return (
        <SimpleGrid
            width={'82px'}
            borderRadius={'5px'}
            padding={'5px'}
            column={1}
            spacing={1}
            color={'white'}
            backgroundColor={theme.color + '.500'}
            textAlign={'center'}
        >
            <Heading as='h5' size='lg'>
                {value}
            </Heading>
            <Text>{label}</Text>
        </SimpleGrid>
    );
}
