import {
    As,
    Box,
    Checkbox,
    FormControl,
    FormLabel,
    Icon,
    Select,
    SelectField,
} from '@chakra-ui/react';
import { ReactElement } from 'react';

export default function SelectInput({
    label,
    name,
    placeholder,
    options,
    defaultValue,
    isRequired = false,
}: {
    label: string;
    name: string;
    placeholder?: string;
    options: { label: string; value: string; icon: As }[];
    defaultValue?: string;
    isRequired?: boolean;
}) {
    return (
        <FormControl isRequired={isRequired} paddingBottom={5}>
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
