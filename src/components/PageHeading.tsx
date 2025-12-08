import { AppBar, Grid, Link, Toolbar, Typography } from "@mui/material";

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
                            gap: 5
                        }}
                    >
                        <Link
                            className="header-link"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            href="https://github.com/cjp0421/jammming2024"
                            sx={{
                                color: '#fff',
                                textDecoration: 'none'
                            }}
                        >
                            Github
                        </Link>
                        <Link
                            className="header-link"
                            target="_blank"
                            href="https://cjp0421.github.io/my-portfolio/"
                            sx={{
                                color: '#fff',
                                textDecoration: 'none',
                            }}
                        >
                            Portfolio
                        </Link>
                        <Link
                            className="header-link"
                            target="_blank"
                            referrerPolicy="no-referrer"
                            href="https://www.linkedin.com/in/carol-joy-pedersen"
                            sx={{
                                color: '#fff',
                                textDecoration: 'none'
                            }}
                        >
                            LinkedIn
                        </Link>
                    </Grid>
                </Toolbar>
            </AppBar>

        </header>
    );
}
