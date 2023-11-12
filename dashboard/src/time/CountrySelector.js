const CountrySelector = ({ onCountrySelect }) => (
    <select onChange={(e) => onCountrySelect(e.target.value)}>
        <option value="USA">USA</option>
        <option value="India">India</option>
        <option value="China">China</option>
    </select>
);

export default CountrySelector;