import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'

import ChunkType from '../types/ChunkType';

import ChunkNavItem from '../components/ChunkNavItem';

import { data } from '../data';

function LeftSidebar(){

    return(
        <div className="drawer-side bg-base-200 p-5">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <ul className="menu menu-vertical bg-base-100 rounded-box p-2 w-80 shadow-md">                
                {
                    data.map((chunk, k) => {
                        return (
                            <ChunkNavItem chunk={chunk} parentPath={'/view'} key={k} />
                        )
                    })
                }


            </ul>
        </div>
    )
}

export default LeftSidebar