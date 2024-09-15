import Track from "../track/Track";
import styles from "./Tracklist.module.css"

export type Track = {
    name: string;
    artist: string;
    album: string;
    id: number;
}

function Tracklist(props: { userSearchResults: Track[]; isRemoval: boolean; onAdd: (track: Track) => void; onRemove: (track: Track) => void; }) {
    return (
        <div className={styles.TrackList}>
            {/* <!-- You will add a map method that renders a set of Track components  --> */}
            {props.userSearchResults?.map((track) => (
                <Track track={track} key={track.id} isRemoval={props.isRemoval} onAdd={props.onAdd} onRemove={props.onRemove} />
            ))}
        </div>
    );
}

export default Tracklist;