import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import Tracklist, { Track } from "./Tracklist";

function Playlist(props: { isRemoval: boolean; playlistName: string; onSave: () => void; onNameChange: (name: string) => void; onAdd: (track: Track) => void; playlistTracks: Track[]; onRemove: (track: Track) => void; onArtistClick: (artistId: string) => void; isArtistClickable: boolean }) {

    const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        props.onNameChange(target.value)
    }

    return (
        <Card
            elevation={8}
            sx={{
                bgcolor: "#fff",
                color: "#431448",
                borderRadius: 2,
                border: "1px solid rgba(0,0,0,0.15)",
                boxShadow: "0px 6px 18px rgba(0,0,0,0.20)",
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 3,
                        mb: 3
                    }}
                >
                    <Typography
                        variant='h2'
                        sx={{
                            fontSize: '2rem'
                        }}
                    >
                        New Playlist:
                    </Typography>

                    <TextField
                        size="small"
                        defaultValue={"New Playlist Title"}
                        onChange={handleNameChange}
                        sx={{
                            bgcolor: '#fff'

                        }}
                        slotProps={{
                            input: {
                                sx: {
                                    color: "#2E0D31",
                                    "&::placeholder": {
                                        color: "#2e0d31cc",
                                    }
                                }
                            },
                        }}
                    />
                    <Button
                        onClick={props.onSave}
                        sx={{
                            bgcolor: '#9f21a3 ',
                            color: '#fff'
                        }}
                    >
                        SAVE TO SPOTIFY
                    </Button>
                </Box>
                <Tracklist
                    userSearchResults={props.playlistTracks}
                    isRemoval={props.isRemoval}
                    onAdd={props.onAdd}
                    onRemove={props.onRemove}
                    onArtistClick={props.onArtistClick}
                    isArtistClickable={false}
                />
            </CardContent>
        </Card>
    );
}

export default Playlist;