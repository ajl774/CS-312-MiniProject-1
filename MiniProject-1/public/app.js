const myForm = document.getElementById('blogForm');
const openButton = document.getElementById('createPostBtn');
const exitButton = document.getElementById('closeFormBtn');
const submitButton = document.getElementById('submitBtn');
const exitEditButton = document.getElementById("exitEdBtn");

openButton.addEventListener('click', () =>{
    myForm.style.display = 'block';
    openButton.style.display = 'none';

});

exitButton.addEventListener('click', () =>{
    myForm.style.display = 'none';
    openButton.style.display = 'block';
    
});

exitEditButton.addEventListener('click', () => {
    
    window.history.back();
});

myForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    myForm.style.display = 'none';
    openButton.style.display = 'block';
});


