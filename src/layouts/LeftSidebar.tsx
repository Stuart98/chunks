// REACT
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// THIRD PARTH
import { DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

// STATE
import { useAppSelector, useAppDispatch } from '@/state/hooks';
import { addChild } from '@/state/reducers/xchunksSlice';

import {
    selectAll,
    selectById,
    addFolder,
} from '@/state/reducers/foldersSlice';
import { addChunks } from '@/state/reducers/chunksSlice';

// TYPES
import { isFolder } from '@/types/typeUtils';
import TreeItem from '@/types/TreeItem.type';
import Node from '@/types/Node.type';
import Folder from '@/types/Folder.type';
import Chunk from '@/types/Chunk.type';

// COMPONENTS
import TreeNodeItem from '@/components/TreeNodeItem';
import FolderComp from './FolderComp';

import { RootState } from '@/state/store';

import data from '@/data/index';

const findParents = (nodes: TreeItem, node: Node): Node[] => {
    /* eslint-disable no-restricted-syntax */
    for (const [, n] of Object.entries(nodes)) {
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
    /* eslint-enable no-restricted-syntax */
};

function LeftSidebar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const nodes = useAppSelector(selectAll);
    const rootNode: Folder | undefined = useAppSelector((state: RootState) =>
        selectById(state, 0)
    );
    //const lastAddedNode = useAppSelector(selectLastAddedNode);
    console.log(nodes);
    /*useEffect(() => {
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
  }, [lastAddedNode])*/

    const onAddFolderClick = () => {
        const id = uuidv4();
        dispatch(
            addFolder({
                id,
                name: 'New Node',
                parentId: null,
                active: false,
                editing: false,
                childIds: [],
                slug: id,
            } as Folder)
        );

        // add a dummy chunk
        const chunkId = uuidv4();
        dispatch(
            addChunks([
                {
                    id: chunkId,
                    folderId: id,
                    name: `My Chunk - ${chunkId}`,
                    slug: 'project-1-1',
                    editing: false,
                    content: 'project 1 content',
                } as Chunk,
            ])
        );
    };

    const onAddChunkClick = () => {
        const id = uuidv4();
        const node = {
            id,
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
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay" />
            <div className="bg-base-200 w-80 p-5 h-full">
                <div className="flex flex-col bg-base-100 rounded-box p-2 h-full shadow-md">
                    <div className="mb-4">
                        <button
                            type="button"
                            className="btn btn-primary btn-circle btn-sm p-1 mr-3"
                            onClick={onAddFolderClick}
                        >
                            <FolderPlusIcon className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary btn-circle btn-sm p-1"
                            onClick={onAddChunkClick}
                        >
                            <DocumentPlusIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <FolderComp />
                </div>
            </div>
        </div>
    );
}

export default LeftSidebar;
