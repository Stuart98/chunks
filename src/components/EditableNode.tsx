// REACT
import React, { useState } from 'react';

// STATE

// TYPES
import Node from '@/types/Node.type';

interface EditableNodeProps {
    node: Node;
    onEditComplete: Function;
}

function EditableNode({ node, onEditComplete }: EditableNodeProps) {

  const [nameEditValue, setNameEditValue] = useState(node.name);

  const onEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameEditValue(e.target.value);
  };

  const onEditKeyup = (e: React.KeyboardEvent<object>) => {
    if (['Enter', 'NumpadEnter'].includes(e.key)) {
      (e.target as HTMLElement).blur();
    }
  };

  const onEditBlur = () => {
    onEditComplete && onEditComplete(nameEditValue);
  };

  /* eslint-disable react/jsx-no-useless-fragment, jsx-a11y/no-autofocus */
  return (
    <>
      {!node.editing ? (
        <span className="truncate">{node.name}</span>
      ) : (
        <input
          className="block flex-1 py-0 px-2 rounded-lg w-1 bg-transparent"
          autoFocus
          type="text"
          value={nameEditValue}
          onChange={onEditChange}
          onBlur={onEditBlur}
          onKeyUp={onEditKeyup}
        />
      )}
    </>
  );
}

export default EditableNode;
