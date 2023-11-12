const FileSelector = ({ onFileSelect }) => (
    <div>
        <label>
            <input type="checkbox" onChange={() => onFileSelect('GDP Growth')} /> GDP Growth
        </label>
        {/* Repeat for other files */}
    </div>
);

export default FileSelector;
