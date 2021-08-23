
import { useEffect, useState } from "react"
import { Header } from "../../components/header"
import { InputSearch } from "../../components/input_search"
import { PokemonCard } from "../../components/pokemon_card"
import { WrapperOptions } from "../../components/wrapper_options"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./styles.css"
export const Pokedex = () => {

    const [pokemonsData, setPokemonsData] = useState([]);
    const [pokemonsDataFilter, setPokemonsDataFilter] = useState([]);
    const [pokemonsDataFilterAux, setPokemonsDataFilterAux] = useState([]);
    const [filterSelected, setFilterSelected] = useState("Todos");
    const [filterTypeOption, setFilterTypeOption] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [toggleIsChecked, setToggleIsChecked] = useState(false);

    useEffect(() => {
        fetch('https://unpkg.com/pokemons@1.1.0/pokemons.json')
            .then(response => response.json())
            .then(allpokemon => {
                let responseFilter = allpokemon.results.filter((v, i, a) => a.findIndex(t => (t.national_number === v.national_number)) === i)
                console.log(responseFilter);

                setPokemonsData(responseFilter)
                setPokemonsDataFilter(responseFilter)
                handleFilterOptions(responseFilter, 0)
            })
    }, []);

    const filters = [
        "Todos",
        "Fire",
        "Grass",
        "Water",
        "Ice",
        "Poison",
        "Ground",
        "Flying",
        "Bug",
        "Rock",
        "Ghost",
        "Dragon",
        "Dark",
        "Steel",
        "Fairy",
        "Psychic",
        "Electric",
        "Fighting",
        "Normal",];


    const handleFilterType = async (typeFilter) => {
        setFilterSelected(typeFilter);
        let auxPokemonsData = [...pokemonsData];
        let pokemonsFiltereds = [];
        if (typeFilter.toLowerCase() === "todos") {
            pokemonsFiltereds = auxPokemonsData
        } else {
            pokemonsFiltereds = auxPokemonsData.reduce((init, current) => {
                let find = current.type.filter(item => item.toLowerCase() === typeFilter.toLowerCase());
                if (find.length !== 0) {
                    init.push(current)
                }
                return init;
            }, []);
        }

        handleFilterOptions(pokemonsFiltereds, filterTypeOption);
    }

    const handleFilterOptions = (pokemonsFiltereds, filterType) => {
        let auxPokemonsDataFilter = [...pokemonsFiltereds];
        if (filterType === 0) {
            auxPokemonsDataFilter.sort((a, b) => parseInt(a.national_number) - parseInt(b.national_number));
        } else {
            auxPokemonsDataFilter.sort((a, b) => a.name.localeCompare(b.name))
        }
        setPokemonsDataFilter(auxPokemonsDataFilter);
        setPokemonsDataFilterAux(auxPokemonsDataFilter);
    }

    const handleFilterInput = (name) => {
        let auxPokemonsDataFilter = [...pokemonsDataFilterAux];
        let auxFilterNameRegistro = auxPokemonsDataFilter.filter(item => item.name.toLowerCase().includes(name.toLowerCase()) || item.national_number.includes(name));
        setPokemonsDataFilter(auxFilterNameRegistro);
    }

    const handleChangeFavorite = async (index) => {

        let auxPokemonsDataFilter = [...pokemonsDataFilter];
        let auxPokemonsDataFilterAux = [...pokemonsDataFilterAux];
        let auxPokemonsData = [...pokemonsData];

        const index1 = auxPokemonsDataFilter.findIndex(x => x.national_number === index);
        const index2 = auxPokemonsDataFilterAux.findIndex(x => x.national_number === index);
        const index3 = auxPokemonsData.findIndex(x => x.national_number === index);

        auxPokemonsDataFilter[index1] = { ...auxPokemonsData[index3], isFavorite: auxPokemonsData[index3].isFavorite ? false : true };
        auxPokemonsDataFilterAux[index2] = { ...auxPokemonsData[index3], isFavorite: auxPokemonsData[index3].isFavorite ? false : true };
        auxPokemonsData[index3] = { ...auxPokemonsData[index3], isFavorite: auxPokemonsData[index3].isFavorite ? false : true };

        setPokemonsDataFilter(auxPokemonsDataFilter);
        setPokemonsDataFilterAux(auxPokemonsDataFilterAux);
        setPokemonsData(auxPokemonsData)
    }

    const handleFilterFavorites = (toggleIsChecked) => {
        let auxPokemonsData = [...pokemonsData];
        let auxPokemonFilter = [];
        if (toggleIsChecked) {
            auxPokemonFilter = auxPokemonsData.filter(item => item.isFavorite === true);
            setPokemonsDataFilter(auxPokemonFilter);
        } else {
            handleFilterType(filterSelected)
        }


    }

    return <div className="column container-pokedex">
        <Header />
        <div className="container">
            <div className="row space-items">
                <InputSearch setInputValue={() => setInputValue()} inputValue={inputValue} onChange={(value) => handleFilterInput(value)} />
                <p className="order-p">Ordenar por</p>
                <WrapperOptions onClick={(value) => {
                    setFilterTypeOption(parseInt(value));
                    handleFilterOptions(pokemonsDataFilter, parseInt(value));
                }} />
            </div>
            <div className="sections">
                <div className="column filters-sections">
                    <p className="order-p align-end">
                        Filtrar por Tipo
                    </p>

                    <div className="grid-tipos">
                        {filters.map((item, index) => (
                            <div key={index} onClick={async () => await handleFilterType(item)} className={filterSelected.toLowerCase() === item.toLowerCase() ? "tipo-style-selected" : "tipo-style"}>
                                <p>{item}</p>
                                {filterSelected.toLowerCase() === item.toLowerCase() && <FontAwesomeIcon size="xs" color="white" icon={faCheck} />}
                            </div>
                        ))}
                    </div>

                    <p className="order-p align-end">
                        Filtrar Favoritos
                    </p>

                    <label class="switch">
                        <input type="checkbox" checked={toggleIsChecked} onClick={() => {
                            setToggleIsChecked(!toggleIsChecked)
                            handleFilterFavorites(!toggleIsChecked);
                        }} />
                        <span className="slider round"></span>
                    </label>

                </div>

                <div className="pokemons-sections">
                    {pokemonsDataFilter.map((pokemonData, index) => (
                        <div onClick={async () => {
                            await handleChangeFavorite(pokemonData.national_number)
                        }} key={index}> <PokemonCard pokemonData={pokemonData} /></div>
                    ))}

                </div>
            </div>
        </div>
    </div >
}