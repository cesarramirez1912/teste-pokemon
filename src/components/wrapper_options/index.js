import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./styles.css"
export const WrapperOptions = ({ onClick }) => {
    return <div className="selectWrapper">
        <select onChange={(e) => onClick(e.target.value)} className="selectBox">
            <option value={0}>Menor número primeiro</option>
            <option value={1}>Filtrar por nome</option>
        </select>
        <FontAwesomeIcon icon={faCaretDown} />
    </div>
}