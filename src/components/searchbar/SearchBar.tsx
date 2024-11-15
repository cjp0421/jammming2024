import { Box, Button } from "@mui/material"
import styles from "./Searchbar.module.css"
import { useState } from "react"

function SearchBar({ onSearch }: { onSearch: (term: string, seachType: string) => void }) {
    const [term, setTerm] = useState("")
    const [searchType, setSearchType] = useState("track");

    const handleTermChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(target.value)
        console.log(term)
    }

    const passTerm = () => {
        onSearch(term, searchType)
        console.log("passing search type", searchType)
    }

    const selectSearchType = (type: string) => {
        setSearchType(type);
        console.log("selected search type", type)
    }

    return (
        <Box className={styles.SearchBar}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}>
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    onChange={handleTermChange}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginTop: '-40px',
                        marginBottom: '10px',
                    }}
                >
                    <Button
                        className={styles.TypeButton}
                        onClick={() => selectSearchType("track")}
                        sx={{
                            backgroundColor: searchType === "track" ? 'rgba(108, 65, 233, .7)' : '#010c3f',
                            color: '#fff',
                            borderRadius: '20px'
                        }}
                    >
                        Track
                    </Button>
                    <Button
                        className={styles.TypeButton}
                        onClick={() => selectSearchType("artist")}
                        sx={{
                            backgroundColor: searchType === "artist" ? 'rgba(108, 65, 233, .7)' : '#010c3f',
                            color: '#fff',
                            padding: '12px',
                            borderRadius: '20px'
                        }}
                    >
                        Artist
                    </Button>
                    <Button
                        className={styles.TypeButton}
                        onClick={() => selectSearchType("album")}
                        sx={{
                            backgroundColor: searchType === "album" ? 'rgba(108, 65, 233, .7)' : '#010c3f',
                            color: '#fff',
                            padding: '12px',
                            borderRadius: '20px'
                        }}
                    >
                        Album
                    </Button>
                </Box>

            </Box>
            <Button className={styles.SearchButton} onClick={passTerm}
                sx={{
                    backgroundColor: '#010c3f',
                    color: '#fff',
                }}
            >
                SEARCH
            </Button>

        </Box>
    );
}

export default SearchBar;