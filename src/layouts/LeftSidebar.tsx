import TreeNodeItem from '../components/TreeNodeItem';

import Folder from '../types/Folder.type';
import { useAppSelector, useAppDispatch } from '../state/hooks';
import { selectChunks, add } from './../state/reducers/chunksSlice';

import { data } from '../data';

function LeftSidebar() {
    const dispatch = useAppDispatch();
    const nodes = useAppSelector(selectChunks)

    const onAddClick = () => {
        dispatch(add({
            id: 99,
            name: 'New Node',
            active: false,
            parentId: null,
            children: [],
            slug: 'new-node'
        } as Folder));
    };

    return(
        <div className="drawer-side">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <div className='bg-base-200 w-80 p-5 h-full'>
                <div className='flex flex-col bg-base-100 rounded-box p-2 h-full shadow-md'>
                    <div className='mb-4'>
                        <button className="btn btn-circle btn-sm" onClick={onAddClick}>+</button>
                    </div>
                
                    <ul className="menu menu-vertical flex-1 ">                
                        {
                            nodes.map((node, k) => {
                                return (
                                    <TreeNodeItem node={node} parentPath={'/view'} key={k} />
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