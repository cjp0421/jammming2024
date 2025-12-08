import { Box } from "@mui/material";
import Tracklist, { Track } from "./Tracklist";
import AlbumList, { Album } from "./AlbumList";
import ArtistList, { Artist } from "./ArtistList";

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
        <Box>
            <h2 >
                Search Results
            </h2>
            {
                content
            }
        </Box>
    );
}

export default SearchResults;