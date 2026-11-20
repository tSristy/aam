
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FactoryIcon from '@mui/icons-material/Factory';

export const footerIcon = [
    {
        icon: <FacebookIcon sx={{ fontSize: '22px', color: '#cacacaff'}}/>,
        url: "",
    }, 
    {
        icon: <LinkedInIcon sx={{ fontSize: '22px', color: '#9b9b9bff'}}/>,
        url: "",
    },
    {
        icon: <YouTubeIcon sx={{ fontSize: '22px', color: '#9b9b9bff'}}/>,
        url: "",
    }

]

export const footerInfo = [
      {
        icon: <LocationPinIcon />,
        title: "Address",
        description: `Village Imadpur, P.O. Payari, Upozilla Phulpur, Mymensingh, Postal Code 2250`
    },
    {
        icon: <CallIcon />,
        title: "Mobile",
        description: '+8802-55168031-37'

    },
    {
        icon: <MailOutlineIcon />,
        title: "Email",
        description: "mhoque10@gmail.com"
    }
]

export const FactoryInfo = {
        icon: <FactoryIcon />,
        title: "Area",
        description: 'Fulpur Upazila, Mymensingh, Bangladesh'
    }