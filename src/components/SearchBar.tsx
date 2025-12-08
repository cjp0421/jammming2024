import { Box, Button } from "@mui/material"
import { useState } from "react"

function SearchBar({ onSearch }: { onSearch: (term: string, seachType: "track" | "artist" | "album") => void }) {
    const [term, setTerm] = useState("")
    const [searchType, setSearchType] = useState<"track" | "artist" | "album">("track");

    const handleTermChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(target.value)
        console.log(term)
    }

    const passTerm = () => {
        onSearch(term, searchType)
        console.log("passing search type", searchType)
    }

    const selectSearchType = (type: "track" | "artist" | "album") => {
        setSearchType(type);
        console.log("selected search type", type)
    }

    return (
        <Box>
            <Box>
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    onChange={handleTermChange}
                />
                <Box>
                    <Button
                        onClick={() => selectSearchType("track")}
                    >
                        Track
                    </Button>
                    <Button
                        onClick={() => selectSearchType("artist")}
                    >
                        Artist
                    </Button>
                    <Button
                        onClick={() => selectSearchType("album")}
                    >
                        Album
                    </Button>
                </Box>

            </Box>
            <Button
                onClick={passTerm}
            >
                SEARCH
            </Button>

        </Box>
    );
}

export default SearchBar;