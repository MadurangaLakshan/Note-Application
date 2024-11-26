import LoginPage from "../pages/LoginPage";
import NotesPage from "../pages/NotesPage";
import SignUpPage from "../pages/SignUpPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import LogoutPage from "../pages/LogoutPage";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import authStore from "../stores/authStore";

function App() {
  const store = authStore();

  return (
    <div className="App">
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontFamily: '"Roboto", "Arial", sans-serif',
                fontWeight: "bold",
                fontSize: "1.5rem",
                letterSpacing: "0.5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span role="img" aria-label="notebook">
                📝
              </span>
              Notify
            </Typography>

            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {!store.loggedIn && (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            )}
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            index
            element={
              <RequireAuth>
                <NotesPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
