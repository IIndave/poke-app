import React, { useEffect } from 'react';
import './App.css';

function App() {
const [result, setResult] = React.useState([]);
const [pokemon, setPokemon] = React.useState([]);
const [loading, setLoading] = React.useState('true');
const pokemones = [];

useEffect(() => {fetch('https://pokeapi.co/api/v2/pokemon/?limit=802')
    .then((response) => response.json())
    .then((data) => setResult(
      data.results.map((item) => {
        fetch(item.url)
          .then((response) => response.json())
          .then((lista) => pokemones.push(lista));
          setPokemon(pokemones);
      }),
    ));
}, []);

setTimeout(() => {
  setLoading(false);
}, 2000); 


return (
  <div className="App">
  <div className='gallery'>
    { loading ? (
      <p>Loading...</p>
    ) : (
      pokemon.map((img, id) => (
        <div className='cards' id={img.id} key={img.id}>
          <div className='card'>
            <div className={img.types[0].type.name}>
              <img  className='shake' src={img.sprites.other['official-artwork'].front_default} alt='pokemon'/>
            </div>
            <div>
              <h4 className='title'>{img.name}</h4>
              <h5 className='tipo'>{img.types[0].type.name}</h5>
              <div className='description'>
                <h5 className='hp'>{img.stats[0].stat.name} : <span>{img.stats[0].base_stat}</span></h5>
                <h5 className='attack'>{img.stats[1].stat.name} : <span>{img.stats[1].base_stat}</span></h5>
                <h5 className='defense'>{img.stats[2].stat.name} : <span>{img.stats[2].base_stat}</span></h5>
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
  </div>
  
);
}
export default App;