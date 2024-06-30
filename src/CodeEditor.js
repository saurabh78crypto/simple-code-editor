import React, { useState, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // You can choose other themes available in PrismJS
import { Highlight } from 'prism-react-renderer';
import './CodeEditor.css';

const customTheme = {
  plain: {
    color: '#000000',
    backgroundColor: '#f5f5f5',
  },
  styles: [
    {
      types: ['keyword'],
      style: {
        color: '#d73a49',
        fontWeight: 'bold',
      },
    },
    {
      types: ['string', 'inserted'],
      style: {
        color: '#032f62',
      },
    },
    {
      types: ['function'],
      style: {
        color: '#6f42c1',
      },
    },
    {
      types: ['operator'],
      style: {
        color: '#d73a49',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#6a737d',
        fontStyle: 'italic',
      },
    },
  ],
};

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const textareaRef = useRef(null);
  const preRef = useRef(null);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleScroll = (e) => {
    preRef.current.scrollTop = e.target.scrollTop;
    preRef.current.scrollLeft = e.target.scrollLeft;
  };

  return (
    <div className="code-editor-container">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleCodeChange}
        onScroll={handleScroll}
        className="code-editor-textarea"
        spellCheck="false"
      />
      <Highlight code={code} language="javascript" theme={customTheme} Prism={Prism}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            ref={preRef}
            className={`${className} code-editor-pre`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeEditor;
