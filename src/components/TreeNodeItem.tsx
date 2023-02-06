// REACT
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FolderOpenIcon,
  DocumentIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

// STATE
import { useAppSelector, useAppDispatch } from '@/state/hooks';
import {
  selectNodeById,
  makeActive,
  removeNode,
  startEdit,
} from '@/state/reducers/chunksSlice';

// TYPES
import { isFolder } from '@/types/typeUtils';
import Node from '@/types/Node.type';

// COMPONENTS
import EditableNode from '@/components/EditableNode';

interface TreeNodeItemProps {
    node: Node;
    parentPath: string;
}

function TreeNodeItem({ node, parentPath }: TreeNodeItemProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const doSelectNodeById = useAppSelector(selectNodeById);
  const currentFolderPath = `${parentPath}/${node.slug}`;

  const onFolderClick = () => {
    if (isFolder(node)) {
      dispatch(makeActive(node));
    }
  };

  const onDeleteClick = () => {
    navigate(parentPath);

    dispatch(removeNode(node.id));
  };

  const onDoubleClick = () => {
    dispatch(startEdit(node.id));
  };

  return (
    <>
      <li className="w-full flex flex-row" onDoubleClick={onDoubleClick}>
        {isFolder(node) && (
        <button
          type="button"
          className={[
            'flex-1',
            'py-1',
            'rounded-lg',
            'truncate',
            node.active ? 'bg-base-content/10' : '',
          ].join(' ')}
          onClick={onFolderClick}
        >
          <FolderOpenIcon className="shrink-0 w-5" />
          <EditableNode node={node} />
        </button>
        )}
        {!isFolder(node) && (
        <NavLink
          className="flex flex-row flex-1 py-1 rounded-lg truncate"
          to={currentFolderPath}
        >
          <DocumentIcon className="shrink-0 w-5" />
          <EditableNode node={node} />
        </NavLink>
        )}
        <button
          type="button"
          className="p-2 w-8 rounded-full"
          onClick={onDeleteClick}
        >
          <TrashIcon className="w-4" />
        </button>
      </li>
      {isFolder(node) && node.childIds && (
        <ul className="w-full rounded-box bg-base-100 pl-4">
          {node.childIds.map((id: string) => {
            const childNode = doSelectNodeById(id);
            return childNode ? (
              <TreeNodeItem
                node={childNode}
                parentPath={currentFolderPath}
                key={id}
              />
            ) : null;
          })}
        </ul>
      )}
    </>
  );
}

export default TreeNodeItem;
