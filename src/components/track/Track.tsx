import styles from "./Track.module.css"

// export type TrackProps = {
//     isRemoval: boolean,
//     track: {
//         id: string,
//         name: string,
//         artist: string,
//         album: string,
//     }
// }

function Track(props) {
    const passTrack = () => {
        props.onAdd(props.track)
    }

    const passTrackTrackToRemove = (props) => {
        console.log(`Track to remove ${props.track.id}`)
    }

    const renderAction = () => {
        if (props.isRemoval) {
            return <button className={"Track-action"} onClick={passTrack}>+</button>
        } else {
            return <button className={"track-action"} onClick={passTrackTrackToRemove}>-</button>
        }

    }



    return (
        <div className={styles.Track}>
            <div className={styles["Track-information"]}>
                <h3>{props.track.name}</h3>

                <p> {props.track.artist} | {props.track.album}</p>
            </div>

            {renderAction()}
        </div>
    );
}

export default Track;