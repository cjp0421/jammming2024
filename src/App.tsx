import './App.css'

function App() {


  return (
    <>
      <header>
        <div className='header'><a href='#'>Github</a>|<a href='#'>Portfolio</a>|<a href='#'>LinkedIn</a></div>
        <h1>Jammming</h1>
      </header>

      <main className='container'>
        <div className='col'>

          <div className='search'>
            <input type='text' />
            <br />
            <button className='button'>Search by Title</button>
          </div>

        </div>
        <div className='col-6'>
          <div className='searchResults'>
            <h2>Search Results</h2>
            <div className='trackList'>
              track list

              <div className='track'><p>Track Title and Information</p></div>
            </div>


          </div>
        </div>


        <div className='col-6'>
          <div className='playList'>
            <h2>Playlist</h2>
            - playlist name text box / display
            - tracklist
            - track
          </div>
        </div>








      </main>

      <footer>
        <div className='footer'>
          This will go to GitHub ReadMe
          <a href='#'>About</a>
        </div>
      </footer>
    </>
  )
}

export default App
