import Tracklist, { Track } from "../tracklist/Tracklist";
import styles from "./Playlist.module.css"

function Playlist(props: { isRemoval: boolean; playlistName: string; onAdd: (track: Track) => void; playlistTracks: Track[]; onRemove: (track: Track) => void; }) {
    return (
        <div className={styles.Playlist}>
            <input defaultValue={"New Playlist"} />
            {/* <!-- Add a TrackList component --> */}
            <Tracklist userSearchResults={props.playlistTracks} isRemoval={props.isRemoval} onAdd={props.onAdd} onRemove={props.onRemove} />
            <button className={styles["Playlist-save"]}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;