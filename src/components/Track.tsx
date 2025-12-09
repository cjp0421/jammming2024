import { Box, Button, Grid, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Track as TrackType } from "./Tracklist";

export type TrackProps = {
    isRemoval: boolean;
    onAdd: (track: TrackType) => void;
    onRemove: (track: TrackType) => void;
    track: TrackType;
}

function Track({ isRemoval, onAdd, onRemove, track, onArtistClick, isArtistClickable }: TrackProps & { onArtistClick: (artistId: string) => void; isArtistClickable?: boolean; }) {
    const passTrack = () => {
        onAdd(track)
    }

    const passTrackToRemove = () => {
        onRemove(track)
    }

    const renderAction = () => {
        if (isRemoval) {
            return <Button
                onClick={passTrack}
                variant="outlined"
                sx={{
                    width: '50%',
                    bgcolor: '#fff',
                    color: '#1f6c4a',
                    borderColor: '#1f6c4a',
                }}
            >
                {<AddIcon />}
            </Button>
        } else {
            return <Button
                onClick={passTrackToRemove}
                variant="outlined"
                sx={{
                    width: '50%',
                    bgcolor: '#fff',
                    color: '#5e2740',
                    borderColor: '#5e2740',
                }}
            >
                {<DeleteIcon />}
            </Button>
        }

    }


    return (
        <Grid
            container
            spacing={2}
            sx={{
                justifyContent: 'center',
                mb: 5,
            }}
        >
            <Grid
                size={{
                    xs: 12,
                    md: 6
                }}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 0.5,
                    alignContent: 'center',
                    textAlign: 'center'
                }}
            >
                <Typography
                    variant='h3'
                    sx={{
                        fontSize: '1.4rem',
                    }}
                >
                    {track.name}
                </Typography>
                <Typography
                    variant='subtitle1'
                >
                    {
                        isArtistClickable ? (
                            <span
                                onClick={() => onArtistClick(track.artistId)}
                            >{track.artist}
                            </span>
                        ) : (
                            track.artist)} | {track.album}

                </Typography>
            </Grid>
            <Grid
                size={{
                    xs: 4
                }}
            >
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={track.image}
                        style={{
                            width: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </Grid>

            </Grid>
            <Grid
                size={{
                    xs: 12
                }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 2
                }}
            >
                <Box
                    sx={{
                        width: "80%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {renderAction()}
                </Box>
            </Grid>
        </Grid>
    );
}

export default Track;