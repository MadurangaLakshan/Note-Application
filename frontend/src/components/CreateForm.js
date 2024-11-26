import notesStore from "../stores/notesStore";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";

export default function CreateForm() {
  const store = notesStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSuccessNotification = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    !store.updateForm._id && (
      <Box
        sx={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "16px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          marginTop: "16px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "16px", textAlign: "center" }}
        >
          Create Note
        </Typography>
        <form onSubmit={(e) => store.createNote(e, showSuccessNotification)}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            value={store.createForm.title}
            onChange={store.updateCreateFormField}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            name="body"
            label="Body"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={store.createForm.body}
            onChange={store.updateCreateFormField}
            sx={{ marginBottom: "16px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{ padding: "10px", fontWeight: "bold" }}
          >
            Create
          </Button>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    )
  );
}
