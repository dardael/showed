import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export default function DateInput({
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
        <FormControl isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <Input
                type='date'
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
            />
        </FormControl>
    );
}
