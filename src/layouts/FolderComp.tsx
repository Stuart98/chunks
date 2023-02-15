import { useSelector
} from "react-redux";

import { selectFolderByParentId } from "@/state/reducers/foldersSlice";



import Folder from "@/types/Folder.type";

import TreeNodeItem from '@/components/TreeNodeItem';


function FolderComp() {
    const folders = useSelector(state => selectFolderByParentId(state, null));

    return (
        <>
        <ul className="menu menu-vertical flex-1 ">
            {folders && folders.map((folder: Folder) => (
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

export default FolderComp;