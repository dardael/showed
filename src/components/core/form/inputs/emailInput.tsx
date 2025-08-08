import {
    Input,
    InputGroup,
    InputLeftElement,
    InputProps,
    FormControl,
    FormErrorMessage,
    FormLabel,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

interface EmailInputProps extends InputProps {
    label?: string;
    isRequired?: boolean;
    defaultValue?: string;
}
export default function EmailInput({
    label,
    isRequired,
    defaultValue,
    ...props
}: EmailInputProps) {
    const [value, setValue] = useState(defaultValue || '');
    const [isValid, setIsValid] = useState(true);
    const [isTouched, setIsTouched] = useState(false);

    const validateEmail = (email: string) => {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        setValue(input);
        setIsValid(validateEmail(input));
    };

    return (
        <FormControl isRequired={isRequired} isInvalid={!isValid && !isTouched}>
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents='none' color='gray.300'>
                    <FaEnvelope />
                </InputLeftElement>
                <Input
                    {...props}
                    isInvalid={!isValid && !isTouched}
                    type='email'
                    value={value}
                    onChange={handleChange}
                    onBlur={() => setIsTouched(false)}
                    onFocus={() => setIsTouched(true)}
                    placeholder='Entrez votre adresse email'
                />
            </InputGroup>
            {!isValid && !isTouched && (
                <FormErrorMessage>Adresse email invalide</FormErrorMessage>
            )}
        </FormControl>
    );
}
