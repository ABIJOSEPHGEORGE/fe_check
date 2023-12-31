import { CiChat1, CiMail } from "react-icons/ci";
import { MdOutlinePeople } from "react-icons/md";
import { PiPhoneCallThin } from "react-icons/pi";

export const ContactPreferencesOptions = [
    {
        name: 'Text',
        icon: CiChat1,
        value:'text'
    },
    {
        name: 'Call',
        icon: PiPhoneCallThin,
        value: 'call',
    },
    {
        name: 'Email',
        icon: CiMail,
        value: 'email',
    },
    {
        name: 'In person',
        icon: MdOutlinePeople,
        value: 'in-person',
    }
];
