import React, { useState } from 'react';
import Grid from './components/grid';
import EditBox from './components/editBox';
import style from 'style/app.less';

const DEFAULT_ROWS = 5;
const DEFAULT_COLUMNS = 5;
const MAX_FIELD_COUNT = 99;

const App = () => {
  const [rows, setRows] = useState<number>(DEFAULT_ROWS);
  const [columns, setColumns] = useState<number>(DEFAULT_COLUMNS);
  const [size, setSize] = useState<string>('small');
  const [showGrid, setGrid] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setGrid(false);

    switch (name) {
      case 'rows':
        setRows(parseInt(value));
        break;
      case 'columns':
        setColumns(parseInt(value));
        break;
      case 'size':
        setSize(value);
        break;
    }
  }

  const toggleGrid = () => {
    const fieldCount = rows * columns;

    if (fieldCount > MAX_FIELD_COUNT) {
      setGrid(false);
      setErrorMsg('Number of fields exceeds 99!');
      return;
    }

    setGrid(true);
  }

  return (
    <div className={style.App}>
      {showGrid ? <Grid row={rows} column={columns} size={size} /> :
        <div className={style.errorMsg}>{errorMsg}</div>}
      <EditBox handleInput={handleInput} toggleGrid={toggleGrid} />
    </div >
  );

}

export default App;
