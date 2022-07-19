import React, { useEffect, useState } from 'react';
import './App.css';
import pokeball from './assets/pb1.png'
import axios from 'axios';

function App() {
const [result, setResult] = React.useState([]);
const [pokemon, setPokemon] = React.useState([]);

const [tablaPokemon, setTablaPokemon] = React.useState([]);
const [loading, setLoading] = React.useState('true');
const [busqueda0, setBusqueda0] = useState("");
const [busqueda, setBusqueda] = useState("");
const [busqueda2, setBusqueda2] = useState("");
const [busqueda3, setBusqueda3] = useState("");
const pokemones = [];


const getPokemon = async()=>{
  await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000offset=0")
  .then((response) => response.data)
    .then((data) => setResult(
      data.results.map((item) => {
        fetch(item.url)
          .then((response) => response.json())
          .then((lista) => pokemones.push(lista));
          setPokemon(pokemones);
          setTablaPokemon(pokemones);
      }),
    ));
}

useEffect(()=>{
  getPokemon();
},[]);

const handleName = e => {
  setBusqueda(e.target.value);
  filtrarNombre(e.target.value);
}

const handleAttack = e => {
  setBusqueda2(e.target.value);
  filtrarAtaque(e.target.value);
}

const handleDefense = e => {
  setBusqueda3(e.target.value);
  filtrarDefensa(e.target.value);
}

const handleHabilidades = e => {
  filtrarHabilidades(e.target.value);
}

const handleHp = e=>{
  setBusqueda0(e.target.value)
  filtrarHp(e.target.value)
}

const handleReset = e =>{
  setBusqueda0("")
  setBusqueda2("")
  setBusqueda3("")
  filtrarHabilidades(e.target.value)
}

const filtrarHp = (hpSeleccionado)=>{
  var resultadoHp = tablaPokemon.filter((elemento)=>{
    if(elemento.stats[0].base_stat >= hpSeleccionado){
      return elemento;
    }
  });
  console.log(resultadoHp);
  setPokemon(resultadoHp);
}

const filtrarDefensa = (defensaSeleccionado)=>{
  var resultadoDefensa = tablaPokemon.filter((elemento)=>{
    if(elemento.stats[2].base_stat >= defensaSeleccionado){
      return elemento;
    }
  });
  console.log(resultadoDefensa);
  setPokemon(resultadoDefensa);
}

const filtrarAtaque = (ataqueSeleccionado)=>{
  var resultadoAtaque = tablaPokemon.filter((elemento)=>{
    if(elemento.stats[1].base_stat >= ataqueSeleccionado){
      return elemento;
    }
  });
  console.log(resultadoAtaque);
  setPokemon(resultadoAtaque);
}


const filtrarNombre=(pokemonBuscado)=>{
  var resultadoBusqueda = tablaPokemon.filter((elemento)=>{
    if(elemento.name.toString().toLowerCase().includes(pokemonBuscado.toLowerCase())){
      return elemento;
    }
  });
  console.log(resultadoBusqueda);
  setPokemon(resultadoBusqueda);
}

const filtrarHabilidades=()=>{
  var resultadoBusqueda = tablaPokemon.filter((elemento)=>{
    if(elemento.stats[0].base_stat >= busqueda0){
      if(elemento.stats[1].base_stat >= busqueda2){
        if(elemento.stats[2].base_stat >= busqueda3){
        return elemento;
        }
      }
    }
  });
  console.log(resultadoBusqueda);
  setPokemon(resultadoBusqueda);
}





//Sin AXIOS
// useEffect(() => {fetch('https://pokeapi.co/api/v2/pokemon/?limit=802')
//     .then((response) => response.json())
//     .then((data) => setResult(
//       data.results.map((item) => {
//         fetch(item.url)
//           .then((response) => response.json())
//           .then((lista) => pokemones.push(lista));
//           setPokemon(pokemones);
//       }),
//     ));
// }, []);


setTimeout(() => {
  setLoading(false);
}, 3000); 


return (
  <div className="App">
    <aside >
        <div className="containerInput">
          <input 
            className="form-control inputBuscar"
            placeholder='Buscar'
            value={busqueda} 
            onChange={handleName} />
          <div className='inputHp'>
            <label for="customRange0" class="form-label">HP: <span>{busqueda0}</span> </label>
            <input type="range" class="form-range" min="0" max="275" id="customRange0" onChange={handleHp} value={busqueda0}></input>
          </div>
          <div className='inputAttack'>
            <label for="customRange1" class="form-label">Ataque: <span>{busqueda2}</span> </label>
            <input type="range" class="form-range" min="0" max="200" id="customRange1" onChange={handleAttack} value={busqueda2}></input>
          </div>
          <div className='inputDefense'>
            <label for="customRange2" class="form-defense-label">Defensa: <span>{busqueda3}</span></label>
            <input type="range" class="form-range" min="0" max="275" id="customRange2" onChange={handleDefense} value={busqueda3}  ></input>
          </div>
          <div className='buttons'>
            <button className='btn-sort' onClick={handleHabilidades}> Find</button>
            <button className='btn-reset' onClick={handleReset}> Reset</button>
          </div>
        </div>
    </aside>
    <div className='gallery'>
      { loading ? (
          <div className='pokeballs'>
            <h3>Cargando</h3>
            <img src={pokeball} className='pb'></img>
            <img src={pokeball} className='pb'></img>
            <img src={pokeball} className='pb'></img>
          </div>
      ) : (pokemon &&
        pokemon.map((img, id) => (
            <div className='cards' id={img.id} key={id}>
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