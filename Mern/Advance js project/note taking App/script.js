let btn = document.querySelector('.btn')
const main = document.querySelector('.main')
btn.addEventListener('click', () => {
    addnote()
})
const savenote = () => {
  
    const notes = document.querySelectorAll('textarea')
    const data = []
    notes.forEach((notes) => {
        data.push(notes.value)
    })
 
    if (data.length==0){
        localStorage.removeItem('notes')
    }
    else{
    localStorage.setItem('notes',JSON.stringify(data))}
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
    if(lsnotes==null){
      addnote()
    }
    else{
    lsnotes.forEach(
        (lsnotes)=>{
            addnote(lsnotes)
        }
    )}
 })()





