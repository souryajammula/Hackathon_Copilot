import React, {useEffect, useState} from 'react';
import DataLoader from './time/DataLoader';
import CountrySelector from './time/CountrySelector';
import FileSelector from './time/FileSelector';
import RangeSlider from './time/RangeSlider';
import ChartDisplay from './time/ChartDisplay';
import GDP from './CSV files/GDP Growth Rate.csv'
const App = () => {
    const [selectedCountry, setSelectedCountry] = useState('USA');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fullData, setFullData] = useState([]); // Store the full dataset here
    const [filteredData, setFilteredData] = useState(null); // Data to be used for charting
    const [yearRange, setYearRange] = useState({ start: 1960, end: 2020 });


    // Functions to handle state changes
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        console.log(country);
    };

    const handleFileSelect = (file) => {
        setSelectedFiles(prevFiles => {
            if (prevFiles.includes(file)) {
                return prevFiles.filter(f => f !== file);
            } else {
                return [...prevFiles, file];
            }
        });
    };

    // const handleDataLoaded = (loadedData) => {
    //     // Example logic: assuming loadedData is an array of objects with year and value
    //     const processedData = {
    //         labels: loadedData.map(item => item.Year),
    //         values: loadedData.map(item => item[selectedCountry])
    //     };
    //
    //     setData(processedData);
    // };
    const handleDataLoaded = (loadedData) => {
        setFullData(loadedData);
    };

    const filterDataByYearRange = () => {
        const filtered = fullData.filter(item => {
            const year = Number(item.Year);
            return year >= yearRange.start && year <= yearRange.end;
        });

        const processedData = {
            labels: filtered.map(item => item.Year),
            values: filtered.map(item => item[selectedCountry])
        };

        setFilteredData(processedData);
    };

    useEffect(() => {
        filterDataByYearRange();
    }, [fullData, yearRange, selectedCountry]);


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
            {selectedFiles.map(file => (
                <DataLoader key={file} file={GDP} onDataLoaded={handleDataLoaded} />
            ))}
            {filteredData && <ChartDisplay data={filteredData} country={selectedCountry}/>}
        </div>
    );
};

export default App;