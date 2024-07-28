import { Box, Spinner } from '@chakra-ui/react';
import SaveForm from '../core/form/saveForm';
import { Color } from 'showed/lib/theme/models/color';
import getThemeColor from '../core/theme/color';
import ColorPickerInput from '../core/form/inputs/colorPickerInput';
import { useEffect, useState } from 'react';
import { Theme } from 'showed/lib/theme/models/theme';
import * as ThemeController from 'showed/controllers/theme/themeController';
import { useContext } from 'react';
import { ThemeContext } from 'showed/app/providers';
import FileInput from '../core/form/inputs/fileInput';
export default function Appearance() {
    const [theme, setTheme] = useState<Theme>({ color: Color.gray });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [icon, setIcon] = useState<File | null>(null);
    const [hasIconChanged, setHasIconChanged] = useState<boolean>(false);
    const { setThemeColor } = useContext(ThemeContext);
    useEffect(() => {
        ThemeController.getTheme().then(async (foundTheme: Theme) => {
            setTheme(foundTheme);
            setIsLoading(false);
        });
    }, []);
    const handleIconChange = async (file: File | null) => {
        setIcon(file);
        setHasIconChanged(true);
    };
    const handleSubmit = async (formData: FormData) => {
        if (hasIconChanged) {
            if (icon) {
                const formData = new FormData();
                formData.append('file', icon);
                await fetch('api/icon', {
                    method: 'POST',
                    body: formData,
                });
            }
        }
        return ThemeController.saveTheme(formData).then(
            async (updatedTheme) => {
                setTheme(updatedTheme);
                setThemeColor(updatedTheme.color);
            }
        );
    };
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <Box padding={'40px'}>
                    <SaveForm
                        parameters={[{ key: 'id', value: theme._id }]}
                        action={handleSubmit}
                    >
                        <ColorPickerInput
                            name='color'
                            label='Couleur du site'
                            defaultValue={getThemeColor(theme.color)[500]}
                            colors={Object.keys(Color).map(
                                (color) => getThemeColor(color as Color)[500]
                            )}
                        />
                        <FileInput
                            defaultValue={'./favicon.ico'}
                            name='logo'
                            label='Logo'
                            onChange={handleIconChange}
                        />
                    </SaveForm>
                </Box>
            )}
        </>
    );
}
