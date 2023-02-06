// REACT
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// THIRD PARTH
import { DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

// STATE
import { useAppSelector, useAppDispatch } from '@/state/hooks';
import {
    selectNodes,
    selectRootNode,
    addChild,
    selectLastAddedNode,
} from '@/state/reducers/chunksSlice';

// TYPES
import { isFolder } from '@/types/typeUtils';
import TreeItem from '@/types/TreeItem.type';
import Node from '@/types/Node.type';
import Folder from '@/types/Folder.type';
import Chunk from '@/types/Chunk.type';

// COMPONENTS
import TreeNodeItem from '@/components/TreeNodeItem';

function LeftSidebar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const nodes = useAppSelector(selectNodes);
    const rootNode = useAppSelector(selectRootNode);
    const lastAddedNode = useAppSelector(selectLastAddedNode);

    useEffect(() => {
        if (lastAddedNode) {
            const parents = findParents(nodes, lastAddedNode);
            parents.pop();

            const path = [
                'view/',
                ...parents.map((p) => p.slug).join('/'),
                lastAddedNode.id,
            ].join('/');

            navigate(path);
        }
    }, [lastAddedNode]);

    const findParents = (nodes: TreeItem, node: Node): Node[] => {
        for (const [key, n] of Object.entries(nodes)) {
            if (
                n &&
                isFolder(n) &&
                n.childIds &&
                n.childIds.indexOf(node.id) >= 0
            ) {
                return [n as Folder, ...findParents(nodes, n)];
            }
        }

        return [];
    };

    const onAddFolderClick = () => {
        const id = uuidv4();
        dispatch(
            addChild({
                id,
                name: 'New Node',
                active: false,
                editing: true,
                childIds: [],
                slug: id,
            } as Folder)
        );
    };

    const onAddChunkClick = () => {
        const id = uuidv4();
        const node = {
            id: id,
            name: 'New Node',
            active: false,
            editing: true,
            language: 'plaintext',
            slug: id,
            content: id,
        } as Chunk;

        dispatch(addChild(node));
    };

    return (
        <div className="drawer-side">
            <label
                htmlFor="left-sidebar-drawer"
                className="drawer-overlay"
            ></label>
            <div className="bg-base-200 w-80 p-5 h-full">
                <div className="flex flex-col bg-base-100 rounded-box p-2 h-full shadow-md">
                    <div className="mb-4">
                        <button
                            className="btn btn-primary btn-circle btn-sm p-1 mr-3"
                            onClick={onAddFolderClick}
                        >
                            <FolderPlusIcon />
                        </button>
                        <button
                            className="btn btn-primary btn-circle btn-sm p-1"
                            onClick={onAddChunkClick}
                        >
                            <DocumentPlusIcon />
                        </button>
                    </div>

                    <ul className="menu menu-vertical flex-1 ">
                        {rootNode.childIds.map((key: string) => {
                            return (
                                <TreeNodeItem
                                    node={nodes[key]}
                                    parentPath={'/view'}
                                    key={`top-${key}`}
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LeftSidebar;
