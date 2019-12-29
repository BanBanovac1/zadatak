import React from "react"

interface Props {
    handleInput: (e: any) => void;
    toggleGrid: (e: any) => void;
};

const EditBox: React.FC<Props> = ({ handleInput, toggleGrid }) => {
    return (
        <div className="edit-box">
            <input type="number" name="rows" placeholder="Enter number of rows" min="1" max="99" defaultValue={5} onChange={handleInput} />
            <input type="number" name="columns" placeholder="Enter number of columns" min="1" max="99" defaultValue={5} onChange={handleInput} />
            <select name='size' onChange={handleInput}>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </select>
            <div className="btn" onClick={toggleGrid}>Generate grid</div>
        </div>);
}

export default EditBox;