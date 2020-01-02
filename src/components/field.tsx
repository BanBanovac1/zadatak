import React from 'react';

interface Props {
    fieldId: number;
    clName: string;
    num: number
    toggleFlip: (fieldId: number) => void;
};

const Field: React.FC<Props> = ({ fieldId, clName, num, toggleFlip }) => {
    return (<div
        key={fieldId}
        className={clName}
        onClick={() => toggleFlip(fieldId)}>
        <div className='field__inner'>
            <div className='field__back'>{num}</div>
            <div className='field__front' />
        </div>
    </div>)
}

export default Field;
