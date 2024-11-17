import { create } from 'zustand'
import axios from "axios"

const notesStore = create((set) => ({
    notes: null,

    createForm:
    {
        title: "",
        body: ""
    },

    updateForm:
    {
        _id: null,
        title: "",
        body: ""
    },


    //Fetch Notes
    fetchNotes: async () => {
        const res = await axios.get('/notes')

        set({ notes: res.data.notes })
    },


    //UpdateCreateFormField
    updateCreateFormField: (e) => {
        const { name, value } = e.target

        set((state) => {
            return {
                createForm: {
                    ...state.createForm,
                    [name]: value
                }

            }
        })

    },

    //UpdateUpdateFormField
    updateUpdateFormField: (e) => {
        const { name, value } = e.target

        set((state) => {
            return {
                updateForm: {
                    ...state.updateForm,
                    [name]: value
                }

            }
        })
    },

    //CreateNote
    createNote: async (e) => {
        e.preventDefault()

        const { createForm, notes } = notesStore.getState()

        const res = await axios.post("/notes", createForm)

        set({
            notes: [...notes, res.data.note],
            createForm:
            {
                title: "",
                body: ""
            },
        })
    },

    //UpdateNote
    updateNote: async (e) => {
        e.preventDefault()

        const { updateForm, notes } = notesStore.getState()
        const { title, body, _id } = updateForm

        const res = await axios.put(`/notes/${_id}`, {
            title,
            body
        })

        const newNotes = [...notes];
        const noteIndex = notes.findIndex(note => {
            return note._id === _id;
        })

        newNotes[noteIndex] = res.data.updatedNote;

        set({
            notes: newNotes,
            updateForm: {
                _id: null,
                title: "",
                body: ""
            }
        }
        )
    },

    //DeleteNote
    deleteNote: async (_id) => {
        const res = await axios.delete(`/notes/${_id}`)

        const { notes } = notesStore.getState()

        const newNotes = notes.filter(note => {
            return note._id !== _id;
        })

        set({ notes: newNotes })
    },


    // ToggleUpdate
    toggleUpdate: (note) => {

        const { _id, title, body } = note

        set({
            updateForm: {
                _id: _id,
                title: title,
                body: body,
            }
        }
        )
    }

}));



export default notesStore;