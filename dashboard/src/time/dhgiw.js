import React, { useEffect, useState } from 'react';
// ... other imports

const App = () => {
    const [selectedCountry, setSelectedCountry] = useState('USA');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [allData, setAllData] = useState({}); // Store datasets keyed by file name
    const [filteredData, setFilteredData] = useState({}); // Filtered data for charts
    const [yearRange, setYearRange] = useState({ start: 1960, end: 2020 });

    // ... other function implementations

    const handleDataLoaded = (file, loadedData) => {
        setAllData(prevData => ({ ...prevData, [file]: loadedData }));
    };

    const filterDataByYearRange = () => {
        const newFilteredData = {};
        Object.keys(allData).forEach(file => {
            const filtered = allData[file].filter(item => {
                const year = Number(item.Year);
                return year >= yearRange.start && year <= yearRange.end;
            });

            newFilteredData[file] = {
                labels: filtered.map(item => item.Year),
                values: filtered.map(item => item[selectedCountry])
            };
        });
        setFilteredData(newFilteredData);
    };

    useEffect(() => {
        filterDataByYearRange();
    }, [allData, yearRange, selectedCountry]);

    // ... rest of the component

    return (
        <div>
            <CountrySelector onCountrySelect={handleCountrySelect} />
            <FileSelector onFileSelect={handleFileSelect} />
            <RangeSlider
                onStartYearChange={handleStartYearChange}
                onEndYearChange={handleEndYearChange}
                yearRange={yearRange}
            />
            {selectedFiles.map(file => (
                <DataLoader key={file} file={`./CSV files/${file}.csv`} onDataLoaded={(data) => handleDataLoaded(file, data)} />
            ))}
            {Object.keys(filteredData).map(file => (
                <ChartDisplay key={file} data={filteredData[file]} title={file} country={selectedCountry} />
            ))}
        </div>
    );
};

export default App;