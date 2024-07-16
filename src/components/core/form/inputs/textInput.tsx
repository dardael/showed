import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export default function TextInput({
    label,
    name,
    placeholder,
    defaultValue = '',
    isRequired = false,
}: {
    label: string;
    name: string;
    placeholder: string;
    defaultValue?: string;
    isRequired?: boolean;
}) {
    return (
        <FormControl isRequired={isRequired} paddingBottom={5}>
            <FormLabel>{label}</FormLabel>
            <Input
                type='text'
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </FormControl>
    );
}
