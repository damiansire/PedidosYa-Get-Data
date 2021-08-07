import logo from './logo.svg';
import './App.css';
import jsonData from "../src/peya.json";

function App() {
  console.log(jsonData);
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>
              categorias
            </th>
            <th>
              comida
            </th>
            <th>
              descuento
            </th>
            <th>
              distancia
            </th>
            <th>
              name
            </th>
            <th>
              precioPromedio
            </th>
            <th>
              speed
            </th>
          </tr>
        </thead>
        <tbody>
          {
            jsonData.map(restaurant => {
              return (
                <tr key={restaurant?.name}>
                  <td>
                    {"hola"}
                  </td>
                  <td>
                    {restaurant?.comida}
                  </td>
                  <td>
                    {restaurant?.descuento}
                  </td>
                  <td>
                    {restaurant?.distancia}
                  </td>
                  <td>
                    {restaurant?.name}
                  </td>
                  <td>
                    {restaurant?.precioPromedio}
                  </td>
                  <td>
                    {restaurant?.speed}
                  </td>
                </tr>)
            })
          }
        </tbody>


      </table>

    </div>
  );
}

export default App;
