import { Box, Button } from "@mui/material"
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
            <Box>
                <Button sx={{ color: 'white', fontWeight: '900', backgroundColor: 'blue' }}>a</Button>
                <Button sx={{ color: 'white', fontWeight: '900', backgroundColor: 'blue' }}>b</Button>
                <Button sx={{ color: 'white', fontWeight: '900', backgroundColor: 'blue' }}>c</Button>
                <Button sx={{ color: 'white', fontWeight: '900', backgroundColor: 'blue' }}>d</Button>
            </Box>
        </Box>
    );
}

export default SearchBar;