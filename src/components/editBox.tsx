import React from 'react';

interface Props {
    forwardRefRow: React.Ref<HTMLInputElement>;
    forwardRefColumn: React.Ref<HTMLInputElement>;
    forwardRefSize: React.Ref<HTMLSelectElement>;
    toggleGrid: (e: any) => void;
};

const EditBox: React.FC<Props> = ({ forwardRefRow,
    forwardRefColumn,
    forwardRefSize,
    toggleGrid }) => {
    return (
        <div className="editBox">
            <input
                ref={forwardRefRow}
                type="number"
                name="rows"
                placeholder="Enter number of rows"
                min="1"
                max="99"
                defaultValue={5}
            />
            <input
                ref={forwardRefColumn}
                type="number"
                name="columns"
                placeholder="Enter number of columns"
                min="1"
                max="99"
                defaultValue={5}
            />
            <select ref={forwardRefSize} name='size' >
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </select>
            <div className="btn" onClick={toggleGrid}>Generate grid</div>
        </div>);
}

export default EditBox;