import ChunkDisplay from '@/components/ChunkDisplay';
import ChunkList from '@/components/ChunkList';

function ChunkLayout() {
    return (
        <div className="w-full flex flex-row">
            <div className="w-2/5 overflow-hidden bg-base-50">
                <ChunkList />
            </div>
            <div className="w-full">
                <ChunkDisplay />
            </div>
        </div>
    );
}

export default ChunkLayout;
