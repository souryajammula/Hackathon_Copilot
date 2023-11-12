import React, { useEffect, useState } from 'react';
import DataLoader from './time/DataLoader';
import CountrySelector from './time/CountrySelector';
import FileSelector from './time/FileSelector';
import RangeSlider from './time/RangeSlider';
import ChartDisplay from './time/ChartDisplay';
import GDP from './CSV files/GDP Growth Rate.csv'

const App = () => {
    const [selectedCountry, setSelectedCountry] = useState('USA');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [allData, setAllData] = useState({}); // Store data for each file
    const [filteredData, setFilteredData] = useState({}); // Data for charts after filtering
    const [yearRange, setYearRange] = useState({ start: 1960, end: 2020 });

    const handleCountrySelect = (country) => setSelectedCountry(country);

    const handleFileSelect = (file) => {
        setSelectedFiles(prevFiles => {
            if (prevFiles.includes(file)) {
                return prevFiles.filter(f => f !== file);
            } else {
                return [...prevFiles, file];
            }
        });
    };

    const handleDataLoaded = (file, loadedData) => {
        setAllData(prevData => ({ ...prevData, [file]: loadedData }));
    };

    const filterDataByYearRange = () => {
        const newFilteredData = {};
        selectedFiles.forEach(file => {
            if (allData[file]) {
                const filtered = allData[file].filter(item => {
                    const year = Number(item.Year);
                    return year >= yearRange.start && year <= yearRange.end;
                });

                newFilteredData[file] = {
                    labels: filtered.map(item => item.Year),
                    values: filtered.map(item => item[selectedCountry])
                };
            }
        });
        setFilteredData(newFilteredData);
    };

    useEffect(() => {
        filterDataByYearRange();
    }, [allData, yearRange, selectedCountry, selectedFiles]);

    const handleStartYearChange = (event) => {
        setYearRange(prev => ({ ...prev, start: Number(event.target.value) }));
    };

    const handleEndYearChange = (event) => {
        setYearRange(prev => ({ ...prev, end: Number(event.target.value) }));
    };

    return (
        <div>
            <CountrySelector onCountrySelect={handleCountrySelect} />
            <FileSelector onFileSelect={handleFileSelect} />
            <RangeSlider
                onStartYearChange={handleStartYearChange}
                onEndYearChange={handleEndYearChange}
                yearRange={yearRange}
            />
            {/*ikkda flicker avuthoondi*/}
            {selectedFiles.map(file => (
                <DataLoader key={file} file={GDP} onDataLoaded={(data) => handleDataLoaded(file, data)} />
            ))}

            {Object.keys(filteredData).map(file => (
                <ChartDisplay key={file} data={filteredData[file]} title={file} country={selectedCountry} />
            ))}
        </div>
    );
};

export default App;