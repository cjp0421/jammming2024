import { Box } from "@mui/material";
import { Track as TrackType } from "../tracklist/Tracklist";
import styles from "./Track.module.css"

export type TrackProps = {
    isRemoval: boolean;
    onAdd: (track: TrackType) => void;
    onRemove: (track: TrackType) => void;
    track: TrackType;
}

function Track({ isRemoval, onAdd, onRemove, track }: TrackProps) {
    const passTrack = () => {
        onAdd(track)
    }

    const passTrackToRemove = () => {
        onRemove(track)
    }

    const renderAction = () => {
        if (isRemoval) {
            return <button className={styles["Track-action"]} onClick={passTrack}>+</button>
        } else {
            return <button className={styles["Track-action"]} onClick={passTrackToRemove}>-</button>
        }

    }


    return (
        <Box className={styles.Track}>
            <div className={styles["Track-information"]}>
                <h3>{track.name}</h3>
                <img src={track.image} style={{
                    maxWidth: '65px'
                }} />
                <p>{track.artist} | {track.album}</p>
            </div>

            {renderAction()}
        </Box>
    );
}

export default Track;