
type ChunkListProps = {
}

import Chunk from '@/types/Chunk.type';

import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { selectChunksByFolderId } from "@/state/reducers/chunksSlice";
import { selectActiveFolderId } from "@/state/reducers/activeSlice";

function ChunkList({}: ChunkListProps) {
    const dispatch = useAppDispatch();

    //dispatch(setAll(data));
    const folderId: string = useAppSelector((state) => selectActiveFolderId(state.active));
    const chunks: Chunk[] = useAppSelector((state) => selectChunksByFolderId(state, folderId)) || [];
    console.log(folderId, chunks)

    return (
        <ul>
            { chunks.map((c: Chunk) => <li key={c.id}>{ c.name }</li>) }
        </ul>
    );
}

export default ChunkList;
