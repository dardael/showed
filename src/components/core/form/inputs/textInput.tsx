import { FormControl, FormLabel, Input } from '@chakra-ui/react';

export default function TextInput({
    label,
    name,
    placeholder,
}: {
    label: string;
    name: string;
    placeholder: string;
}) {
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Input type='text' name={name} placeholder={placeholder} />
        </FormControl>
    );
}
