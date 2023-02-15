import ChunkDisplay from '@/components/ChunkDisplay';
import ChunkList from '@/components/ChunkList';
import { getChunkFromRoute, getFolderFromRoute } from '@/util/route';

function ChunkLayout() {

    const folder = getFolderFromRoute();
    const chunk = getChunkFromRoute();


  return (
    <div className="column-2">
      <div className="w-full">
        { folder && <ChunkList folderId={folder.id} /> }
      </div>
      <div className="w-full">
        <ChunkDisplay />
      </div>
    </div>
  );
}

export default ChunkLayout;
