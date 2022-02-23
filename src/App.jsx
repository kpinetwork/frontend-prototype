import React from 'react'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch, Route } from 'wouter'
import { Header } from './components/Header'
import { UniverseView } from './views/UniverseView/UniverseView'
import { CompanyView } from './views/CompanyView/CompanyView'
import { UserPanelView } from './views/UserPanelView/UserPanelView'
import { CompanyPanelView } from './views/CompanyPanelView/CompanyPanelView'
import { UserDetailView } from './views/UserPanelView/UserDetailView'
import { FilterContextProvider } from './context/filterContext'
import '@aws-amplify/ui-react/styles.css'
import './App.scss'
import { updatedAwsConfig } from './awsConfig'
import awsExports from './aws-exports'

const { VITE_ENV: env } = import.meta.env
env === 'prod' ? Amplify.configure(awsExports) : Amplify.configure(updatedAwsConfig)

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

function AppRoutes ({ signOut }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Header classes={classes} signOut={signOut}/>
        <FilterContextProvider>
          <Switch>
            <Route path="/" component={UniverseView} />
            <Route path="/company-report/:companyId?" component={CompanyView} />
            <Route exact path="/admin/users" component={UserPanelView} />
            <Route exact path="/admin/companies" component={CompanyPanelView} />
            <Route exact path="/admin/users/:email" component={UserDetailView} />
          </Switch>
        </FilterContextProvider>
    </div>
  )
}

function App () {
  return (
    <Authenticator socialProviders={[]} variation="modal">
      {({ signOut }) => {
        return (
          <AppRoutes
            signOut={signOut}
          />
        )
      }}
    </Authenticator>
  )
}

export default App
