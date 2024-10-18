import { Box, Center, Flex, Grid, GridItem, Icon } from '@chakra-ui/react';
import { getFile } from 'showed/controllers/image/imageController';
import { Block as BlockModel, isBlock } from 'showed/lib/page/models/block';
import { Component as ComponentModel } from 'showed/lib/page/models/component';
import Component from './component';
import { getComponents } from 'showed/controllers/page/componentController';
import { getTheme } from 'showed/controllers/theme/themeController';
import DecorativeBar from './block/decorativeBar';

export default async function LinkedBlock({ block }: { block: BlockModel }) {
    const components = await getComponents(block._id as string);
    let backgroundImage: string | undefined = '';
    if (block.backgroundImageId) {
        backgroundImage = (
            await getFile(block.backgroundImageId)
        )?.filepath.replace('./public', '');
    }
    const theme = await getTheme();
    return (
        <Box
            backgroundImage={backgroundImage}
            backgroundSize={'cover'}
            backgroundRepeat={'no-repeat'}
            padding={'10px'}
            width={'100%'}
        >
            <Box
                padding={'10px'}
                borderRadius={'10px'}
                {...(block.hasTransparentBackground && {
                    backgroundColor: '#FFFFFFBD',
                    boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.22)',
                })}
            >
                <Grid templateColumns={'50px auto'} columnGap={'50px'}>
                    {components.map((element, index) => (
                        <>
                            <GridItem>
                                <DecorativeBar
                                    isWithTopBar={index !== 0}
                                    isWithBottomBar={
                                        index !== components.length - 1
                                    }
                                />
                            </GridItem>
                            <GridItem>
                                <Box
                                    marginTop={'10px'}
                                    paddingRight={'10px'}
                                    paddingLeft={'10px'}
                                    paddingBottom={'10px'}
                                    borderRadius={'10px'}
                                    color={'white'}
                                    backgroundColor={theme.color + '.500'}
                                    width={'100%'}
                                >
                                    <Box
                                        position={'relative'}
                                        top={'22px'}
                                        left={'-18px'}
                                        backgroundColor={theme.color + '.500'}
                                        width={'15px'}
                                        height={'15px'}
                                        transform={'rotate(45deg)'}
                                    />
                                    <Component
                                        isInHorizontalBlock={false}
                                        component={element as ComponentModel}
                                    />
                                </Box>
                            </GridItem>
                        </>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
