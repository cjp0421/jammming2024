import styles from './App.module.css'

function App() {

  return (
    <div className={styles.App}>
      <header className='header'>
        <div className='row'>
          <h1 className='col-5'> Ja<span className={styles.highlight}>mmm</span>ing</h1>
          <div className='col-7 text-end'>
            <a target="_blank" referrerPolicy="no-referrer"
              href='https://github.com/cjp0421/jammming2024'>
              Github</a><a href='#'>Portfolio</a><a target="_blank" referrerPolicy="no-referrer" href='https://www.linkedin.com/in/carol-joy-pedersen'>LinkedIn</a>
          </div>
        </div>
      </header>

      <div className={styles['App-playlist']}></div>

      <footer>
        <div className='row'>
          <div className='col-6'>
            <a target="_blank" referrerPolicy="no-referrer" href='https://github.com/cjp0421/jammming2024/blob/main/README.md'>About</a>
          </div>
        </div>

      </footer>
    </div>
  )
}

export default App
