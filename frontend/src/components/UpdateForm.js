import notesStore from "../stores/notesStore";
import { Box, TextField, Button, Typography } from "@mui/material";

export default function UpdateForm() {
    const store = notesStore();

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
                }}
            >
                <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center" }}>
                    Update Note
                </Typography>
                <form onSubmit={store.updateNote}>
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
                        sx={{ padding: "10px", fontWeight: "bold",backgroundColor: "#ffb300",}}
                    >
                        Update
                    </Button>
                </form>
            </Box>
        )
    );
}
