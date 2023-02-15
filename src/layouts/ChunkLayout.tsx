import ChunkDisplay from '@/components/ChunkDisplay';
import ChunkList from '@/components/ChunkList';
import { getChunkFromRoute, getFolderFromRoute } from '@/util/route';

function ChunkLayout() {
    const folder = getFolderFromRoute();
    const chunk = getChunkFromRoute();

    return (
        <div className="w-full flex flex-row">
            <div className="w-2/5 overflow-hidden bg-base-50">
                {folder && <ChunkList folderId={folder.id} />}
            </div>
            <div className="w-full">
                <ChunkDisplay />
            </div>
        </div>
    );
}

export default ChunkLayout;
