import Tracklist, { Track } from "../tracklist/Tracklist";
import styles from "./SearchResults.module.css"

function SearchResults(props: { userSearchResults: Track[], isRemoval: boolean, onAdd: (track: Track) => void, onRemove: (track: Track) => void; }) {
    return (
        <div className={styles.SearchResults}>
            <h2 style={{ borderBottom: '1px solid', fontFamily: 'sans-serif' }}>Search Results</h2>
            <Tracklist userSearchResults={props.userSearchResults} isRemoval={true} onAdd={props.onAdd} onRemove={props.onRemove} />
        </div>
    );
}

export default SearchResults;