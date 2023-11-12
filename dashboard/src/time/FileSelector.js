const FileSelector = ({ onFileSelect }) => (
    <div>
        <label>
            <input type="checkbox" onChange={() => onFileSelect('GDP Growth1')} /> GDP Growth
        </label>
        <label>
            <input type="checkbox" onChange={() => onFileSelect('GDP Growth2')} /> GDP Growth
        </label>
        <label>
            <input type="checkbox" onChange={() => onFileSelect('GDP Growth3')} /> GDP Growth
        </label>
        {/* Repeat for other files */}
    </div>
);

export default FileSelector;
