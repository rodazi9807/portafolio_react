import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Search from '../componentes/Search';
import SideMenu from '../componentes/SideMenu';
import Header from '../componentes/Header';

import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';



export default function Dashboard(props) {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <SideMenu />  
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: 'auto',
        })}
      >
        
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          
          <Header />
          <h1>HOLA MUNDO</h1>
        </Stack>
      </Box>

      </div>
    
  )
}