import { Component as ComponentModel } from 'showed/lib/page/models/component';
import RichText from './component/richText';
import { Box } from '@chakra-ui/react';
import Header from './component/header';
import BoldText from './component/boldText';
import Text from './component/text';
import dynamic from 'next/dynamic';
import { ComponentType } from 'showed/lib/page/models/componentType';
import StainedGlassPhoto from './component/stainedGlassPhoto';
import Spacer from './component/spacer';
import CalendarButton from './component/calendarButton';
import RoundPhoto from './component/roundPhoto';
import UnderlinedAndAbovelinedText from './component/underlinedAndAbovelinedText';
import HeaderWithColoredBackground from './component/headerWithColoredBackground';
import Icon from './component/icon';
import ItalicHeader from './component/italicHeader';
import ItalicText from './component/italicText';
import PositionButton from './component/positionButton';
import PageLinkButton from './component/pageLinkButton';
import Map from './component/map';
import TextBlock from './component/textBlock';

export default async function Component({
    component,
    isInHorizontalBlock,
}: {
    component: ComponentModel;
    isInHorizontalBlock: boolean;
}) {
    const Countdown = dynamic(() => import('./component/countdown'), {
        ssr: false,
    });
    return (
        <Box
            padding={isInHorizontalBlock ? '5px' : '10px'}
            width={component.width ? component.width + 'px' : 'unset'}
        >
            {component.componentType === ComponentType.RICH_TEXT_EDITOR && (
                <RichText component={component} />
            )}
            {component.componentType === ComponentType.COUNTDOWN && (
                <Countdown date={component.content} />
            )}
            {component.componentType === ComponentType.HEADER && (
                <Header text={component.content} font={component.font} />
            )}
            {component.componentType ===
                ComponentType.HEADER_WITH_COLORED_BACKGROUND && (
                <HeaderWithColoredBackground
                    html={component.content}
                    font={component.font}
                />
            )}
            {component.componentType === ComponentType.ITALIC_HEADER && (
                <ItalicHeader text={component.content} font={component.font} />
            )}
            {component.componentType ===
                ComponentType.UNDERLINED_ABOVELINED_TEXT && (
                <UnderlinedAndAbovelinedText component={component} />
            )}
            {component.componentType === ComponentType.BOLD_TEXT && (
                <BoldText text={component.content} font={component.font} />
            )}
            {component.componentType === ComponentType.ITALIC_TEXT && (
                <ItalicText text={component.content} font={component.font} />
            )}
            {component.componentType === ComponentType.TEXT && (
                <Text component={component} />
            )}
            {component.componentType === ComponentType.TEXT_BLOCK && (
                <TextBlock component={component} />
            )}
            {component.componentType === ComponentType.STAINED_GLASS_PHOTO && (
                <StainedGlassPhoto component={component} />
            )}
            {component.componentType === ComponentType.ROUND_PHOTO && (
                <RoundPhoto component={component} />
            )}
            {component.componentType === ComponentType.ICON && (
                <Icon icon={component.content} />
            )}
            {component.componentType === ComponentType.SPACER && (
                <Spacer component={component} />
            )}
            {component.componentType === ComponentType.CALENDAR_BUTTON && (
                <CalendarButton
                    text={component.content}
                    link={component.link as string}
                />
            )}
            {component.componentType === ComponentType.PAGE_LINK_BUTTON && (
                <PageLinkButton
                    text={component.content}
                    link={component.link as string}
                />
            )}
            {component.componentType === ComponentType.POSITION_BUTTON && (
                <PositionButton
                    text={component.content}
                    link={component.link as string}
                />
            )}
            {component.componentType === ComponentType.MAP && (
                <Map localization={component.content} />
            )}
        </Box>
    );
}
