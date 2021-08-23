import "./styles.css"
import { PokeballImage } from "../../images/pokeball"
import { SynviaImage } from "../../images/synvia"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

export const Header = () => {
    return <div className="container-header">
        <div className="row container items-header">
            <div className="row">
                <PokeballImage />
                <h1 className="h1-header">Pokédex</h1>
            </div>
            <div className="row">
                <SynviaImage />
                <div className="divider-icon"></div>
                <FontAwesomeIcon size="lg" color="white" icon={faSignOutAlt} />
            </div>
        </div>
    </div>
}