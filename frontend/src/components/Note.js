import notesStore from "../stores/notesStore";

export default function Note({ note }) {
    const store = notesStore()

    return (<div >
        <h3>{note.title}</h3>
        <button onClick={() => store.deleteNote(note._id)}>Delete Note</button>
        <button onClick={() => store.toggleUpdate(note)}>Update Note</button>
    </div>);
}
