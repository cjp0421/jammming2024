import Tracklist from "../tracklist/Tracklist";
import styles from "./SearchResults.module.css"

function SearchResults(props) {
    return (
        <div className={styles.SearchResults}>
            <Tracklist userSearchResults={props.userSearchResults} isRemoval={true} onAdd={props.onAdd} />
        </div>
    );
}

export default SearchResults;