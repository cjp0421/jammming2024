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
                <Box
                    key={album.id}
                    sx={{ py: 3 }}
                >
                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid
                            size={{ xs: 6 }}
                        >
                            <Typography variant="h5">{album.name}</Typography>
                            <Typography variant="subtitle1"> by {album.artist}</Typography>
                            <Box
                                sx={{
                                    justifySelf: 'center',
                                    mt: 4
                                }}
                            >
                                <Button
                                    onClick={() => props.onAlbumClick(album.id)}
                                    sx={{
                                        bgcolor: '#fff',
                                        color: '#431448'
                                    }}
                                >
                                    View Tracks
                                </Button>


                            </Box>
                        </Grid>

                        <Grid size={{ xs: 6 }}>


                            <Box
                                component='img'
                                src={album.image}
                                alt={album.name}
                                sx={{
                                    width: 180,
                                    height: 180,
                                    objectFit: "cover",
                                    borderRadius: 2,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <br />
                    <Divider
                        sx={{
                            mt: 3,
                            bgcolor: '#fff'
                        }}
                    />
                </Box >

            ))
            }

        </Box >
    )
}

export default AlbumList;