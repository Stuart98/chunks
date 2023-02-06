// REACT
import { useState } from 'react'

// STATE
import { useAppDispatch } from '@/state/hooks';
import { completeEdit } from '@/state/reducers/chunksSlice';

// TYPES
import Node from '@/types/Node.type';
interface EditableNodeProps {
    node: Node;
}

function EditableNode({ node }: EditableNodeProps ) {
    const dispatch = useAppDispatch();

    const [nameEditValue, setNameEditValue] = useState(node.name);

    const onEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameEditValue(e.target.value);
    }

    const onEditKeyup = (e: React.KeyboardEvent<object>) => {
        if (['Enter', 'NumpadEnter'].includes(e.key)) {
            (e.target as HTMLElement).blur();
        }
    }

    const onEditBlur = () => {
        dispatch(completeEdit({
            id: node.id,
            value: nameEditValue
        }));
    };

    return (
        <>
            {
                !node.editing ? 
                    <span className="truncate">{node.name}</span> :
                    <input className="block flex-1 py-0 px-2 rounded-lg w-1 bg-transparent" autoFocus type="text" value={nameEditValue} onChange={onEditChange} onBlur={onEditBlur} onKeyUp={onEditKeyup} />
            }
        </>
    );
}

export default EditableNode;