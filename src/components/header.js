import './header.css';
import App from '../App';
import pokeball from '../assets/pb1.png';
import logo from '../assets/logo.png'

export default function Header(){

    return(
        <div>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container">
                <img class='poke' src={pokeball}></img>
                <img class="logo" src={logo}></img>
            </div>
            </nav>
        </div>
    )
}