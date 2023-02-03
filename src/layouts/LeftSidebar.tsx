import { redirect } from 'react-router-dom';

import TreeNodeItem from '../components/TreeNodeItem';
import { DocumentPlusIcon, FolderPlusIcon } from '@heroicons/react/24/outline'

import { v4 as uuidv4 } from 'uuid';

import Folder from '../types/Folder.type';
import Chunk from '../types/Chunk.type';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { selectNodes, selectRootNode, addChild, selectNodeByActive } from './../state/reducers/chunksSlice';

function LeftSidebar() {
    const dispatch = useAppDispatch();
    const nodes = useAppSelector(selectNodes);
    const rootNode = useAppSelector(selectRootNode);

    const onAddFolderClick = () => {
        const id = uuidv4();
        dispatch(addChild({
            id,
            name: 'New Node',
            active: false,
            childIds: [],
            slug: id,
        } as Folder));
    };

    const onAddChunkClick = () => {
        const id = uuidv4();
        dispatch(addChild({
            id: id,
            name: 'New Node',
            active: false,
            slug: id,
            content: id,
        } as Chunk));
    };

    return(
        <div className="drawer-side">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <div className='bg-base-200 w-80 p-5 h-full'>
                <div className='flex flex-col bg-base-100 rounded-box p-2 h-full shadow-md'>
                    <div className='mb-4'>
                        <button className="btn btn-primary btn-circle btn-sm p-1 mr-3" onClick={onAddFolderClick}>
                            <FolderPlusIcon />
                        </button>
                        <button className="btn btn-primary btn-circle btn-sm p-1" onClick={onAddChunkClick}>
                            <DocumentPlusIcon />
                        </button>
                    </div>
                
                    <ul className="menu menu-vertical flex-1 ">
                        {
                            rootNode.childIds.map((key: string) => {
                                return (
                                    <TreeNodeItem node={nodes[key]} parentPath={'/view'} key={`top-${key}`} />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar