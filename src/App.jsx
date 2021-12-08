import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Header } from './components/Header'
import { UniverseView } from './views/UniverseView/UniverseView'
import './App.scss'

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
        <UniverseView />
    </div>
  )
}

export default App
