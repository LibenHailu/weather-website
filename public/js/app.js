const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                var str = data.forecast
                var array = str.split('#')
                    // ' It is currently #' + body.currently.temperature + '# degrees out. There is a #' + body.currently.precipProbability + '# % chance of rain. #' + body.daily.data[0].summary
                messageTwo.textContent = 'It is currently ' + array[0] + ' degrees out. There is a ' + array[1] + '% chance of rain.'
                messageThree.textContent = array[2]
                if (array[0] >= 30) {
                    messageFour.textContent = 'It is too hot today.'
                    messageFive.textContent = 'Sleeveless shirt,Shirt,Sandal,Skirts are the best clothes to wear for today.'
                } else if (array[0] <= 5) {
                    messageFour.textContent = 'It is too cold today.'
                    messageFive.textContent = 'Glove,Hats,Socks,boot,Jackets are the best clothes to wear for today.'
                } else {
                    messageFour.textContent = 'To day\'s weather is average.'
                }

            }
        })
    })
})