import styles from "./Searchbar.module.css"

function SearchBar() {
    return (
        <div className={styles.SearchBar}>
            <div className='search'>
                <input type='text' />
                <br />
                <button className='button'>Search by Title</button>
            </div>

            <input
                placeholder="Enter A Song, Album, or Artist"
            />

            <button className={styles.SearchButton} >
                SEARCH
            </button>

        </div>
    );
}

export default SearchBar;