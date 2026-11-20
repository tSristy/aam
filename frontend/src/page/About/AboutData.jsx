import LocationPinIcon from '@mui/icons-material/LocationPin';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

export const HistoryData = [
    {
        id: 1,
        icon: <LocationPinIcon />,
        title: "Location",
        details: "Mymensingh, Bangladesh",
        url: "https://maps.app.goo.gl/1KhyqHcXfYcSGbo19"
    },
    {
        id: 2,
        icon: <CalendarMonthIcon />,
        title: "Established",
        details: "Since 2007"
    },
    {
        id: 3,
        icon: <TextSnippetIcon />,
        title: "Registered Under",
        details: "Department of Social Services, Government of the People's Republic of Bangladesh"
    },
    {
        id: 4,
        icon: <TextSnippetIcon />,
        title: "Registration No.",
        details: "জেসসেকা / ম / নিবন্ধন – ২ / ৩৭৩ / ০৭, \n Date: 23 April 2007"
    }
]


import familyImg from "../../img/Embaded/family.png";
import certificateImg from "../../img/Embaded/certificate.png";
import dadadadiImg from "../../img/Embaded/dadadadi.png";

export const historyImgList = [
    {
        id: 1,
        src: familyImg,
        alt: "Amzad_Ali_secend_genaration",
        author: "Founder"
    },
    {
        id: 2,
        src: certificateImg,
        alt: "CertifiedLicensed",
        author: "Certificate"
    },
    {
        id: 3,
        src: dadadadiImg,
        alt: "Amzad_Ali_and_Akatunnessa",
        author: "Amzad Ali with his Wife"
    },
]


import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';

export const philosophyList = [
    {
        id: 1,
        icon: <FavoriteIcon />,
        title: "Vision",
        details: "Just a healthy and educated society where everyone can live with dignity and smile"
    },
    {
        id: 2,
        icon: <ModeStandbyIcon />,
        title: "Mission",
        details: "To empower underprivileged communities through health services, education, sustainable livelihoods, and humanitarian support."
    }
]

import GroupsIcon from '@mui/icons-material/Groups';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CompostIcon from '@mui/icons-material/Compost';
import SpaIcon from '@mui/icons-material/Spa';
import GppGoodIcon from '@mui/icons-material/GppGood';
import SchoolIcon from '@mui/icons-material/School';
import EmergencyIcon from '@mui/icons-material/Emergency';

export const objectiveList = [
  { id: 1, title: "Non-political, service-oriented activities", icon: <GroupsIcon sx={{ fontSize: "1.2rem"}}/>  },
  { id: 2, title: "Improve health and socio-economic development", icon: <FavoriteIcon  sx={{ fontSize: "1.2rem"}}/> },
  { id: 3, title: "Organize vocational & recreational activities", icon: <CorporateFareIcon sx={{ fontSize: "1.2rem"}}/> },
  { id: 4, title: "Promote modern farming, fishery & livestock development", icon: <SpaIcon sx={{ fontSize: "1.2rem"}}/> },
  { id: 5, title: "Undertake environmental conservation programs (tree plantation, flood management)", icon: <CompostIcon sx={{ fontSize: "1.2rem"}}/> },
  { id: 6, title: "Organize social movements against violence, drug abuse & antisocial activities", icon: <GroupsIcon sx={{ fontSize: "1.2rem"}}/> },
  { id: 7, title: "Protect women's and children's rights", icon: <FavoriteIcon sx={{ fontSize: "1.2rem"}}/> },
  { id: 8, title: "Provide disaster relief and emergency medical services", icon: <GppGoodIcon sx={{ fontSize: "1.2rem"}}/> },
  { id: 9, title: "Support education through scholarships & establishing institutions", icon: <SchoolIcon sx={{ fontSize: "1.2rem"}}/> },
  { id: 10, title: "Run hospitals, clinics & eventually a modern medical college", icon: <GppGoodIcon sx={{ fontSize: "1.2rem"}}/> },
  { id: 11, title: "Launch microcredit programs to reduce poverty", icon: <EmergencyIcon sx={{ fontSize: "1.2rem"}}/> 
}]