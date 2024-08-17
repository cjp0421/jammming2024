
import './App.module.css'

function App() {


  return (
    <div className="App">
      <header>
        <div className='header'><a target="_blank" referrerPolicy="no-referrer" href='https://github.com/cjp0421/jammming2024'>Github</a>|<a href='#'>Portfolio</a>|<a target="_blank" referrerPolicy="no-referrer" href='https://www.linkedin.com/in/carol-joy-pedersen'>LinkedIn</a></div>
        <h1> Ja<span className="highlight">mmm</span>ing</h1>
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
          <a target="_blank" referrerPolicy="no-referrer" href='https://github.com/cjp0421/jammming2024/blob/main/README.md'>About</a>
        </div>
      </footer>
    </div>
  )
}

export default App
