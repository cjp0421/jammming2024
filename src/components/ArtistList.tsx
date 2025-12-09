import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Album } from "./AlbumList";

export type Artist = {
    id: string;
    name: string;
    albums: Album[];
    genres: string[];
    uri: string;
    image?: string;
    type: 'artist';
}

const ArtistList = (props: {
    artists: Artist[];
    onArtistClick: (albumId: string) => void;
}) => {
    return (
        <Box>
            {props.artists.map((artist) => (
                <Box
                    key={artist.id}
                    sx={{ py: 3 }}
                >
                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid
                            size={{ xs: 6 }}
                        >
                            <Typography variant="h5">{artist.name}</Typography>
                            <ul>
                                {
                                    artist.genres?.length > 0 ? (
                                        artist.genres.map((genre: string, index: number) =>
                                            <li key={index}>{genre}</li>
                                        )
                                    ) : (
                                        <li>No genres available</li>
                                    )
                                }
                            </ul>
                            <Box
                                sx={{
                                    justifySelf: 'center',
                                    mt: 4
                                }}
                            >
                                <Button
                                    onClick={() => props.onArtistClick(artist.id)}
                                    sx={{
                                        bgcolor: '#fff',
                                        color: '#431448'
                                    }}
                                >
                                    View Albums
                                </Button>
                            </Box>
                        </Grid>

                        <Grid
                            size={{ xs: 6 }}>
                            <Box>
                                <Box
                                    component='img'
                                    src={artist.image}
                                    alt={artist.name}
                                    sx={{
                                        width: 180,
                                        height: 180,
                                        objectFit: "cover",
                                        borderRadius: 2,
                                    }}
                                />

                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{
                        mt: 3,
                        bgcolor: '#fff'
                    }} />
                </Box >

            ))
            }

        </Box >
    )
}

export default ArtistList;