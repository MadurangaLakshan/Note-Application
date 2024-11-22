import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import SignUpPage from "../pages/SignUpPage";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import RequireAuth from "./RequireAuth";
import LogoutPage from "../pages/LogoutPage";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Note Application
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Sign Up
            </Button>
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route index element={<RequireAuth><NotesPage /></RequireAuth>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
