import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch, Route } from 'wouter'
import './App.scss'
import { Header } from './components/Header'
import { UniverseView } from './views/UniverseView/UniverseView'
import { CompanyView } from './views/CompanyView/CompanyView'
import { ComparisionView } from './views/ComparisionView/ComparisionView'
import { UserPanelView } from './views/UserPanelView/UserPanelView'
import { CompanyPanelView } from './views/CompanyPanelView/CompanyPanelView'
import { UserDetailView } from './views/UserPanelView/UserDetailView'
import { FilterContextProvider } from './context/filterContext'
import { Amplify } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
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

const App = ({ signOut, user }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header classes={classes} signOut={signOut}/>
        <FilterContextProvider>
          <Switch>
            <Route path="/" component={UniverseView} />
            <Route path="/company-report/:companyId?" component={CompanyView} />
            <Route path="/comparision-versus/:companyId?" component={ComparisionView} />
            <Route exact path="/admin/users" component={UserPanelView} />
            <Route exact path="/admin/companies" component={CompanyPanelView} />
            <Route exact path="/admin/users/:email" component={UserDetailView} />
          </Switch>
        </FilterContextProvider>
    </div>
  )
}

export default withAuthenticator(App, { loginMechanisms: ['email', 'google'] })
