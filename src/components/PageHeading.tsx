import { AppBar, Box, Grid, Link, Toolbar, Typography } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';

export default function PageHeading() {
    return (
        <header className="page-heading-container">

            <AppBar
                component="nav"
                sx={{
                    backgroundColor: '#431448',
                }}
            >
                <Toolbar>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: '3rem',
                            flexGrow: 1,
                            color: '#fff'
                        }}>
                        Ja<span className="highlight">mmm</span>ing
                    </Typography>
                    <Grid
                        container
                        sx={{
                            gap: { 'md': 5, 'xs': 1.5 }
                        }}
                    >
                        <Link
                            className="header-link"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            href="https://github.com/cjp0421/jammming2024"
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                                display: "flex",
                                alignItems: "center",
                                gap: 0.6,
                            }}
                        >
                            <GitHubIcon fontSize="small" />
                            <Box
                                sx={{
                                    display: { xs: "none", md: "inline" }
                                }}
                            >
                                GitHub
                            </Box>
                        </Link>
                        <Link
                            className="header-link"
                            target="_blank"
                            href="https://cjp0421.github.io/my-portfolio/"
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                                display: "flex",
                                alignItems: "center",
                                gap: 0.6,
                            }}
                        >
                            <LanguageIcon fontSize="small" />
                            <Box
                                sx={{
                                    display: { xs: "none", md: "inline" }
                                }}
                            >
                                Portfolio
                            </Box>
                        </Link>
                        <Link
                            className="header-link"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            href="https://www.linkedin.com/in/carol-joy-pedersen"
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                                display: "flex",
                                alignItems: "center",
                                gap: 0.6,
                            }}
                        >
                            <LinkedInIcon fontSize="small" />
                            <Box
                                sx={{
                                    display: { xs: "none", md: "inline" }
                                }}
                            >

                                LinkedIn
                            </Box>
                        </Link>
                    </Grid>
                </Toolbar>
            </AppBar>

        </header>
    );
}
