import { Link, Grid, GridItem, IconButton, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useState } from 'react';
import LinkItem from 'showed/components/menu/entities/link';
import { TiThMenu } from 'react-icons/ti';

export default function MobileMenuBar({ links }: { links: LinkItem[] }) {
    const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
    return (
        <>
            <IconButton
                position='absolute'
                right='1px'
                color='white'
                backgroundColor='black'
                aria-label='Afficher/Masquer le menu'
                icon={<Icon as={TiThMenu} />}
                onClick={() => setIsMenuDisplayed(!isMenuDisplayed)}
            />
            <Grid
                minHeight='40px'
                templateColumns={'repeat(1, ' + links.length + ')'}
                fontWeight='600'
                fontFamily={'system-ui'}
                bg='black'
                color='white'
                padding='15px'
            >
                {isMenuDisplayed
                    ? links.map((linkItem) => (
                          <GridItem key={linkItem.target} h='30px'>
                              <Link as={NextLink} href={linkItem.target}>
                                  {linkItem.label}
                              </Link>
                          </GridItem>
                      ))
                    : ''}
            </Grid>
        </>
    );
}
