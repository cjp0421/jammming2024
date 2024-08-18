import Track from "../track/Track";
import styles from "./Tracklist.module.css"

function Tracklist() {
    return (
        <div className={styles.TrackList}>
            {/* <!-- You will add a map method that renders a set of Track components  --> */}
            <Track isRemoval={false} />
        </div>
    );
}

export default Tracklist;