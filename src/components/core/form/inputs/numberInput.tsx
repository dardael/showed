import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export default function NumberInput({
    label,
    name,
    placeholder,
    defaultValue = 0,
    isRequired = false,
    readOnly = false,
}: {
    label: string;
    name: string;
    placeholder?: string;
    defaultValue?: number;
    isRequired?: boolean;
    readOnly?: boolean;
}) {
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <Input
                type='number'
                name={name}
                placeholder={placeholder ? placeholder : label}
                defaultValue={defaultValue}
                readOnly={readOnly}
            />
        </FormControl>
    );
}
