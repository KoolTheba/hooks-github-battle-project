import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { ThemeProvider } from './contexts/theme'

import Loading from './Components/Loading'
import Nav from './Components/Nav'
import './index.css'

const Popular = React.lazy(() => import('./Components/Popular'))
const Battle = React.lazy(() => import('./Components/Battle'))
const Result = React.lazy(() => import('./Components/Results'))

const App = () => {
  const [theme, setTheme] = React.useState('light')

  const toggleTheme = () => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark': 'light'
    })
  }

  const value = React.useMemo(() => ({
    theme,
    toggleTheme
  }), [theme])

  return (
    <Router>
      <ThemeProvider value={value}>
        <div className={theme}>
          <div className='container'>
            <Nav />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path={'/'} component={Popular} />
                <Route exact path={'/battle'} component={Battle} />
                <Route path={'/battle/results'} component={Result} />
                <Route render={() => <h1>404</h1>}/>
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
