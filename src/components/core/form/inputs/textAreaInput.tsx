import {
    FormControl,
    FormLabel,
    TextareaProps,
    Textarea,
} from '@chakra-ui/react';

interface TextAreaInputProps extends TextareaProps {
    label?: string;
    isRequired?: boolean;
}
export default function TextAreaInput({
    label,
    isRequired,
    ...props
}: TextAreaInputProps) {
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <Textarea {...props} />
        </FormControl>
    );
}
