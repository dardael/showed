import { Box } from '@chakra-ui/react';
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
import TextInput from '../core/form/inputs/textInput';
import CheckBoxInput from '../core/form/inputs/checkBoxInput';
import { FileType } from '../core/input/fileType';
import {
    WebsiteMode,
    getWebsiteModeLabel,
} from 'showed/lib/theme/models/websiteMode';
import SelectInput from '../core/form/inputs/selectInput';
import Loading from '../core/feedback/loading';
import { getFile } from 'showed/controllers/image/imageController';
export default function Appearance() {
    const [theme, setTheme] = useState<Theme>({
        color: Color.gray,
        websiteMode: WebsiteMode.ONLINE_STOREFRONT,
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [icon, setIcon] = useState<File | null>(null);
    const [hasIconChanged, setHasIconChanged] = useState<boolean>(false);
    const { setThemeColor } = useContext(ThemeContext);
    const [hasLogoChanged, setHasLogoChanged] = useState<boolean>(false);
    const [logo, setlogo] = useState<File | null>(null);
    const [initialLogoPath, setInitialLogoPath] = useState<string | null>(null);
    useEffect(() => {
        ThemeController.getTheme().then(async (foundTheme: Theme) => {
            if (foundTheme.logoImageId) {
                const file = await getFile(foundTheme.logoImageId);
                setInitialLogoPath(file?.filepath as string);
                setTheme(foundTheme);
                setIsLoading(false);
            } else {
                setTheme(foundTheme);
                setIsLoading(false);
            }
        });
    }, []);
    const handleIconChange = async (logo: File | null) => {
        setIcon(logo);
        setHasIconChanged(true);
    };

    const handleLogoChange = async (logo: File | null) => {
        setlogo(logo);
        setHasLogoChanged(true);
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
            setIcon(null);
            setHasIconChanged(false);
        }
        if (hasLogoChanged) {
            if (theme.logoImageId) {
                await fetch(`api/image/${theme.logoImageId}`, {
                    method: 'DELETE',
                });
                formData.delete('logoImageId');
            }
            if (logo) {
                const logoFormData = new FormData();
                logoFormData.append('file', logo);
                const result = await (
                    await fetch('api/image', {
                        method: 'POST',
                        body: logoFormData,
                    })
                ).json();

                formData.set('logoImageId', result.id);
            }
            setHasLogoChanged(false);
            setlogo(null);
        }
        return ThemeController.saveTheme(formData).then(
            async (updatedTheme) => {
                setTheme(updatedTheme);
                setThemeColor(updatedTheme.color);
            }
        );
    };
    return (
        <Loading isLoading={isLoading}>
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
                    <SelectInput
                        name='websiteMode'
                        label='Mode'
                        defaultValue={theme.websiteMode}
                        options={[
                            WebsiteMode.ONLINE_STOREFRONT,
                            WebsiteMode.INVITATION,
                        ].map((websiteMode) => ({
                            label: getWebsiteModeLabel(websiteMode),
                            value: websiteMode,
                        }))}
                    />
                    <FileInput
                        defaultValue={'/favicon.ico'}
                        name='icon'
                        label='Icon'
                        onChange={handleIconChange}
                        allowedFileExtensions={['ico']}
                        fileType={FileType.IMAGE}
                    />
                    <FileInput
                        defaultValue={initialLogoPath}
                        name='logo'
                        label='Logo'
                        onChange={handleLogoChange}
                        allowedFileExtensions={['png', 'jpg', 'jpeg']}
                        fileType={FileType.IMAGE}
                    />

                    <TextInput
                        name='title'
                        label='Titre du site'
                        placeholder='Titre du site'
                        defaultValue={theme.title}
                    />
                    <TextInput
                        name='description'
                        label='Description du site'
                        placeholder='Description du site'
                        defaultValue={theme.description}
                    />
                    <CheckBoxInput
                        name='isMenuHidden'
                        label='Masquer le menu'
                        defaultValue={theme.isMenuHidden}
                    />
                </SaveForm>
            </Box>
        </Loading>
    );
}
