import React, { useState, useRef, useEffect } from 'react';
import Grid from './components/grid';
import EditBox from './components/editBox';
import { MAX_FIELD_COUNT, DEFAULT_ROWS, DEFAULT_COLUMNS } from 'constants/index';
import 'style/app.less';

const App = () => {
  const [rows, setRows] = useState<number>(DEFAULT_ROWS);
  const [columns, setColumns] = useState<number>(DEFAULT_COLUMNS);
  const [size, setSize] = useState<string>('small');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const rowRef = useRef(null);
  const columnRef = useRef(null);
  const sizeRef = useRef(null);

  const toggleGrid = () => {
    if (!inputValid()) {
      return;
    }

    setRows(parseInt(rowRef.current.value));
    setColumns(parseInt(columnRef.current.value));
    setSize(sizeRef.current.value);
  }

  const inputValid = (): boolean => {
    const rowVal = rowRef.current.value;
    const columnVal = columnRef.current.value;

    setErrorMsg('');

    if (rowVal === '') {
      setErrorMsg('Enter number of rows!');
      return false;
    }
    if (columnVal === '') {
      setErrorMsg('Enter number of columns!');
      return false;
    }
    if (parseInt(rowVal) === 0) {
      setErrorMsg('Number of rows cannot be 0!');
      return false;
    }
    if (parseInt(columnVal) === 0) {
      setErrorMsg('Number of columns cannot be 0!');
      return false;
    }
    if (parseInt(rowVal) * parseInt(columnVal) >= MAX_FIELD_COUNT) {
      setErrorMsg('Number of fields cannot exceed 99!');
      return false;
    }

    return true;
  }

  return (
    <div className='App'>
      <div className='header'>GRID GENERATOR</div>
      <Grid row={rows} column={columns} size={size} />
      {errorMsg !== '' ? <div className='errorMsg'>{errorMsg}</div> : null}
      <EditBox
        fwdRefRow={rowRef}
        fwdRefColumn={columnRef}
        fwdRefSize={sizeRef}
        toggleGrid={toggleGrid} />
    </div >
  );

}

export default App;
