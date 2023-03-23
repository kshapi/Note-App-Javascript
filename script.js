const addBtn = document.querySelector('.newNote');
const list = document.querySelector('.add');
const input = document.querySelector('.write input');
const textArea = document.querySelector('.write textarea');
const notes = document.querySelector('.notes');
const tap = document.querySelector('.del')

//
let addConut = 0;

addBtn.addEventListener('click', function () {
  list.parentNode.style.display = 'block';
  notes.style.display = 'none';
  //this is addBtn
  this.style.display = 'none';
  tap.innerText = 'Start typing';
});

list.addEventListener('click', function() {
  //input and textarea s values 
  const text = textArea.value;
  const head = input.value;
  
  //if input have some value then go 
  if (textArea.value || input.value) {
    this.parentNode.style.display = 'none';
    notes.style.display = 'grid';
    addBtn.style.display = 'flex';
    tap.innerText = 'Double tap to Delete';
    
    //set note in DOM 
    const note = document.createElement('div');
    note.className = 'note';
    note.setAttribute('data-index',addConut);
    note.innerHTML = `
      <h2>${head}</h2>
      <p>${text}</p>`;
    
    document.querySelector('.notes').prepend(note);
    
    
    //bdl click to delete note
    note.addEventListener('dblclick',function () {
      removeNote(this)
    });
    
    //set note in localStorage 
    localStorage.setItem(addConut,JSON.stringify({head: head, body: text}));
    //increment counter
    addConut++;
    
    //set input to empty
    input.value = '';
    textArea.value = '';
  };
  
});


//Get notes from local storage
for (let i = 0; i < localStorage.length; i++) {
  const notes = JSON.parse(localStorage.getItem(i));
  
  if (notes) {
     const note = document.createElement('div');
     note.className = 'note';
     note.setAttribute('data-index',i);
     note.innerHTML = `
          <h2>${notes.head}</h2>
          <p>${notes.body}</p>`;
    
     document.querySelector('.notes').append(note);
     
     
     //bdl click to delete note
     note.addEventListener('dblclick', function() {
        removeNote(this)
     });
     addConut++;  
  };
};


//remove notes
function removeNote(element) {
  let headAndBody = [];
  element.remove();
  //get noteObject from localStorage
  for (var i = 0; i < localStorage.length; i++) {
    const noteObject = localStorage.getItem(i);
    //Go if Object have some value
    if (noteObject) {
       if (i == element.dataset.index) {
          continue;
        }else {
          headAndBody.push(localStorage.getItem(i));
       };
       
    };
    
  };
  addConut = headAndBody.length;
  //clear localStorage
  localStorage.clear();
  headAndBody.forEach((obj, index)=> {
    //set notes in localStorage
    localStorage.setItem(index,obj)
  });
  
}


//Fillter Notes
const search = document.querySelector('.search input');


search.addEventListener('input',saerchNote);

function saerchNote (e) {
  let notFound = 0;
  //search value
  const inputValue = e.target.value.toLowerCase();
  //All notes 
  const notes = document.querySelectorAll('.notes .note');
  
  //looping all notes
   for (let i=0;i<notes.length;i++){
     //get note head and text
     const head = notes[i].querySelector('h2').innerText.toLowerCase();
      const text = notes[i].querySelector('p').innerText.toLowerCase();
      
      //chech if search vlaue includes in head or text
      if (head.includes(inputValue)
                   ||
          text.includes(inputValue)) {
          //show the notes wich have search value
         notes[i].style.display = 'block';
      }else {
         //display none of others
         notes[i].style.display = 'none';
         notFound++;
        
      };
      
      //if nothing match then show not Found 
     if (notFound >= notes.length) {
      document.querySelector('.notFound').style.display = 'block';
     }else {
      document.querySelector('.notFound').style.display = 'none';
     };
   
   };
 
}

//Kshapi