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
                <Box key={album.id}>
                    <Grid container>

                        <Grid
                            size={{ xs: 6 }}
                        >
                            <Typography variant="h6">{album.name}</Typography>
                            <Typography variant="subtitle1"> by {album.artist}</Typography>
                        </Grid>

                        <Grid size={{ xs: 6 }}>


                            <Box>
                                <img src={album.image} />
                            </Box>
                            <Box >
                                <Button
                                    onClick={() => props.onAlbumClick(album.id)}

                                >
                                    View Tracks
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

export default AlbumList;