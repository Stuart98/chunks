import { NavLink } from 'react-router-dom';
import { DocumentIcon, DocumentPlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import { v4 as uuidv4 } from 'uuid';

import Chunk from '@/types/Chunk.type';

import { useAppSelector, useAppDispatch } from '@/state/hooks';
import type { RootState } from '@/state/store';
import {
    selectChunksByFolderId,
    addChunks,
    removeChunk,
} from '@/state/reducers/chunksSlice';
import { selectActiveFolderId } from '@/state/reducers/activeSlice';

function ChunkList() {
    const dispatch = useAppDispatch();
    const folderId = useAppSelector((state) => selectActiveFolderId(state));
    const chunks = useAppSelector((state: RootState) =>
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

    const onDeleteClick = (chunkId: string) => () => {
        dispatch(
            removeChunk(chunkId),
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
                                <li key={chunk.id} className="w-full flex flex-row">
                                    <NavLink
                                        className="flex flex-row flex-1 py-1 mr-2  rounded-lg truncate"
                                        to={`/view/${chunk.folderId}/${chunk.id}`}
                                    >
                                        <DocumentIcon className="shrink-0 w-5" />
                                        {chunk.name}
                                    </NavLink>
                                    <button
                                        type="button"
                                        className="p-2 w-8 rounded-full"
                                        onClick={onDeleteClick(chunk.id)}
                                    >
                                        <TrashIcon className="w-4" />
                                    </button>
                                </li>
                            )
                    )}
            </ul>
        </div>
    );
}

export default ChunkList;
