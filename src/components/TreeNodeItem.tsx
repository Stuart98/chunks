// REACT
import { NavLink, useNavigate } from 'react-router-dom';
import {
    FolderOpenIcon,
    DocumentIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
// STATE
import { useAppSelector, useAppDispatch } from '@/state/hooks';

// TYPES
import Folder from '@/types/Folder.type';

// COMPONENTS
import EditableNode from '@/components/EditableNode';
import {
    startEdit,
    completeEdit,
    removeFolder,
    selectFolderByParentId,
} from '@/state/reducers/foldersSlice';

interface TreeNodeItemProps {
    node: Folder;
    parentPath: string;
}

function TreeNodeItem({ node, parentPath }: TreeNodeItemProps) {
    const dispatch = useDispatch();

    const childrenNodes: Folder[] = useAppSelector((state) =>
        selectFolderByParentId(state, node.id)
    );
    const currentFolderPath = `${parentPath}/${node.id}`;

    const onDeleteClick = () => {
        dispatch(removeFolder(node.id));
    };

    const onDoubleClick = () => {
        dispatch(startEdit(node.id));
    };

    const onEditComplete = (value: string) => {
        dispatch(
            completeEdit({
                folderId: node.id,
                value,
            })
        );
    };

    return (
        <>
            <li className="w-full flex flex-row" onDoubleClick={onDoubleClick}>
                <NavLink
                    className="flex flex-row flex-1 py-1 mr-2 rounded-lg truncate"
                    to={currentFolderPath}
                >
                    <FolderOpenIcon className="shrink-0 w-5" />
                    <EditableNode node={node} onEditComplete={onEditComplete} />
                </NavLink>
                <button
                    type="button"
                    className="p-2 w-8 rounded-full"
                    onClick={onDeleteClick}
                >
                    <TrashIcon className="w-4" />
                </button>
            </li>
            {childrenNodes && (
                <ul className="w-full rounded-box bg-base-100 pl-4">
                    {childrenNodes.map((childFolder: Folder) => (
                        <TreeNodeItem
                            node={childFolder}
                            parentPath={currentFolderPath}
                            key={childFolder.id}
                        />
                    ))}
                </ul>
            )}
        </>
    );
}

export default TreeNodeItem;
