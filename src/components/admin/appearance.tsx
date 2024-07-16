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
export default function Appearance() {
    const [theme, setTheme] = useState<Theme>({ color: Color.gray });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { setThemeColor } = useContext(ThemeContext);
    useEffect(() => {
        ThemeController.getTheme().then((foundTheme: Theme) => {
            setTheme(foundTheme);
            setIsLoading(false);
        });
    }, []);
    return (
        <>
            {isLoading ? (
                <Spinner size='xl' />
            ) : (
                <Box padding={'40px'}>
                    <SaveForm
                        parameters={[{ key: 'id', value: theme._id }]}
                        action={async (formData: FormData) => {
                            return ThemeController.saveTheme(formData).then(
                                (updatedTheme) => {
                                    setTheme(updatedTheme);
                                    setThemeColor(updatedTheme.color);
                                }
                            );
                        }}
                    >
                        <ColorPickerInput
                            name='color'
                            label='Couleur du site'
                            defaultValue={getThemeColor(theme.color)[500]}
                            colors={Object.keys(Color).map(
                                (color) => getThemeColor(color as Color)[500]
                            )}
                        />
                    </SaveForm>
                </Box>
            )}
        </>
    );
}
