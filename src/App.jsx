import React, { useContext } from 'react'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import { makeStyles } from '@material-ui/core/styles'
import { Switch, Route, Redirect } from 'wouter'
import { Header } from './components/Header'
import { UniverseView } from './views/UniverseView/UniverseView'
import { CompanyView } from './views/CompanyView/CompanyView'
import { UserPanelView } from './views/UserPanelView/UserPanelView'
import { CompanyPanelView } from './views/CompanyPanelView/CompanyPanelView'
import { UploadFileView } from './views/UploadFileView/UploadFileView'
import { UserDetailView } from './views/UserPanelView/UserDetailView'
import { ErrorView } from './views/DefaultView/ErrorView'
import LoadingProgress from './components/Progress'
import Context, { AppContextProvider } from './context/appContext'
import CustomSignUpComponents from './components/CustomSignUpComponent'
import '@aws-amplify/ui-react/styles.css'
import './App.scss'
import { updatedAwsConfig } from './awsConfig'
import awsExports from './aws-exports'

const { VITE_ENV: env } = import.meta.env
env === 'prod'
  ? Amplify.configure(awsExports)
  : Amplify.configure(updatedAwsConfig)

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  authenticator: {
    height: '100vh'
  }
}))

function AppRoutes ({ signOut }) {
  const classes = useStyles()
  const { isAdmin, isRoleLoading, user } = useContext(Context)
  const renderIfAdmin = (Component, props) => {
    if (isRoleLoading) {
      return <LoadingProgress />
    }
    if (!isRoleLoading && !isAdmin) {
      return <Redirect to="/forbidden" />
    }
    return <Component {...props} />
  }

  return (
    <div className={classes.root}>
      <Header classes={classes} signOut={signOut} />
      <Switch>
        <Route path="/" component={UniverseView} />
        <Route path="/company-report/:companyId?" component={CompanyView} />
        <Route
          exact
          path="/admin/users"
          component={(props) => renderIfAdmin(UserPanelView, props)}
        />
        <Route
          exact
          path="/admin/companies"
          component={(props) => renderIfAdmin(CompanyPanelView, props)}
        />
        <Route
          exact
          path="/admin/import_data"
          component={(props) => renderIfAdmin(UploadFileView, props)}
        />
        <Route
          exact
          path="/admin/users/detail/"
          component={(props) =>
            renderIfAdmin(UserDetailView, {
              ...props,
              email: user.selectedEmail
            })
          }
        />
        <Route
          exact
          path="/forbidden"
          component={(props) => (
            <ErrorView {...props} message={'Forbidden'} code={'403'} />
          )}
        />
        <Route
          component={(props) => (
            <ErrorView {...props} message={'Not Found'} code={'404'} />
          )}
        />
      </Switch>
    </div>
  )
}

function App () {
  const classes = useStyles()
  const formFields = {
    confirmResetPassword: {
      confirmation_code: {
        labelHidden: false,
        isRequired: true,
        label: 'Code:'
      },
      password: {
        labelHidden: false,
        isRequired: true,
        label: 'Password:'
      }
    }
  }
  return (
    <Authenticator
      className={classes.authenticator}
      socialProviders={[]}
      formFields={formFields}
      components={CustomSignUpComponents()}
    >
      {({ signOut }) => {
        return (
          <AppContextProvider>
            <AppRoutes signOut={signOut} />
          </AppContextProvider>
        )
      }}
    </Authenticator>
  )
}

export default App
