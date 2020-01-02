import React from 'react';
import * as constants from 'constants/constants.ts'

interface Props {
    fwdRefRow: React.Ref<HTMLInputElement>;
    fwdRefColumn: React.Ref<HTMLInputElement>;
    fwdRefSize: React.Ref<HTMLSelectElement>;
    toggleGrid: (e: any) => void;
};

const EditBox: React.FC<Props> = ({
    fwdRefRow,
    fwdRefColumn,
    fwdRefSize,
    toggleGrid }) => {
    return (
        <div className='editBox'>
            <label>Rows:</label>
            <input
                ref={fwdRefRow}
                type='number'
                name='rows'
                placeholder='Enter number of rows'
                defaultValue={constants.DEFAULT_ROWS}
            />
            <label>Columns:</label>
            <input
                ref={fwdRefColumn}
                type='number'
                name='columns'
                placeholder='Enter number of columns'
                defaultValue={constants.DEFAULT_COLUMNS}
            />
            <label>Field size:</label>
            <select ref={fwdRefSize} name='size' >
                <option value='small'>small</option>
                <option selected value='medium'>medium</option>
                <option value='large'>large</option>
            </select>
            <div className='editBox__btn' onClick={toggleGrid}>Generate grid</div>
        </div>);
}

export default EditBox;