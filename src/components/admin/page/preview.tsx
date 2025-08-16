import { Block, isBlock } from 'showed/lib/page/models/block';
import { Component, isComponent } from 'showed/lib/page/models/component';
import { isPage, Page } from 'showed/lib/page/models/page';
import PageComponent from 'showed/components/page/page';
import BlockComponent from 'showed/components/page/block';
import ComponentComponent from 'showed/components/page/component';
import { BlockType } from 'showed/lib/page/models/blockType';
import HorizontalBlock from 'showed/components/page/horizontalBlock';
import LinkedBlock from 'showed/components/page/linkedBlock';
import InvitationBlock from 'showed/components/page/invitationBlock';
import ProductsBlock from 'showed/components/page/productsBlock';
const Preview = ({ element }: { element: Page | Block | Component }) => {
    if (isPage(element)) {
        return <PageComponent page={element} />;
    }
    if (isBlock(element)) {
        switch (element.blockType) {
            case BlockType.HORIZONTAL:
                return <HorizontalBlock block={element} />;
            case BlockType.VERTICAL:
                return <BlockComponent block={element} />;
            case BlockType.LINKED:
                return <LinkedBlock block={element} />;
            case BlockType.INVITATION:
                return <InvitationBlock block={element} />;
            case BlockType.PRODUCTS:
                return <ProductsBlock />;
            default:
                throw new Error('Block type not handled');
        }
    }
    if (isComponent(element)) {
        return (
            <ComponentComponent
                component={element}
                isInHorizontalBlock={false}
            />
        );
    }
    throw new Error('Element not handled for preview');
};
export default Preview;
