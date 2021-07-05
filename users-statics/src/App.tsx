import './App.scss';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core';
import { HomeOutlined } from '@material-ui/icons';
import { UserInfo } from './components/UserInfo/UserInfo';
import { UserList } from './components/UserList/UserList';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton>
              <HomeOutlined />
            </IconButton>
          </Link>
          <Typography variant="h6">
            User management system
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Route path="/user/:id">
          <UserInfo />
        </Route>
        <Route path="/">
          <UserList />
        </Route>
      </Container>
    </Router>
  );
}

export default App;
