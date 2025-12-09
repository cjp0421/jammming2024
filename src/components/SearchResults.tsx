import { Box, Card, CardContent, Typography } from "@mui/material";
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
        <Card
            elevation={8}
            sx={{
                bgcolor: '#431448',
                color: '#fff',
                borderRadius: 2,
                border: "1px solid rgba(0,0,0,0.15)",
                boxShadow: "0px 6px 18px rgba(0,0,0,0.20)",
            }}
        >
            <CardContent>
                <Typography
                    variant='h2'
                    sx={{
                        fontSize: '2rem',
                        mb: 3,
                        textAlign: 'center'
                    }}
                >
                    Search Results
                </Typography>
                {
                    content
                }
            </CardContent>
        </Card >
    );
}

export default SearchResults;