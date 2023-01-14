let API = "https://restcountries.com/v3.1/name/"
let bottomDiv = document.querySelector(".bottom")
const form = document.querySelector('form')
const inputSearch = document.querySelector('.inputSearch')
let messageTxt = document.querySelector('.messageTxt')
let countryName = ''


function getData(resource) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest()
        request.addEventListener('readystatechange', () => {
            if (request.readyState === 4 && request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data)
            } else if (request.readyState == 4) {
                reject('Country name wrong :(')
            }
        })
        request.open('get', resource);
        request.send()
    })
}

function getCountry(country) {
    getData(API + `${country}`).then((data) => {
        console.log(data);
        data.forEach(item => {
            const {
                flag,
                name,
                capital,
                region,
                population,
                currency,
                languages
            } = {
                flag: item.flags.svg,
                name: item.name.common,
                capital: item.capital ? item.capital[0] : "No capital",
                region: item.region,
                population: item.population,
                currency: Object.values(item.currencies),
                languages: Object.values(item.languages)
            }
            post(flag, name, capital, region, population, currency, languages)
        });
    }).catch((err) => {
        bottomDiv.innerHTML = ""
        bottomDiv.innerHTML = `<h3 class="messageTxt">Country name wrong!</h3>`
    })
}



let post = (flag, name, capital, region, population, currency, languages) => {
    let curr = ""
    currency.forEach(item => {
        curr += `${item.name} - { ${item.symbol} },`
    });
    bottomDiv.innerHTML = ""
    bottomDiv.innerHTML = ` 
    <div class="bottom_img">
        <img src="${flag}" alt="">
    </div>
    <h1>${name}</h1>
    <div class="bottom_info">
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Continent:</b> ${region}</p>
        <p><b>Population:</b> ${population.toLocaleString("en-US")}</p>
        <p><b>Currency:</b> ${curr}</p>
        <p><b>Common languages:</b> ${languages}</p>
    </div>`
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    countryName = inputSearch.value.toLowerCase()
    getCountry(countryName)
    countryName = ""
})