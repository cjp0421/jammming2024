import { Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Track as TrackType } from "../tracklist/Tracklist";
import styles from "./Track.module.css"

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
            return <button className={styles["Track-action"]} onClick={passTrack}>{<AddIcon />}</button>
        } else {
            return <button className={styles["Track-action"]} onClick={passTrackToRemove}>{<DeleteIcon />}</button>
        }

    }


    return (
        <Box className={styles.Track}>
            <div className={styles["Track-information"]}>
                <h3>{track.name}</h3>
                <img src={track.image} style={{
                    maxWidth: '65px'
                }} />
                <p>
                    {
                        isArtistClickable ? (
                            <span className={styles["track-artist"]}
                                onClick={() => onArtistClick(track.artistId)}
                                style={{
                                    cursor: 'pointer'
                                }}
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