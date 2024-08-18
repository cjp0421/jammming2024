import styles from "./Track.module.css"

type TrackProps = {
    isRemoval: boolean,
}

function Track(props: TrackProps) {
    const renderAction = () => {
        return <button className="track-action">{props.isRemoval ? "-" : "+"}</button>
    }

    return (
        <div className={styles.Track}>
            <div className={styles["Track-information"]}>
                {/* <h3><!-- track name will go here --></h3> */}

                {/* <p><!-- track artist will go here--> | <!-- track album will go here --></p> */}
            </div>
            {/* <button class="Track-action"><!-- + or - will go here --></button> */}
            {renderAction()}
        </div>
    );
}

export default Track;