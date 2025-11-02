const searchInput = document.getElementById('searchInput');
 const searchResults = document.getElementById('searchResults');
 // Sample data
 const items = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
    'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'
 ];

 const debouncedsearch = debounce(function(query){
     performSearch(query)
 },1000)

 searchInput.addEventListener('input',function(){
    const query = this.value.trim();
    if(query.length>0)
       debouncedsearch(query)
    // else
    //    clearResult();
 })

 
 function performSearch(query){
    searchResults.innerHTML= '<div class="loading">Searching...</div>'

    setTimeout(() => {
        const filterItems = items.filter(item=>
            item.toLowerCase().includes(query.toLowerCase())
         );
          displayResults(filterItems)
        
    }, 500);
 }

function  displayResults(result){
      if (result.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
        return;}
        const resultHTML = result.map(item=>`<div class="result-item">${item}</div>`).join('');
        searchResults.innerHTML=resultHTML;
    
}

 function clearResults() {
    searchResults.innerHTML = ''}













  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}