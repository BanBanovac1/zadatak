import React, { useState, useRef } from 'react';
import Grid from './components/grid';
import EditBox from './components/editBox';
import * as constants from 'constants/constants';
import * as errors from 'constants/errors';
import 'style/main.less';

const App: React.FC<{}> = () => {
  const [rows, setRows] = useState<number>(constants.DEFAULT_ROWS);
  const [columns, setColumns] = useState<number>(constants.DEFAULT_COLUMNS);
  const [size, setSize] = useState<string>('medium');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const rowRef = useRef(null);
  const columnRef = useRef(null);
  const sizeRef = useRef(null);

  /**
   * Generates grid with new parameters.
   */
  const toggleGrid = () => {
    if (!inputValid()) {
      return;
    }

    setRows(parseInt(rowRef.current.value));
    setColumns(parseInt(columnRef.current.value));
    setSize(sizeRef.current.value);
  }

  /**
   * Checks validity of grid parameters.
   * 
   * @returns true - all parameters are valid
   * @returns false - some or all parameters are not valid
   */
  const inputValid = (): boolean => {
    const rowVal = rowRef.current.value;
    const columnVal = columnRef.current.value;

    setErrorMsg('');

    if (rowVal === '') {
      setErrorMsg(errors.ERROR_ROW_EMPTY);
      return false;
    }
    if (columnVal === '') {
      setErrorMsg(errors.ERROR_COLUMN_EMPTY);
      return false;
    }
    if (parseInt(rowVal) === 0) {
      setErrorMsg(errors.ERROR_ROW_NIL);
      return false;
    }
    if (parseInt(columnVal) === 0) {
      setErrorMsg(errors.ERROR_COLUMN_NIL);
      return false;
    }
    if (parseInt(rowVal) * parseInt(columnVal) > constants.MAX_FIELD_COUNT) {
      setErrorMsg(errors.ERROR_MAX_FIELDS_EXCEEDED);
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
