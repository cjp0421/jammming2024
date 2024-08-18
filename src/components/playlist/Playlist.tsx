import styles from "./Playlist.module.css"

function Playlist() {
    return (
        <div className={styles.Playlist}>
            <input defaultValue={"New Playlist"} />
            {/* <!-- Add a TrackList component --> */}
            <button className={styles["Playlist-save"]}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;