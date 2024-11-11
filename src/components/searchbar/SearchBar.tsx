import { Box } from "@mui/material"
import styles from "./Searchbar.module.css"
import { useState } from "react"

function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
    const [term, setTerm] = useState("")

    const handleTermChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(target.value)
    }

    const passTerm = () => {
        onSearch(term)
    }

    return (
        <Box className={styles.SearchBar}>
            <input
                placeholder="Enter A Song, Album, or Artist"
                onChange={handleTermChange}
            />

            <button className={styles.SearchButton} onClick={passTerm}>
                SEARCH
            </button>

        </Box>
    );
}

export default SearchBar;