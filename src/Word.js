import React from 'react';

const Word = ({ keyProp, valueProp, onRemove }) => {
  return (
    <li
      onClick={() => {
        onRemove(keyProp);
      }}
    >
      {valueProp}
    </li>
  );
};

export default Word;
