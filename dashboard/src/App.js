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
    const [allData, setAllData] = useState({}); // Store datasets keyed by file name
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
                <DataLoader key={file} file={GDP} onDataLoaded={(data) => handleDataLoaded(file, data)} />
            ))}

            {Object.keys(filteredData).map(file => (
                filteredData[file] ?
                    <ChartDisplay key={file} data={filteredData[file]} title={file} country={selectedCountry} />
                    : null
            ))}
        </div>
    );
};

export default App;