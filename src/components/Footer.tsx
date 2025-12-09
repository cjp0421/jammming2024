import { Box, Link } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                position: "fixed",
                bottom: 36,
                right: 16,
                zIndex: 9999,
            }}
        >
            <Link
                target="_blank"
                referrerPolicy="no-referrer"
                href='https://github.com/cjp0421/jammming2024/blob/main/README.md'
                sx={{
                    backgroundColor: '#431448',
                    p: 2,
                    borderRadius: '20%',
                    color: '#fff',
                    textDecoration: 'none'
                }}
            >
                About
            </Link>
        </Box>
    )
}