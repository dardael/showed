import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    InputProps,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { FaPhone } from 'react-icons/fa6';

interface PhoneNumberInputProps extends InputProps {
    label?: string;
    isRequired?: boolean;
    defaultValue?: string;
}
export default function PhoneNumberInput({
    label,
    isRequired,
    defaultValue,
    ...props
}: PhoneNumberInputProps) {
    const formatPhoneNumber = (input: string) => {
        // Remove all non-digit characters
        const digits = input.replace(/\D/g, '');

        // Format the digits into the pattern xx xx xx xx xx
        const formatted = digits
            .slice(0, 10) // Limit to 10 digits
            .replace(/(\d{2})(?=\d)/g, '$1 '); // Add a space every 2 digits

        return formatted.trim(); // Remove trailing spaces
    };
    const [value, setValue] = useState(formatPhoneNumber(defaultValue || ''));
    const [isValid, setIsValid] = useState(true);
    const [isTouched, setIsTouched] = useState(false);

    const validatePhoneNumber = (input: string): boolean => {
        // Remove all non-digit characters
        const digits = input.replace(/\D/g, '');

        // Check if it contains exactly 10 digits
        if (digits.length !== 10) {
            return false;
        }

        // Check if the formatted input matches the pattern xx xx xx xx xx
        const formatted = digits.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
        const regex = /^\d{2} \d{2} \d{2} \d{2} \d{2}$/;

        return regex.test(formatted);
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const formatted = formatPhoneNumber(input);
        setIsValid(validatePhoneNumber(formatted));
        setValue(formatted);
    };

    return (
        <FormControl
            isRequired={isRequired}
            paddingBottom={5}
            isInvalid={!isValid && !isTouched}
        >
            <FormLabel>{label}</FormLabel>
            <InputGroup>
                <InputLeftElement pointerEvents='none' color='gray.300'>
                    <FaPhone />
                </InputLeftElement>
                <Input
                    {...props}
                    isInvalid={!isValid && !isTouched}
                    value={value}
                    onBlur={() => setIsTouched(false)}
                    onFocus={() => setIsTouched(true)}
                    onChange={handleChange}
                    placeholder='xx xx xx xx xx'
                    maxLength={14} // 10 digits + 4 spaces
                />
            </InputGroup>
            {!isValid && !isTouched && (
                <FormErrorMessage>
                    Numéro de téléphone invalide
                </FormErrorMessage>
            )}
        </FormControl>
    );
}
