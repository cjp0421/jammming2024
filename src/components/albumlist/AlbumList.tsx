import { Box, Button, Divider, Grid, Typography } from "@mui/material";

export type Album = {
    id: string;
    name: string;
    artist: string;
    uri: string;
    image?: string;
    type: 'album';
}

const AlbumList = (props: {
    albums: Album[];
    onAlbumClick: (albumId: string) => void;
    onArtistClick: (artistId: string) => void;
    isArtistClickable?: boolean;
}) => {
    return (
        <Box>
            {props.albums.map((album) => (
                <Box key={album.id} sx={{
                    display: 'block'
                }}>
                    <Grid container spacing={2} sx={{
                        display: 'inline-flex',
                        justifyContent: 'space-between',

                    }}>

                        <Grid item xs={6} sx={{
                            display: 'block',
                        }}>
                            <Typography variant="h6" sx={{ width: "100%", ml: 4, fontWeight: '600', letterSpacing: 1 }}>{album.name}</Typography>
                            <Typography variant="subtitle1" sx={{ width: "100%", ml: 4 }}> by {album.artist}</Typography>
                        </Grid>

                        <Grid item xs={6} sx={{ textAlign: 'center' }}>


                            <Box>
                                <img src={album.image} style={{ width: '45%' }} />
                            </Box>
                            <Box sx={{
                                width: '100%',
                                justifyContent: 'center'
                            }}>
                                <Button
                                    onClick={() => props.onAlbumClick(album.id)}
                                    sx={{
                                        backgroundColor: '#f9f9f9',
                                        color: '#5e2740',
                                    }}
                                >
                                    View Tracks
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

export default AlbumList;