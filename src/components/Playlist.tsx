import Tracklist, { Track } from "./Tracklist";

function Playlist(props: { isRemoval: boolean; playlistName: string; onSave: () => void; onNameChange: (name: string) => void; onAdd: (track: Track) => void; playlistTracks: Track[]; onRemove: (track: Track) => void; onArtistClick: (artistId: string) => void; isArtistClickable: boolean }) {

    const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        props.onNameChange(target.value)
    }

    return (
        <div>
            <input defaultValue={"New Playlist"} onChange={handleNameChange} />
            <Tracklist userSearchResults={props.playlistTracks} isRemoval={props.isRemoval} onAdd={props.onAdd} onRemove={props.onRemove} onArtistClick={props.onArtistClick} isArtistClickable={false} />
            <button onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;