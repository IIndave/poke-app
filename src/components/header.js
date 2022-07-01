import './header.css';
import pokeball from '../assets/pb1.png';
import logo from '../assets/logo.png'

export default function Header(){

    return(
        <div>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container">
                <img class='poke' src={pokeball}></img>
                <img class="logo" src={logo}></img>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
            </nav>
        </div>
    )
}