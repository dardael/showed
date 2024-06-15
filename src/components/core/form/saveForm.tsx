import { Box, Button } from '@chakra-ui/react';

export default function SaveForm({ children }: { children: React.ReactNode }) {
    return (
        <>
            <form>
                {children}
                <Box textAlign={'right'} paddingTop={'20px'}>
                    <Button color='white' colorScheme='red' type='submit'>
                        Enregistrer
                    </Button>
                </Box>
            </form>
        </>
    );
}
