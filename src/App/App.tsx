import styles from './App.module.css'

function App() {

  return (
    <div className={styles.App}>
      <header className='header'>
        <div className='row'>
          <div className='col-6'>

            <h1> Ja<span className={styles.highlight}>mmm</span>ing</h1>
          </div>
          <div className='col-6 text-end'>
            <div className={styles["header-links"]}>
              <a
                className={styles["header-link"]}
                target="_blank"
                referrerPolicy="no-referrer"
                href='https://github.com/cjp0421/jammming2024'>
                Github</a>
              <a
                className={styles["header-link"]}
                href='#'>Portfolio</a>
              <a
                className={styles["header-link"]}
                target="_blank" referrerPolicy="no-referrer" href='https://www.linkedin.com/in/carol-joy-pedersen'>LinkedIn</a>
            </div>

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
