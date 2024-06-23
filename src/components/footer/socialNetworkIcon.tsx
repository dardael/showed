import { FaSquareFacebook, FaSquarePhone } from 'react-icons/fa6';
import { IoMdMail } from 'react-icons/io';
import { RiInstagramFill } from 'react-icons/ri';
import { SocialNetwork } from 'showed/lib/socialNetwork/models/socialNetwork';

export default function SocialNetworkIcon({
    socialNetwork,
}: {
    socialNetwork: SocialNetwork;
}) {
    let icone;
    switch (socialNetwork.name) {
        case 'Instagram':
            icone = <RiInstagramFill fontSize='xx-large' color='white' />;
            break;
        case 'Facebook':
            icone = <FaSquareFacebook fontSize='xx-large' color='white' />;
            break;
        case 'Contact':
            icone = <IoMdMail fontSize='xx-large' color='white' />;
            break;
        case 'Phone':
            icone = <FaSquarePhone fontSize='xx-large' color='white' />;
            break;
        default:
            icone = <></>;
    }
    return icone;
}
