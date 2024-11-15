import Track from "../track/Track";
import styles from "./Tracklist.module.css"

export type Track = {
    name: string;
    artist: string;
    album: string;
    id: number;
    uri?: string;
    image?: string;
    type?: string;
}

function Tracklist(props: { userSearchResults: Track[]; isRemoval: boolean; onAdd: (track: Track) => void; onRemove: (track: Track) => void; }) {
    return (
        <div className={styles.TrackList}>

            {props.userSearchResults.length > 0 ? (props.userSearchResults?.map((track) => (
                <Track track={track} key={track.id} isRemoval={props.isRemoval} onAdd={props.onAdd} onRemove={props.onRemove} />
            ))) : (<h4>Nothing Here Yet!</h4>)}
        </div>
    );
}

export default Tracklist;