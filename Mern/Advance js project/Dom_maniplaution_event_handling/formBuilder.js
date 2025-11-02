const formBuilder = document.querySelector('.form-builder');
const formPreview = document.querySelector('.form-preview');
const fieldType=  [
    { type: 'text', label: 'Text Input' },
    { type: 'email', label: 'Email' },
    { type: 'textarea', label: 'Textarea' },
    { type: 'select', label: 'Dropdown' }
 ];

 // form builder 
fieldType.forEach(field=>{
  const button= document.createElement('button');
  button.textContent=`Add ${field.label}`;
  button.addEventListener('click',()=>addfeild(field.type))
  formBuilder.appendChild(button)
})

function addfeild(type){
  const fieldid= 'field' +Date.now()
  const feildDiv= document.createElement('div')
  feildDiv.className='form-feild'
  let fieldHTML = `<label for = "${fieldid}">Feild Label </label>`
  switch(type){
        case 'text':
        case 'email':
            fieldHTML += `<input type="${type}" id="${fieldid}" name="${fieldid}">`;
            break;
        case 'textarea':
            fieldHTML += `<textarea id="${fieldid}" name="${fieldid}"></textarea>`;
            break;
        case 'select':
            fieldHTML += `<select id="${fieldid}" name="${fieldid}">
                <option>Option 1</option>
                <option>Option 2</option>
            </select>`;
            break;

}
fieldHTML += `<button class="remove-field">Remove</button>`;

feildDiv.innerHTML = fieldHTML;
formPreview.appendChild(feildDiv)
}
 // Remove field functionality
 formPreview.addEventListener('click', function(event) {
 if (event.target.classList.contains('remove-field')) {
 event.target.parentElement.remove();
 }
 })