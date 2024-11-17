import React from 'react'
import { useEffect } from "react";
import notesStore from "../stores/notesStore";
import Notes from '../components/Notes';
import UpdateForm from '../components/UpdateForm'
import CreateForm from '../components/CreateForm'

const NotesPage = () => {

    const store = notesStore()

    useEffect(() => {
        store.fetchNotes()
    }, [])

    return (
        <div>
            <Notes />
            <UpdateForm />
            <CreateForm />
        </div>
    )
}

export default NotesPage