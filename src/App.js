import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { ThemeProvider } from './contexts/theme'

import Loading from './components/Loading'
import Nav from './components/Nav'
import './index.css'

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Result = React.lazy(() => import('./components/Results'))

const App = () => {
  const [theme, setTheme] = React.useState('light')

  const toggleTheme = () => setTheme((theme) => theme === 'light' ? 'dark' : 'light')

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className='container'>
            <Nav toggleTheme={toggleTheme} />
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
