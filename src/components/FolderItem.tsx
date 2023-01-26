import FolderType from "../types/FolderType";

import { NavLink } from 'react-router-dom'

interface FolderItemProps {
    folder: FolderType;
    parentPath: string;
}

function FolderItem({ folder, parentPath }: FolderItemProps) {

    const currentFolderPath = `${parentPath}/${folder.slug}`;

    return (
        <>
            <li className="">
                {folder.children && folder.children.length > 0 && <span>{folder.name}</span>}
                {!folder.children && <NavLink to={currentFolderPath}>
                    {folder.name}
                </NavLink>}
            </li>
            {
                folder.children && (
                    <ul className="rounded-box bg-base-100 p-2">
                        {
                            folder.children.map((childFolder, k) => {
                                return (
                                    <FolderItem folder={childFolder} parentPath={currentFolderPath} key={k} />
                                )
                            })
                        }
                    </ul>
                )
            }
        </>
    );
};

export default FolderItem;