import { useSelector } from 'react-redux';

import { selectFolderByParentId } from '@/features/folders/foldersSlice';

import Folder from '@/types/Folder.type';

import TreeNodeItem from '@/components/TreeNodeItem';

function FolderList() {
    const folders = useSelector((state) => selectFolderByParentId(state, null));

    return (
        <>
            <ul className="menu menu-vertical flex-1 ">
                {folders &&
                    folders.map((folder: Folder) => (
                        <TreeNodeItem
                            node={folder}
                            parentPath="/view"
                            key={`top-${folder.id}`}
                        />
                    ))}
            </ul>
        </>
    );
}

export default FolderList;
