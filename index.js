const Axios = require('axios')

const latitud = "-34.9661224";
const longitud = "-54.9445817";
const resultadosMaximosATraer = 150;
const APartirDeCualTraer = 0;

const urlRequest = `https://www.pedidosya.com.uy/mobile/v5/shopList?businessType=RESTAURANT&country=1&includePaymentMethods=VisaNet%2COCA%2CMastercard%20UY%2CTicket%20Restaurant%20Online%2CTicket%20Alimentaci%C3%B3n%20Online%2CCreditel%20UY%2CSpreedly%20UY&max=${resultadosMaximosATraer}&offset=${APartirDeCualTraer}&point=${latitud}%2C${longitud}&sortBy=default&withFilters=true`

const headers = {
    'authority': 'www.pedidosya.com.uy',
    'method': 'GET',
    'path': '/mobile/v5/shopList?businessType=RESTAURANT&country=1&includePaymentMethods=VisaNet%2COCA%2CMastercard%20UY%2CTicket%20Restaurant%20Online%2CTicket%20Alimentaci%C3%B3n%20Online%2CCreditel%20UY%2CSpreedly%20UY&max=150&offset=0&point=-34.9661224%2C-54.9445817&sortBy=default&withFilters=true',
    'scheme': 'https',
    'accept': 'application/json, text/plain, */*',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'cache-control': 'no-cache',
    'cookie': 'acaTuCockie -> Para encontrarlo, entras una vez a la pagina, apretas F12 y miras en network el metodo en cuesiton. Si no entendes, mira mi directo: https://www.youtube.com/watch?v=Kj8XfZ6DpUI',
    'pragma': 'no-cache',
    'referer': 'https://www.pedidosya.com.uy/restaurantes?address=Comodoro%20Gorlero&city=Punta%20del%20Este&lat=-34.9661224&lng=-54.9445817',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'user-agent': 'Esto se saca tambien de apretar F12, como hice aca: https://www.youtube.com/watch?v=Kj8XfZ6DpUI'
}

const ParserRestaurantData = (restaurant) => {
    return {
        'precioPromedio': restaurant?.averagePrice,
        'categorias': restaurant?.categories,
        'descuento': restaurant?.discount,
        'distancia': restaurant?.distance,
        'comida': restaurant?.food,
        'speed': restaurant?.speed,
        'name': restaurant?.name,
    }
}

async function getRestaurantsData() {
    let response = await Axios.get(urlRequest, {
        headers: headers
    })
    let restaurantResponse = response.data.list.data;
    restaurantData = restaurantResponse.map(restaurant => ParserRestaurantData(restaurant));
    console.log("Se trajieron ", response.data.list.count, " restaurantes");
    console.log("El total son ", response.data.list.total)

    return restaurantData;
}

const fs = require('fs');

const saveInJson = (restaurantData) => {
    restaurantsJson = JSON.stringify(restaurantData);
    fs.writeFileSync('peya.json', restaurantsJson);
}

getRestaurantsData().then(restaurantsData => saveInJson(restaurantsData))
