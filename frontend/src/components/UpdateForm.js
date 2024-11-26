import { useEffect, useState } from "react";
import notesStore from "../stores/notesStore";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

export default function UpdateForm() {
  const store = notesStore();

  const [staticTitle, setStaticTitle] = useState(store.updateForm.title);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (store.updateForm._id) {
      setStaticTitle(store.updateForm.title);
    }
  }, [store.updateForm._id]);

  const handleCancel = notesStore((state) => state.resetUpdateForm);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSuccessNotification = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await store.updateNote(e, showSuccessNotification);
  };

  return (
    store.updateForm._id && (
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
          Update Note : <Typography variant="h6">{staticTitle}</Typography>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
            value={store.updateForm.title}
            onChange={store.updateUpdateFormField}
            sx={{ marginBottom: "16px" }}
          />
          <TextField
            name="body"
            label="Body"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={store.updateForm.body}
            onChange={store.updateUpdateFormField}
            sx={{ marginBottom: "16px" }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: "10px",
              fontWeight: "bold",
              backgroundColor: "#ffb300",
            }}
          >
            Update
          </Button>
        </form>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ padding: "10px", fontWeight: "bold", marginTop: "8px" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
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
