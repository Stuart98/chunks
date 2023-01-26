import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'

import FolderType from '../types/FolderType';

import FolderItem from '../components/FolderItem';

const folders = [
    {
        id: 1,
        name: 'Projects',
        slug: 'projects',
        children: [
            {
                id: 2,
                name: 'Project 1',
                slug: 'project-1',
                children: [
                    {
                        id: 9,
                        name: 'Project 1.1',
                        slug: 'project-1-1',
                    },
                    {
                        id: 10,
                        name: 'Project 1.2',
                        slug: 'project-1-2',
                    },
                ],
            },
            {
                id: 3,
                name: 'Project 2',
                slug: 'project-2',
            },
            {
                id: 4,
                name: 'Project 3',
                slug: 'project-3',
            },
        ],
    },
    {
        id: 5,
        name: 'Inbox',
        slug: 'inbox',
        children: [
            {
                id: 6,
                name: 'Inbox 1',
                slug: 'inbox-1',
            },
            {
                id: 7,
                name: 'Inbox 2',
                slug: 'inbox-2',
            },
            {
                id: 8,
                name: 'Inbox 3',
                slug: 'inbox-3',
            },

        ],
    },
] as FolderType[];

function LeftSidebar(){

    return(
        <div className="drawer-side bg-base-200 p-5">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <ul className="menu menu-vertical bg-base-100 rounded-box p-2 w-80 shadow-md">
                <li className="menu-title mb-2 font-semibold text-xl">
                    <span>Chunks</span>
                </li>
                
                {
                    folders.map((folder, k) => {
                        return (
                            <FolderItem folder={folder} parentPath={'/app'} key={k} />
                        )
                    })
                }


            </ul>
        </div>
    )
}

export default LeftSidebar