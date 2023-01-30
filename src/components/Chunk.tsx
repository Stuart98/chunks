import { PathMatch, useLocation } from 'react-router-dom';

import ChunkType from "../types/ChunkType";

import { findChunk } from '../data';

interface ChunkProps {
    chunk: ChunkType;
};

export default function Chunk() {

    let loc = useLocation();
    
    const params = loc.pathname.replace(/^(\/view\/)/, '');
    const chunk = findChunk(params.split('/').pop() as string) as ChunkType;

    return (
        <div className="">
            {chunk.item !== null && chunk.item.content}
        </div>
    );
}