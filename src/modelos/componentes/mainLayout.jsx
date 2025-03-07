import { Outlet } from "react-router-dom";
import { alpha } from '@mui/material/styles';
import SideMenu from "./SideMenu";
import Header from './Header';

import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';

const MainLayout = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                    <main style={{ padding: "20px", height: "100%", width: "100%" }}>
                        <Outlet /> {/* Aquí se renderizan las páginas */}
                    </main>
                </Stack>
            </Box>
        </div>
    );
};

export default MainLayout;