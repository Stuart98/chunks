// REACT
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// THIRD PARTH
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { v4 as uuidv4 } from 'uuid';

// STATE
import { useAppDispatch } from '@/state/hooks';

import { addFolder } from '@/features/folders/foldersSlice';
import { addChunks } from '@/features/chunksList/chunksSlice';

// TYPES
import Folder from '@/types/Folder.type';
import Chunk from '@/types/Chunk.type';

// COMPONENTS
import FolderList from '@/features/folders/FolderList';

function LeftSidebar() {
    const dispatch = useAppDispatch();

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
                    </div>

                    <FolderList />
                </div>
            </div>
        </div>
    );
}

export default LeftSidebar;
