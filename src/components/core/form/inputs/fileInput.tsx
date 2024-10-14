import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import File from '../../input/file';
import { FileType } from '../../input/fileType';

export default function FileInput({
    label,
    name,
    defaultValue = null,
    isRequired = false,
    onChange,
    allowedFileExtensions,
    fileType,
}: {
    label: string;
    name: string;
    defaultValue?: string | null;
    isRequired?: boolean;
    onChange: (file: File | null) => void;
    allowedFileExtensions: string[];
    fileType: FileType;
}) {
    return (
        <FormControl paddingBottom={5}>
            <FormLabel>{label}</FormLabel>
            <File
                onChange={onChange}
                name={name}
                initialFilePath={defaultValue}
                allowedFileExtensions={allowedFileExtensions}
                fileType={fileType}
            />
        </FormControl>
    );
}
