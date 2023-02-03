import { PathMatch, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../state/hooks';

import { isFolder } from "../util/isFolder";
import Node from "../types/Node.type";
import Chunk from "../types/Chunk.type";
import Folder from "../types/Folder.type";
import { selectNodeBySlug } from './../state/reducers/chunksSlice';


export default function ChunkDisplay() {

    let loc = useLocation();

    const params = loc.pathname.replace(/^(\/view\/)/, '');
    const spl = params.split('/');
    const slug = spl.pop() || '';
    const chunk: Node | null = useAppSelector(selectNodeBySlug)(slug);

    return (
        <div className="">
            {chunk && !isFolder(chunk) && chunk !== null && chunk.content}
        </div>
    );
}