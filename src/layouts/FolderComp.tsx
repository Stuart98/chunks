import { useSelector
} from "react-redux";

import { selectAll } from "@/state/reducers/foldersSlice";

function FolderComp() {
    
    const folders = useSelector(selectAll);

    console.log(folders)
    return (
        <div>test</div>
    );
}

export default FolderComp;