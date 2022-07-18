import React, { useEffect } from 'react';
import './App.css';
import pokeball from './assets/pb1.png'

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
}, 3000); 


return (
  <div className="App">
  <div className='gallery'>
    { loading ? (
        <div className='pokeballs'>
          <h3>Cargando</h3>
          <img src={pokeball} className='pb'></img>
          <img src={pokeball} className='pb'></img>
          <img src={pokeball} className='pb'></img>
        </div>
    ) : (
      pokemon.map((img, id) => (
        <div className='cards' id={img.id} key={img.id}>
          <div className='card'>
            <div className={img.types[0].type.name}>
              <img  className='shake' src={img.sprites.other['official-artwork'].front_default} alt='pokemon'/>
            </div>
            <div>
              <h4 className='title'>{img.name}</h4>
              <h5 className={`tipo _${img.types[0].type.name}`}>{img.types[0].type.name}</h5>
              <div className='description'>
                <h6 className='hp'>{img.stats[0].stat.name} : <span>{img.stats[0].base_stat}</span></h6>
                <h6 className='attack'>{img.stats[1].stat.name} : <span>{img.stats[1].base_stat}</span></h6>
                <h6 className='defense'>{img.stats[2].stat.name} : <span>{img.stats[2].base_stat}</span></h6>
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