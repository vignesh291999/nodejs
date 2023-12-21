
const weatheForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#one')
const p2 = document.querySelector('#two')


weatheForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const enteredLocation = search.value


    fetch(`http://localhost:3000/weather?address=${enteredLocation}`).then((res) => res.json()).then(({ forecast, address }) => {
        p1.textContent = forecast;
        p2.textContent = address;
    })

})
