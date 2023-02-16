import ChunkDisplay from '@/components/ChunkDisplay';
import ChunkList from '@/components/ChunkList';

function ChunkLayout() {
    return (
        <div className="w-full flex flex-row">
            <div className="w-2/5 overflow-hidden p-2 bg-base-50">
                <ChunkList />
            </div>
            <div className="w-full p-2">
                <ChunkDisplay />
            </div>
        </div>
    );
}

export default ChunkLayout;
