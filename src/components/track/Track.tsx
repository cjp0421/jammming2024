import styles from "./Track.module.css"

export type TrackProps = {
    isRemoval: boolean,
    track: {
        id: string,
        name: string,
        artist: string,
        album: string,
    }
}

function Track(props: TrackProps) {
    const renderAction = () => {
        return <button className="track-action">{props.isRemoval ? "-" : "+"}</button>
    }

    return (
        <div className={styles.Track}>
            <div className={styles["Track-information"]}>
                <h3>{props.track.name}</h3>

                <p> {props.track.artist} | {props.track.album}</p>
            </div>
            {/* <button class="Track-action"><!-- + or - will go here --></button> */}
            {renderAction()}
        </div>
    );
}

export default Track;