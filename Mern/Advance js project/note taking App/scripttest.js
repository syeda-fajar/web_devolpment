let btn = document.querySelector('.btn')
const main = document.querySelector('.main')
btn.addEventListener('click', () => {
    addnote()
})


const savenote = () => {
    console.log("chalgya ha ")
    const notes = document.querySelectorAll('textarea')
    const data = []
    notes.forEach((notes) => {
        data.push(notes.value)
    })
    console.log(data)
    
    localStorage.setItem('notes',JSON.stringify(data))
}
const addnote = (text="") => {
    const note = document.createElement('div')
    note.classList.add("note")
    note.innerHTML = ` <div class="tool">
                <i class="save fas fa-save"></i>
                <i class="trash fas fa-trash"></i>
            </div>
            <textarea >${text}</textarea>`

    note.querySelector(".trash").addEventListener('click', () => {
        note.remove()
        savenote()
    })
    note.querySelector(".save").addEventListener('click', () => {
        savenote()
    })
    main.appendChild(note)
    savenote()

}
( 
    function(){
    const lsnotes = JSON.parse(localStorage.getItem('notes'))
    lsnotes.forEach(
        (lsnotes)=>{
            addnote(lsnotes)
        }
    )
 })()