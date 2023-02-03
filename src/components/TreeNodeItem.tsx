import Node from "../types/Node.type";

import { FolderOpenIcon, DocumentIcon, TrashIcon } from '@heroicons/react/24/outline'

import { useAppSelector, useAppDispatch } from '../state/hooks';
import { selectNodeById, makeActive, removeNode, startEdit, completeEdit } from './../state/reducers/chunksSlice';

import { isFolder } from "../util/isFolder";

import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'

interface TreeNodeItemProps {
    node: Node;
    parentPath: string;
}

function TreeNodeItem({ node, parentPath }: TreeNodeItemProps) {

    const doSelectNodeById = useAppSelector(selectNodeById);
    const currentFolderPath = `${parentPath}/${node.slug}`;
    const dispatch = useAppDispatch();
    
    const editRef = useRef(null);
    const [nameEditValue, setNameEditValue] = useState(node.name);

    const onFolderClick = () => {
        if (isFolder(node)) {
            dispatch(makeActive(node));
        }
    }

    const onDeleteClick = () => {
        dispatch(removeNode(node.id));
    }

    const onDoubleClick = () => {
        dispatch(startEdit(node.id));
    }

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
            <li className="w-full flex flex-row" onDoubleClick={onDoubleClick}>

                            {
                                isFolder(node) &&
                                <button className={['flex-1', 'py-1', 'rounded-lg', 'truncate', (node.active ? 'bg-gray-200' : '')].join(' ')} onClick={onFolderClick}>
                                    <FolderOpenIcon className="shrink-0 w-5" />
                                    {
                                        !node.editing ? 
                                            <span className="truncate">{node.name}</span> :
                                            <input className="block flex-1 py-0 px-2 rounded-lg w-1 bg-transparent" autoFocus type="text" value={nameEditValue} onChange={onEditChange} onBlur={onEditBlur} onKeyUp={onEditKeyup} />
                                    }
                                </button>
                            }
                            {
                                !isFolder(node) &&
                                <NavLink className="flex flex-row flex-1 py-1 rounded-lg truncate" to={currentFolderPath}>
                                    <DocumentIcon className="shrink-0 w-5" />
                                    {
                                        !node.editing ? 
                                            <span className="truncate">{node.name}</span> :
                                            <input className="block flex-1 py-0 px-2 rounded-lg w-1 bg-transparent" autoFocus type="text" value={nameEditValue} onChange={onEditChange} onBlur={onEditBlur} onKeyUp={onEditKeyup} />
                                    }
                                </NavLink>
                            }
                            <button className="p-2 w-8 rounded-full" onClick={onDeleteClick}>
                                <TrashIcon className="w-4" />
                            </button>
            </li>
            {
                isFolder(node) && node.childIds && (
                    <ul className="w-full rounded-box bg-base-100 pl-4">
                        {
                            node.childIds.map((id: string) => {
                                const childNode = doSelectNodeById(id)
                                return childNode ? (
                                    <TreeNodeItem node={childNode} parentPath={currentFolderPath} key={id} />
                                ) : null;
                            })
                        }
                    </ul>
                )
            }
        </>
    );
};

export default TreeNodeItem;