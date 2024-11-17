import notesStore from "../stores/notesStore"

export default function UpdateForm() {

    const store = notesStore()

    return (store.updateForm._id && <div>
        <h2>
            Update Note
            <form onSubmit={store.updateNote}>
                <input name="title" value={store.updateForm.title} onChange={store.updateUpdateFormField} />
                <textarea name="body" value={store.updateForm.body} onChange={store.updateUpdateFormField} />
                <button type="submit" >Update</button>
            </form>
        </h2>
    </div>)
}