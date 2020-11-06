
import PropTypes from 'prop-types';
import MEDitor, { commands, ICommand, TextState, TextApi } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import ReactMarkdown from 'react-markdown'
import { CssBaseline, TextField } from '@material-ui/core';
import css from './style.css';
import TextArea from '@uiw/react-md-editor/lib/cjs/components/TextArea';
import { useEffect, useState } from 'react';

const mkdStr = `# Markdown Editor for React

**Hello world!!!**

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container">
      <MEDitor
        value={value}
        onChange={setValue}
      />
      <MDEditor.Markdown source={value} />
    </div>
  );
}
\`\`\`
`;


function MarkdownEditor({ file, write }) {
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      setText(await file.text());
    })();
  }, [file]);

  const handleChange = (e) => {
    setText(e);
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
  // <MEDitor.Markdown  source={value} />
  // <ReactMarkdown>{value}</ReactMarkdown>
  // const [value, setValue] = React.useState(mkdStr);
  return (
    <div className={css.textEditor}>
      <div>
        <MEDitor
          commands={[]} preview="live" value={text} textareaProps={{
            rows: "30",
            cols: "70"
          }} onChange={handleChange} />
      </div>
    </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
