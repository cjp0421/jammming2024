import { Box, Divider, Typography } from '@mui/material';
import Track from './Track';

export type Track = {
    name: string;
    artist: string;
    artistId: string;
    album: string;
    id: number;
    uri: string;
    image?: string;
    type?: string;
}

function Tracklist(props: { userSearchResults: Track[]; isRemoval: boolean; onAdd: (track: Track) => void; onRemove: (track: Track) => void; onArtistClick: (artistId: string) => void; isArtistClickable?: boolean; }) {
    return (
        <Box>
            {props.userSearchResults.length > 0 ? (props.userSearchResults?.map((track) => (
                <Box>
                    <Track track={track} key={track.id} isRemoval={props.isRemoval} onAdd={props.onAdd} onRemove={props.onRemove} onArtistClick={props.onArtistClick} isArtistClickable={props.isArtistClickable} />
                    <Divider
                        sx={{
                            my: 3,
                            bgcolor: '#fff'
                        }}
                    />
                </Box>
            ))) : (<Typography variant="h6">Nothing Here Yet!</Typography>)}
        </Box>
    );
}

export default Tracklist;