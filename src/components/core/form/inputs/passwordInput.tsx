import {
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    FormControl,
    FormLabel,
    IconButton,
    InputProps,
} from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordInputProps extends InputProps {
    label?: string;
    isRequired?: boolean;
    defaultValue?: string;
    minLength?: number;
}

export default function PasswordInput({
    label,
    isRequired,
    defaultValue,
    ...props
}: PasswordInputProps) {
    const [value, setValue] = useState(defaultValue || '');
    const [show, setShow] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const isValid = true;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
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
                    <FaLock />
                </InputLeftElement>
                <Input
                    {...props}
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={handleChange}
                    onBlur={() => setIsTouched(false)}
                    onFocus={() => setIsTouched(true)}
                    placeholder='Entrez votre mot de passe'
                />
                <InputRightElement>
                    <IconButton
                        aria-label={
                            show
                                ? 'Masquer le mot de passe'
                                : 'Afficher le mot de passe'
                        }
                        icon={show ? <FaEyeSlash /> : <FaEye />}
                        size='sm'
                        variant='ghost'
                        onClick={() => setShow((v) => !v)}
                        tabIndex={-1}
                    />
                </InputRightElement>
            </InputGroup>
        </FormControl>
    );
}
