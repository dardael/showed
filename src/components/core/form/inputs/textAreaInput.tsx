import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';

export default function TextAreaInput({
    label,
    name,
    placeholder,
    defaultValue = '',
    isRequired = false,
    readOnly = false,
}: {
    label: string;
    name: string;
    placeholder?: string;
    defaultValue?: string;
    isRequired?: boolean;
    readOnly?: boolean;
}) {
    return (
        <FormControl isRequired={isRequired} paddingBottom={5}>
            <FormLabel>{label}</FormLabel>
            <Textarea
                name={name}
                placeholder={placeholder ? placeholder : label}
                defaultValue={defaultValue}
                readOnly={readOnly}
            />
        </FormControl>
    );
}
