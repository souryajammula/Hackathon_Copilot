const RangeSlider = ({ onStartYearChange, onEndYearChange }) => (
    <div>
        Start Year: <input type="range" onChange={onStartYearChange} />
        End Year: <input type="range" onChange={onEndYearChange} />
    </div>
);

export default RangeSlider;
