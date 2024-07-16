import { FormControl, FormLabel, Select } from '@chakra-ui/react';

export default function SelectInput({
    label,
    name,
    placeholder,
    defaultValue = '',
    values,
    isRequired = false,
}: {
    label: string;
    name: string;
    placeholder: string;
    defaultValue?: string;
    values: { key: string; value: any }[];
    isRequired?: boolean;
}) {
    return (
        <FormControl isRequired={isRequired} paddingBottom={5}>
            <FormLabel>{label}</FormLabel>
            <Select
                name={name}
                placeholder={placeholder}
                defaultValue={defaultValue}
            >
                {values.map((value) => (
                    <option key={value.key} value={value.key}>
                        {value.value}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}
