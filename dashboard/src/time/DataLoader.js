import Papa from 'papaparse';

const DataLoader = ({ file, onDataLoaded }) => {
    Papa.parse(file, {
        download: true,
        header: true,
        complete: (results) => {
            onDataLoaded(results.data);
        }
    });

    return null; // This component doesn't render anything
};

export default DataLoader;
