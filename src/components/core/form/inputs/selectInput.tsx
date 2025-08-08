import { FormControl, FormLabel, Select } from '@chakra-ui/react';

export default function SelectInput({
    label,
    name,
    options,
    defaultValue,
    isRequired = false,
}: {
    label: string;
    name: string;
    options: { label: string; value: string }[];
    defaultValue?: string;
    isRequired?: boolean;
}) {
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <Select name={name} defaultValue={defaultValue}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
}
