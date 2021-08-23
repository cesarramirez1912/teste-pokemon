import "./styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export const InputSearch = ({ onChange, inputValue, setInputValue }) => {
    return <div className="row input-icon">
        <input
            onChange={(e) => {
                setInputValue(e.target.value)
                onChange(e.target.value)
            }}
            value={inputValue}
            type="search"
            placeholder="Pesquisar por nome ou número"
            className="input-reset color-inherit input-focus all-animate br-pill ph4 sans-serif header-search-input ba bw1 bg-gray1 b--gray1">
        </input>
        <FontAwesomeIcon color="#e2350d" icon={faSearch} />

    </div>
}
