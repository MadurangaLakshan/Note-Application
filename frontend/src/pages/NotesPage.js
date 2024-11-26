import React from "react";
import { useEffect } from "react";
import { Container } from "@mui/material";
import notesStore from "../stores/notesStore";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";

const NotesPage = () => {
  const store = notesStore();

  useEffect(() => {
    store.fetchNotes();
  }, []);

  return (
    <Container sx={{ height: "100vh" }}>
      <UpdateForm />
      <CreateForm />
      {!store.updateForm._id && <Notes />}
    </Container>
  );
};

export default NotesPage;
