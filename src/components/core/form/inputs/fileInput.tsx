import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import File from '../../input/file';

export default function FileInput({
    label,
    name,
    defaultValue = null,
    isRequired = false,
    onChange,
}: {
    label: string;
    name: string;
    defaultValue?: string | null;
    isRequired?: boolean;
    onChange: (file: File | null) => void;
}) {
    return (
        <FormControl isRequired={isRequired} paddingBottom={5}>
            <FormLabel>{label}</FormLabel>
            <File onChange={onChange} name={name} initialFilePath={defaultValue} />
        </FormControl>
    );
}
