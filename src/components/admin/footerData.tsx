import { Box } from '@chakra-ui/react';
import SocialNetworkData from 'showed/components/admin/footer/socialNetworkData';
import VerticalTabs from 'showed/components/core/tabs/verticalTabs';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';

export default function FooterData() {
    return (
        <Box padding={'40px'}>
            <VerticalTabs
                pages={[
                    {
                        title: 'Instagram',
                        content: (
                            <SocialNetworkData
                                key={SocialNetworkName.Instagram.toString()}
                                name={SocialNetworkName.Instagram}
                            />
                        ),
                    },
                    {
                        title: 'Facebook',
                        content: (
                            <SocialNetworkData
                                key={SocialNetworkName.Facebook.toString()}
                                name={SocialNetworkName.Facebook}
                            />
                        ),
                    },
                    {
                        title: 'Téléphone',
                        content: (
                            <SocialNetworkData
                                key={SocialNetworkName.Phone.toString()}
                                name={SocialNetworkName.Phone}
                                unchangableText='Numéro de téléphone'
                                linkLabel='Numéro de téléphone'
                            />
                        ),
                    },
                    {
                        title: 'Lien vers la page de contact',
                        content: (
                            <SocialNetworkData
                                key={SocialNetworkName.Contact.toString()}
                                name={SocialNetworkName.Contact}
                                unchangableLink='/contact'
                            />
                        ),
                    },
                ]}
            />
        </Box>
    );
}
