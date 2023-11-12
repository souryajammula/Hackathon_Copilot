const RangeSlider = ({ onStartYearChange, onEndYearChange, yearRange }) => (
    <div>
        Start Year: <input type="range" min="1990" max="2020" value={yearRange.start} onChange={onStartYearChange} />
        End Year: <input type="range" min="1990" max="2020" value={yearRange.end} onChange={onEndYearChange} />
    </div>
);

export default RangeSlider;
