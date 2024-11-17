import notesStore from "../stores/notesStore"

export default function CreateForm() {

    const store = notesStore()

    return (!store.updateForm._id && <div>
        <h2>
            Create Note
            <form onSubmit={store.createNote}>
                <input name="title" value={store.createForm.title} onChange={store.updateCreateFormField} />
                <textarea name="body" value={store.createForm.body} onChange={store.updateCreateFormField} />
                <button type="submit" >Create</button>
            </form>
        </h2>
    </div>)

}