import { PathMatch, useLocation } from 'react-router-dom';

import Chunk from "../types/Chunk.type";

import { findChunk } from '../data';

interface ChunkProps {
    chunk: Chunk;
};

export default function ChunkDisplay() {

    let loc = useLocation();

    const params = loc.pathname.replace(/^(\/view\/)/, '');
    const chunk = findChunk(params.split('/').pop() as string) as Chunk;

    return (
        <div className="">
            {chunk.item !== null && chunk.item.content}
        </div>
    );
}