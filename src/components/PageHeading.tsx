import { Typography } from "@mui/material";

export default function PageHeading() {
    return (
        <header className="page-heading-container">

            <Typography variant="h1" className="page-title">
                Ja<span className="highlight">mmm</span>ing
            </Typography>

            <nav className="header-links">
                <a
                    className="header-link"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    href="https://github.com/cjp0421/jammming2024"
                >
                    Github
                </a>

                <a
                    className="header-link"
                    target="_blank"
                    href="https://cjp0421.github.io/my-portfolio/"
                >
                    Portfolio
                </a>

                <a
                    className="header-link"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    href="https://www.linkedin.com/in/carol-joy-pedersen"
                >
                    LinkedIn
                </a>
            </nav>

        </header>
    );
}
