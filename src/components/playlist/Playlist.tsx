import Tracklist from "../tracklist/Tracklist";
import styles from "./Playlist.module.css"

function Playlist(props: { playlistTracks: any[]; isRemoval: any; playlistName: any; onAdd: any; onRemove: any; }) {
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