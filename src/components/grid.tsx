import React from 'react';
import { useState, useEffect } from 'react';
import Field from './field';
import * as constants from 'constants/constants';

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

    /**
     * Generates array of numbers from 1 to fieldCount and sets it as a state after
     * shuffling which will be used to fill grid fields with values from it. It should only
     * be called after fieldCount state is changed.
     */
    const generateRanArray = () => {
        let ranArray = [];

        ranArray = Array.from({ length: fieldCount }, (_v, k) => k + 1);

        shuffle(ranArray);
        setRanArray(ranArray);
    }

    /**
     * Checks that array is in ascending order.
     * 
     * @param ranArray - array of numbers
     * @returns true - array is in ascending order
     * @returns false - array is not in ascending order
     */
    const isAscending = (ranArray: number[]): boolean => {
        return ranArray.every((x, i) => {
            return i === 0 || x >= ranArray[i - 1];
        });
    }

    /**
     * Checks that array is in descending order.
     * 
     * @param ranArray - array of numbers
     * @returns true - array is in descending order
     * @returns false - array is not in descending order
     */
    const isDescending = (ranArray: number[]): boolean => {
        return ranArray.every((x, i) => {
            return i === 0 || x <= ranArray[i - 1];
        });
    }

    /**
     * Randomizes ordering of numbers inside given array and then
     * checks if array is in ascending or descending order. If any
     * of these conditions is true, this function will recursively
     * call itself until both conditions are false.
     * NOTE - it is sufficient to shuffle array of two numbers only 
     * once, since that array will always be in ascending or descending
     * order.
     * 
     * @param ranArray - array of numbers
     */
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

    /**
     * Flips field with matching fieldId. If field already
     * shows number, flip it to the front side, otherwise flip it
     * to the back side.
     * 
     * @param fieldId - field index
     */
    const toggleFlip = (fieldId: number) => {
        if (clickedFields.indexOf(fieldId) !== -1) {
            setClickedFields(clickedFields.filter(item => item !== fieldId));
            return;
        }
        setClickedFields([...clickedFields, fieldId]);
    }

    /**
     * Reset all fields to show front side (without number).
     */
    const resetFields = () => {
        setClickedFields([]);
    }


    /**
     * Render fields with numbers from ranArray.
     * 
     * @returns <Field/> - field component
     */
    const renderFields = () => {
        return ranArray.map((num, fieldId) => {
            return (<Field
                fieldId={fieldId}
                clName={clickedFields.indexOf(fieldId) !== -1 ? 'field--clicked' : 'field'}
                num={num}
                toggleFlip={toggleFlip} />)
        });
    }

    /**
     * Parses size prop and sets field size.
     */
    const parseSize = () => {
        switch (size) {
            case 'small':
                setFieldSize(constants.FIELD_SIZE_SMALL)
                break;
            case 'medium':
                setFieldSize(constants.FIELD_SIZE_MEDIUM);
                break;
            case 'large':
                setFieldSize(constants.FIELD_SIZE_LARGE);
                break;
        }
    }

    useEffect(() => {
        resetFields();
        setFieldCount(row * column);
    }, [row, column]);

    useEffect(() => {
        parseSize();
    }, [size]);

    useEffect(() => {
        generateRanArray();
    }, [fieldCount]);

    return (
        <div className='grid' style={{
            ['--row-count' as any]: row,
            ['--column-count' as any]: column,
            ['--field-size' as any]: fieldSize
        }}>
            {renderFields()}
        </div>
    );
}

export default Grid;
