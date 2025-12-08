import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"

function SearchBar({ onSearch }: { onSearch: (term: string, seachType: "track" | "artist" | "album") => void }) {
    const [term, setTerm] = useState("")
    const [searchType, setSearchType] = useState<"track" | "artist" | "album">("track");

    const handleTermChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = target.value;
        setTerm(newValue);
    };

    const passTerm = () => {
        onSearch(term, searchType)
    }

    const selectSearchType = (type: "track" | "artist" | "album") => {
        setSearchType(type);
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 1
                }}
            >
                <TextField
                    placeholder="Enter A Song, Album, or Artist"
                    value={term}
                    onChange={handleTermChange}
                    color='secondary'
                    sx={{
                        backgroundColor: '#fff',
                        width: { 'md': '320px', 'xs': '245px' }
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 1
                    }}
                >
                    <Button
                        onClick={() => selectSearchType('track')}
                        variant='contained'
                        sx={{
                            borderRadius: 2,
                            backgroundColor: searchType === 'track' ? '#9f21a3' : '#1e131c',
                            color: '#fff'
                        }}
                    >
                        Track
                    </Button>
                    <Button
                        onClick={() => selectSearchType("artist")}
                        variant='contained'
                        sx={{
                            borderRadius: 2,
                            backgroundColor: searchType === "artist" ? '#9f21a3' : '#1e131c',
                            color: '#fff'
                        }}
                    >
                        Artist
                    </Button>
                    <Button
                        onClick={() => selectSearchType("album")}
                        variant='contained'
                        sx={{
                            borderRadius: 2,
                            backgroundColor: searchType === "album" ? '#9f21a3' : '#1e131c',
                            color: '#fff'
                        }}
                    >
                        Album
                    </Button>
                </Box>

                <Button
                    onClick={passTerm}
                    sx={{
                        borderRadius: 2,
                        backgroundColor: '#1e131c',
                        color: '#fff'
                    }}
                >
                    SEARCH
                </Button>
            </Box>

        </Box >
    );
}

export default SearchBar;