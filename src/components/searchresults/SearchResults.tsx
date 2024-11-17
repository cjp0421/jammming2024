import { Box } from "@mui/material";
import Tracklist, { Track } from "../tracklist/Tracklist";
import styles from "./SearchResults.module.css"
import AlbumList, { Album } from "../albumlist/AlbumList";

function SearchResults({ userSearchResults, onAdd, onRemove, onAlbumClick, searchType }: {
    userSearchResults: Track[] | Album[],
    isRemoval: boolean,
    onAdd: (track: Track) => void,
    onRemove: (track: Track) => void;
    onAlbumClick: (albumId: string) => void
    searchType: "track" | "album" | "artist";
}) {
    return (
        <Box className={styles.SearchResults}>
            <h2 style={{ borderBottom: '1px solid', fontFamily: 'sans-serif' }}>
                Search Results
            </h2>
            {
                searchType === 'track' ? (
                    <Tracklist userSearchResults={userSearchResults as Track[]} isRemoval={true} onAdd={onAdd} onRemove={onRemove} />

                ) : <AlbumList
                    albums={userSearchResults as Album[]}
                    onAlbumClick={onAlbumClick} />
            }
        </Box>
    );
}

export default SearchResults;