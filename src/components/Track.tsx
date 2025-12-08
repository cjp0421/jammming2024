import { Box } from "@mui/material";
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
            return <button onClick={passTrack}>{<AddIcon />}</button>
        } else {
            return <button onClick={passTrackToRemove}>{<DeleteIcon />}</button>
        }

    }


    return (
        <Box>
            <div>
                <h3>{track.name}</h3>
                <img src={track.image} />
                <p>
                    {
                        isArtistClickable ? (
                            <span
                                onClick={() => onArtistClick(track.artistId)}
                            >{track.artist}
                            </span>
                        ) : (
                            track.artist)} | {track.album}

                </p>
            </div>

            {renderAction()}
        </Box>
    );
}

export default Track;