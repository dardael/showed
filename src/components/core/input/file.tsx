import {
    Flex,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightAddon,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa6';
import FileData from './fileData';
import { FileType } from './fileType';

export default function File({
    initialFilePath,
    onChange,
    name,
    allowedFileExtensions,
    fileType,
}: {
    initialFilePath: string | null;
    onChange: (file: File | null) => void;
    name: string;
    allowedFileExtensions: string[];
    fileType: FileType;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<FileData | null>({
        name: initialFilePath?.split('/').pop() as string,
        type: initialFilePath?.split('.').pop() as string,
        url: initialFilePath?.replace('public', '') as string,
    });
    const emptyFile = (): void => {
        onChange(null);
        inputRef.current!.value = '';
        setSelectedFile(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            emptyFile();
            return;
        }
        const file = event.target.files[0];
        if (!file) {
            emptyFile();
            return;
        }

        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (!e.target?.result) {
                emptyFile();
                return;
            }
            onChange(file);
            const currentFile = {
                name: file.name,
                type: file.type,
                url: e.target.result as string,
            };
            setSelectedFile({ ...currentFile });
        };
        reader.readAsDataURL(file);
    };
    return (
        <>
            <Flex width={'100%'}>
                <Input
                    ref={inputRef}
                    display={'none'}
                    name={name}
                    type='file'
                    accept={
                        allowedFileExtensions
                            .map((ext) => `.${ext}`)
                            .join(',') || '*'
                    }
                    onChange={handleFileChange}
                />
                <InputGroup minWidth={'300px'}>
                    <Input
                        placeholder='Ajouter un fichier'
                        type='text'
                        value={selectedFile?.name || ''}
                        isReadOnly
                    />
                    <InputRightAddon>
                        <IconButton
                            variant={'ghost'}
                            aria-label='Ajouter un fichier'
                            icon={<FaPlus />}
                            onClick={() => inputRef.current?.click()}
                        />
                        <IconButton
                            variant={'ghost'}
                            aria-label='Supprimer un fichier'
                            icon={<FaTrash />}
                            onClick={emptyFile}
                        />
                    </InputRightAddon>
                </InputGroup>
                {fileType === FileType.IMAGE && (
                    <Image
                        src={selectedFile?.url ? selectedFile.url : ''}
                        alt={selectedFile?.name}
                        paddingLeft={10}
                        flex={1}
                        objectFit={'cover'}
                        maxW={'calc(100% - 300px)'}
                    />
                )}
            </Flex>
        </>
    );
}
