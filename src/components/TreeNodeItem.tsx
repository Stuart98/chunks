import Folder from "../types/Folder.type";
import Chunk from "../types/Chunk.type";

import { useAppDispatch } from '../state/hooks';
import { select } from './../state/reducers/chunksSlice';

import { isFolder } from "../util/treeUtils";

import { NavLink } from 'react-router-dom'

interface TreeNodeItemProps {
    node: Folder | Chunk;
    parentPath: string;
}

function TreeNodeItem({ node, parentPath }: TreeNodeItemProps) {

    const currentFolderPath = `${parentPath}/${node.slug}`;
    const dispatch = useAppDispatch();

    const onFolderClick = () => {
        if (isFolder(node)) {
            dispatch(select(node));
        }
    }

    return (
        <>
            <li>
                {isFolder(node) && node.children && <button className={['py-1', (node.active ? 'active' : '')].join(' ')} onClick={onFolderClick}>{node.name}</button>}
                {!isFolder(node) && <NavLink className="py-1" to={currentFolderPath}>
                    {node.name}
                </NavLink>}
            </li>
            {
                isFolder(node) && node.children && (
                    <ul className="rounded-box bg-base-100 pl-4">
                        {
                            node.children.map((childFolder, k) => {
                                return (
                                    <TreeNodeItem node={childFolder} parentPath={currentFolderPath} key={k} />
                                )
                            })
                        }
                    </ul>
                )
            }
        </>
    );
};

export default TreeNodeItem;