import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import File from '../../input/file';

export default function FileInput({
    label,
    name,
    defaultValue = null,
    isRequired = false,
    onChange,
    allowedFileExtensions,
}: {
    label: string;
    name: string;
    defaultValue?: string | null;
    isRequired?: boolean;
    onChange: (file: File | null) => void;
    allowedFileExtensions: string[];
}) {
    return (
        <FormControl isRequired={isRequired} paddingBottom={5}>
            <FormLabel>{label}</FormLabel>
            <File
                onChange={onChange}
                name={name}
                initialFilePath={defaultValue}
                allowedFileExtensions={allowedFileExtensions}
            />
        </FormControl>
    );
}
