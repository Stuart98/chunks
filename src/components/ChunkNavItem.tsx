import Chunk from "../types/Chunk.type";

import { NavLink } from 'react-router-dom'

interface FolderItemProps {
    chunk: Chunk;
    parentPath: string;
}

function ChunkNavItem({ chunk, parentPath }: FolderItemProps) {

    const currentFolderPath = `${parentPath}/${chunk.slug}`;

    return (
        <>
            <li className="">
                {chunk.children && chunk.children.length > 0 && <span className="py-1">{chunk.name}</span>}
                {!chunk.children && <NavLink className="py-1" to={currentFolderPath}>
                    {chunk.name}
                </NavLink>}
            </li>
            {
                chunk.children && (
                    <ul className="rounded-box bg-base-100 pl-4">
                        {
                            chunk.children.map((childFolder, k) => {
                                return (
                                    <ChunkNavItem chunk={childFolder} parentPath={currentFolderPath} key={k} />
                                )
                            })
                        }
                    </ul>
                )
            }
        </>
    );
};

export default ChunkNavItem;