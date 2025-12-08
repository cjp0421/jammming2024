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
                <Box key={artist.id}>
                    <Grid container>

                        <Grid
                            size={{ xs: 6 }}
                        >
                            <Typography variant="h5" >{artist.name}</Typography>
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
                        </Grid>

                        <Grid
                            size={{ xs: 6 }}>
                            <Box>
                                <img src={artist.image} />

                            </Box>
                            <Box >
                                <Button
                                    onClick={() => props.onArtistClick(artist.id)}

                                >
                                    View Albums
                                </Button>


                            </Box>
                        </Grid>
                    </Grid>

                    <br />
                    <Divider />
                </Box >

            ))
            }

        </Box >
    )
}

export default ArtistList;