import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useNavigate } from 'react-router-dom';

const mainListItems = [
    { text: 'Inicio', icon: <HomeRoundedIcon /> },
    { text: 'Maquinas', icon: <AnalyticsRoundedIcon /> },
    { text: 'Mantenimiento', icon: <PeopleRoundedIcon /> },
];

const secondaryListItems = [
    { text: 'Profile', icon: <SettingsRoundedIcon /> },
    { text: 'Roles', icon: <InfoRoundedIcon /> },
    { text: 'Algo mas', icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const naviga = useNavigate();

    const handleListItemClick = (index, item) => {
        setSelectedIndex(index);
        naviga(item)
    };

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton selected={selectedIndex === `main-${index}`}
                        onClick={() => handleListItemClick(`main-${index}`, item.text)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List dense>
                {secondaryListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}
                    selected={selectedIndex === `secondary-${index}`}
                    onClick={() => handleListItemClick(`secondary-${index}`, item.text)}>
                        <ListItemButton>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack>
    );
}