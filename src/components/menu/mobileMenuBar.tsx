import { Link, Grid, GridItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import LinkItem from 'showed/lib/menu/entities/link';

export default function MobileMenuBar({ links }: { links: LinkItem[] }) {
    return (
        <Grid
            templateColumns={'repeat(1, ' + links.length + ')'}
            fontWeight='600'
            fontFamily={'system-ui'}
            bg='black'
            color='white'
        >
            {links.map((linkItem) => (
                <GridItem key={linkItem.target}>
                    <Link as={NextLink} href={linkItem.target}>
                        {linkItem.label}
                    </Link>
                </GridItem>
            ))}
        </Grid>
    );
}