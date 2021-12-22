import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch, Route } from 'wouter'
import './App.scss'
import { Header } from './components/Header'
import { UniverseView } from './views/UniverseView/UniverseView'
import { CompanyView } from './views/CompanyView/CompanyView'
import { ComparisionView } from './views/ComparisionView/ComparisionView'
import { FilterContextProvider } from './context/filterContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const App = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header classes={classes} />
        <FilterContextProvider>
          <Switch>
            <Route path="/" component={UniverseView} />
            <Route path="/company-report/:companyId?" component={CompanyView} />
            <Route path="/comparision-versus/:companyId?" component={ComparisionView} />
          </Switch>
        </FilterContextProvider>
    </div>
  )
}

export default App
