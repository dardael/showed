import { Checkbox, FormControl, FormLabel } from '@chakra-ui/react';

export default function CheckBoxInput({
    label,
    name,
    placeholder,
    defaultValue = false,
    isRequired = false,
    readOnly = false,
}: {
    label: string;
    name: string;
    placeholder?: string;
    defaultValue?: boolean;
    isRequired?: boolean;
    readOnly?: boolean;
}) {
    return (
        <FormControl isRequired={isRequired} paddingBottom={5}>
            <FormLabel>{label}</FormLabel>
            <Checkbox
                name={name}
                placeholder={placeholder ? placeholder : label}
                defaultChecked={defaultValue}
                readOnly={readOnly}
            />
        </FormControl>
    );
}
