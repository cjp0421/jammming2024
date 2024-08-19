import Track from "../track/Track";
import styles from "./Tracklist.module.css"


function Tracklist(props) {
    return (
        <div className={styles.TrackList}>
            {/* <!-- You will add a map method that renders a set of Track components  --> */}
            {props.userSearchResults.map((track) => (
                <Track track={track} key={track.id} isRemoval={false} />
            ))}
        </div>
    );
}

export default Tracklist;