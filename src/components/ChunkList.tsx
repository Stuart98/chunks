import { NavLink } from 'react-router-dom';
import { DocumentIcon, DocumentPlusIcon } from '@heroicons/react/24/outline';

import { v4 as uuidv4 } from 'uuid';

import Chunk from '@/types/Chunk.type';

import { useAppSelector, useAppDispatch } from '@/state/hooks';
import {
    selectChunksByFolderId,
    addChunks,
} from '@/state/reducers/chunksSlice';
import { selectActiveFolderId } from '@/state/reducers/activeSlice';

function ChunkList() {
    const dispatch = useAppDispatch();
    const folderId: string = useAppSelector((state) =>
        selectActiveFolderId(state.active)
    );
    const chunks = useAppSelector((state) =>
        selectChunksByFolderId(state, folderId)
    );

    const onAddChunkClick = () => {
        const chunkId = uuidv4();
        dispatch(
            addChunks([
                {
                    id: chunkId,
                    folderId,
                    name: `My Chunk - ${chunkId}`,
                    slug: 'project-1-1',
                    editing: false,
                    content: 'project 1 content',
                } as Chunk,
            ])
        );
    };

    return (
        <div>
            <div>
                <button
                    type="button"
                    className="btn btn-primary btn-circle btn-sm p-1"
                    onClick={onAddChunkClick}
                >
                    <DocumentPlusIcon className="w-5 h-5" />
                </button>
            </div>
            <ul className="menu menu-vertical">
                {chunks &&
                    chunks.map(
                        (chunk: Chunk | undefined) =>
                            chunk && (
                                <li key={chunk.id}>
                                    <NavLink
                                        className="flex flex-row flex-1 py-1 rounded-lg truncate"
                                        to={`/view/${chunk.folderId}/${chunk.id}`}
                                    >
                                        <DocumentIcon className="shrink-0 w-5" />
                                        {chunk.name}
                                    </NavLink>
                                </li>
                            )
                    )}
            </ul>
        </div>
    );
}

export default ChunkList;
