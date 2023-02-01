import { PathMatch, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../state/hooks';

import { isFolder } from "../util/treeUtils";
import Chunk from "../types/Chunk.type";
import Folder from "../types/Folder.type";
import { selectNode } from './../state/reducers/chunksSlice';


export default function ChunkDisplay() {

    let loc = useLocation();

    const params = loc.pathname.replace(/^(\/view\/)/, '');
    const spl = params.split('/');
    const slug = spl.pop();
    const chunk: Chunk | Folder | false = useAppSelector(selectNode)('slug', slug);

    return (
        <div className="">
            {chunk && !isFolder(chunk) && chunk !== null && chunk.content}
        </div>
    );
}