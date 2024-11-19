import { Box } from "@mui/material";
import Tracklist, { Track } from "../tracklist/Tracklist";
import styles from "./SearchResults.module.css"
import AlbumList, { Album } from "../albumlist/AlbumList";
import ArtistList, { Artist } from "../artistlist/ArtistList";

function SearchResults({ userSearchResults, onAdd, onRemove, onAlbumClick, searchType, onArtistClick }: {
    userSearchResults: Track[] | Album[] | Artist[],
    isRemoval: boolean,
    onAdd: (track: Track) => void,
    onRemove: (track: Track) => void;
    onAlbumClick: (albumId: string) => void
    onArtistClick: (artistId: string) => void
    searchType: "track" | "album" | "artist";
    isArtistClickable: boolean;
}) {

    let content;

    switch (searchType) {
        case 'track':
            content = (
                <Tracklist
                    userSearchResults={userSearchResults as Track[]}
                    isRemoval={true}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onArtistClick={onArtistClick}
                    isArtistClickable={true}
                />
            );
            break;
        case 'album':
            content = (
                <AlbumList
                    albums={userSearchResults as Album[]}
                    onAlbumClick={onAlbumClick}
                    onArtistClick={onArtistClick}
                    isArtistClickable={false}
                />
            );
            break;
        case 'artist':
            content = (
                <ArtistList
                    artists={userSearchResults as Artist[]}
                    onArtistClick={onArtistClick}
                />
            );
            break;
        default:
            content = <Box>'Something went wrong!'</Box>
            break;
    }

    return (
        <Box className={styles.SearchResults}>
            <h2 style={{ borderBottom: '1px solid', fontFamily: 'sans-serif' }}>
                Search Results
            </h2>
            {
                content
            }
        </Box>
    );
}

export default SearchResults;