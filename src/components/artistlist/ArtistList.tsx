import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Album } from "../albumlist/AlbumList";

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
                <Box key={artist.id} sx={{
                    display: 'block'
                }}>
                    <Grid container spacing={2} sx={{
                        display: 'inline-flex',
                        justifyContent: 'space-between',

                    }}>

                        <Grid item xs={6} sx={{
                            display: 'block',
                        }}>
                            <Typography variant="h5" sx={{ width: "100%", ml: 4 }}>{artist.name}</Typography>
                            <ul style={{ fontSize: 'small', marginTop: '-1px', marginLeft: '15px' }}>
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

                        <Grid item xs={6} sx={{ textAlign: 'center' }}>
                            <Box>
                                <img src={artist.image} style={{ width: '45%' }} />

                            </Box>
                            <Box sx={{
                                width: '100%',
                                justifyContent: 'center'
                            }}>
                                <Button
                                    onClick={() => props.onArtistClick(artist.id)}
                                    sx={{
                                        backgroundColor: 'white',

                                    }}
                                >
                                    View Albums
                                </Button>


                            </Box>
                        </Grid>
                    </Grid>

                    <br />
                    <Divider sx={{
                        marginBottom: '3%',
                        width: '100%',
                    }} />
                </Box >

            ))
            }

        </Box >
    )
}

export default ArtistList;