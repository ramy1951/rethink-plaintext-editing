import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import css from './style.css';
import { TextField } from '@material-ui/core'


function PlaintextEditor({ file, write }) {

  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      setText(await file.text());
    })();
  }, [file]);

  const handleChange = (e) => {
    setText(e.target.value);
    console.log(text);
    const newFile = new File(
      [
        text
      ],
      file.name,
      {
        type: file.type,
        lastModified: new Date(Date.now())
      }
    );

    write(newFile)
  }

  return (
    <div className={css.editor}>
      <TextField
        value={text}
        onChange={handleChange}
        multiline
        rows={5}
        size="medium"
        rowsMax={7}
      />
    </div>
  )

}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
