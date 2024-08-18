function SearchBar() {
    return (
        <div className="SearchBar">
            <div className='search'>
                <input type='text' />
                <br />
                <button className='button'>Search by Title</button>
            </div>

            <input
                placeholder="Enter A Song, Album, or Artist"
            />

            <button className="SearchButton" >
                SEARCH
            </button>

        </div>
    );
}

export default SearchBar;