import { Box } from '@chakra-ui/react';
import SocialNetworkData from 'showed/components/admin/footer/socialNetworkData';
import VerticalTabs from 'showed/components/core/tabs/verticalTabs';
import { SocialNetworkName } from 'showed/lib/socialNetwork/models/socialNetworkName';
import PhoneNumberData from 'showed/components/admin/footer/phoneNumberData';
import EmailData from 'showed/components/admin/footer/emailData';

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
                            <PhoneNumberData
                                key={SocialNetworkName.Phone.toString()}
                            />
                        ),
                    },
                    {
                        title: 'Email',
                        content: (
                            <EmailData
                                key={SocialNetworkName.Email.toString()}
                            />
                        ),
                    },
                ]}
            />
        </Box>
    );
}
