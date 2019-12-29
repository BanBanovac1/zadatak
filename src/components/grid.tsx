import * as React from 'react';
import { useState, useEffect } from 'react';
const FIELD_SIZE_SMALL = '20px';
const FIELD_SIZE_MEDIUM = '35px';
const FIELD_SIZE_LARGE = '50px';

interface Props {
    row: number;
    column: number;
    size: string
};

const Grid: React.FC<Props> = ({ row, column, size }) => {
    const [ranArray, setRanArray] = useState<number[]>([]);
    const [clickedFields, setClickedFields] = useState<number[]>([]);
    const [fieldCount, setFieldCount] = useState<number>(row * column);
    const [fieldSize, setFieldSize] = useState<string | null>(null);
    const [showFields, setFields] = useState<boolean>(false);

    const generateRanArray = () => {
        let i = 0;
        let ranArray = [];

        while (ranArray.length < fieldCount) {
            ranArray.push(++i);
        }

        shuffle(ranArray);

        setRanArray(ranArray);
        setFields(true);
    }

    const isAscending = (ranArray: number[]) => {
        console.log("isAscending pozvan!!!!!!!!!!!!!!!!!");
        console.log("ranArray u isAscending:");
        console.log(ranArray);
        return ranArray.every((x, i) => {
            return i === 0 || x >= ranArray[i - 1];
        });
    }

    const isDescending = (ranArray: number[]) => {
        console.log("isDescending pozvan!!!!!!!!!!!!!!!!!");
        console.log("ranArray u isDescending:");
        console.log(ranArray);

        return ranArray.every((x, i) => {
            return i === 0 || x <= ranArray[i - 1];
        });
    }
    /*https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array*/
    const shuffle = (ranArray: number[]) => {
        for (let i = ranArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ranArray[i], ranArray[j]] = [ranArray[j], ranArray[i]];
        }

        if (ranArray.length <= 2 || (!isAscending(ranArray) && !isDescending(ranArray))) {
            return;
        }

        shuffle(ranArray);
    }

    const toggleFlip = (fieldId: number) => {
        if (clickedFields.indexOf(fieldId) !== -1) {
            setClickedFields(clickedFields.filter(item => item !== fieldId));
            return;
        }
        setClickedFields([...clickedFields, fieldId]);
    }

    const renderFields = () => {
        for (let i = 0; i < ranArray.length; i++) {
            return ranArray.map((num, fieldId) => {
                return (<div
                    key={fieldId}
                    className={clickedFields.indexOf(fieldId) !== -1 ? 'field__clicked' : 'field'}
                    onClick={() => toggleFlip(fieldId)}>
                    <div className='field__inner'>
                        <div className='field__back'>{num}</div>
                        <div className='field__front' />
                    </div>
                </div>);
            });
        }
    }

    const parseSize = () => {
        console.log("u parse size: " + size);
        switch (size) {
            case 'small':
                setFieldSize(FIELD_SIZE_SMALL)
                break;
            case 'medium':
                setFieldSize(FIELD_SIZE_MEDIUM);
                break;
            case 'large':
                setFieldSize(FIELD_SIZE_LARGE);
                break;
        }
    }

    useEffect(() => { parseSize(); generateRanArray(); }, [fieldCount, size]);

    return (
        <div className="grid" style={{ gridTemplateColumns: `repeat(${column}, ${fieldSize})`, gridTemplateRows: `repeat(${row}, ${fieldSize})` }}>
            {showFields ? renderFields() : null}
        </div>
    );
}

export default Grid;
