import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import './App.css'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectRouter from './components/ProtectedRouter'
import JobDetails from './components/JobDetails'
import Jobs from './components/Jobs'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectRouter exact path="/" component={Home} />
    <ProtectRouter exact path="/jobs" component={Jobs} />
    <ProtectRouter exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/not-fount" component={NotFound} />
    <Redirect to="not-fount" />
  </Switch>
)

export default App
