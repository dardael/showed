import {
    Roboto_Flex as GoogleRobotoFlex,
    Advent_Pro as GoogleAdventPro,
} from 'next/font/google';
import { Font } from 'showed/lib/theme/models/font';
export default function getFontFamily(font: Font | undefined): string {
    switch (font) {
        case Font.ROBOTO_FLEX:
            return RobotoFlex.style.fontFamily;
        case Font.ADVENT_PRO:
            return AdventPro.style.fontFamily;
        default:
            return '';
    }
}
const RobotoFlex = GoogleRobotoFlex({ subsets: ['latin'] });
const AdventPro = GoogleAdventPro({ subsets: ['latin'] });
