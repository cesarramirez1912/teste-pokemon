import "./styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export const PokemonCard = ({ pokemonData }) => {
    const style = {
        fire: "#ee7f33",
        grass: " #78c84f",
        water: "#6890f0",
        ice: "#98d8d7",
        poison: "#a040a1",
        ground: "#e0c069",
        flying: "#a790ef",
        bug: "#a8b821",
        rock: "#665e36",
        ghost: "#705797",
        dragon: "#724ef9",
        dark: "#6f5848",
        steel: "#b8b8d0",
        fairy: "#f4c8e2",
        psychic: "#e95587",
        electric: "#f8cf32",
        fighting: "#c03228",
        normal: "#a9a778",
    }
    const colorStyle = {
        grass: "#333333",
    }

    const [isHover, setIsHover] = useState(false);



    return <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="card-pokemon">
        <div className="card-img">
            <div className="icon-heart">
                {pokemonData.isFavorite === true ? <FontAwesomeIcon icon={faHeartSolid} /> : <></>}
                {isHover && pokemonData.isFavorite !== true ? < FontAwesomeIcon icon={faHeart} /> : <div></div>}
            </div>
            <img onError={(e) => { e.target.onerror = null; e.target.src = "https://developers.google.cn/maps/documentation/streetview/images/error-image-generic.png?hl=ar" }} src={pokemonData.sprites.large} />
        </div>
        <p className="pokemon-number">Nº {pokemonData.national_number}</p>
        <p className="pokemon-name"> {pokemonData.name}</p>
        {pokemonData.type.map((type, key) => (
            <button key={key} style={{ backgroundColor: style[type.toLowerCase()], cursor: "pointer", border: "0px", color: colorStyle[type.toLowerCase()] ?? "white", borderRadius: "5px", marginRight: "5px", padding: "5px 10px", fontSize: "10px" }}>{type}</button>
        ))}
    </div>
}