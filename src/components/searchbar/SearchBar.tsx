import styles from "./Searchbar.module.css"
import { useState } from "react"

function SearchBar() {
    const [term, setTerm] = useState("")

    const handleTermChange = ({ target }) => {
        setTerm(target.value)
    }

    return (
        <div className={styles.SearchBar}>
            {/* <div className='search'>
                <input type='text' />
                <br />
                <button className='button'>Search by Title</button>
            </div> */}



            <input
                placeholder="Enter A Song, Album, or Artist"
                onChange={handleTermChange}
            />

            <button className={styles.SearchButton}>
                SEARCH
            </button>

        </div>
    );
}

export default SearchBar;