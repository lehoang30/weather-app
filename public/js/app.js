


const weatherForm = document.querySelector('#search')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const message= document.querySelector('#message-2')



// messageOne.textContent = 'From Java'



weatherForm.addEventListener('click', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading.................'
    messageTwo.textContent = ''
    const location = search.value
fetch('http://localhost:3000/weather?address=' + location).then(( response) => {
   

    response.json().then((data) => {
        if(data.error){
            messageOne.textContent =  data.error
         }else{
            messageTwo.textContent = 'You search for ' + location
            messageOne.textContent = JSON.stringify(data.forecast)
    }

})
})


})