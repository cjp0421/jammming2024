import { Button } from "@mui/material";
import { MouseEventHandler } from "react";

type ConnectButtonProps = {
    isLoggedIn: boolean,
    handleLogin: MouseEventHandler<HTMLButtonElement>
}

export default function ConnectButton({ isLoggedIn, handleLogin }: ConnectButtonProps) {

    return (
        <Button
            type="button"
            onClick={handleLogin}
            variant="contained"
            sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                py: 1.5,
                backgroundColor: isLoggedIn ? '#9f21a3' : '#1e131c',
                mt: 7
            }}
        >
            {isLoggedIn ? "Connected to Spotify!" : "Click here to connect to Spotify"}
        </Button>
    )
}