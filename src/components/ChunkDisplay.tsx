// REACT
import { useRef, useEffect } from 'react';

// 3RD PARTY
import Editor from '@monaco-editor/react';

// STATE
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { selectById, updateChunk } from '@/features/chunksList/chunksSlice';
import { selectActiveChunkId } from '@/state/reducers/activeSlice';

// TYPES
import Chunk from '@/types/Chunk.type';

// UTILS
import configureMonaco from '@/monaco/configureMonaco';

// COMPONENTS
import ChunkToolbar from '@/components/ChunkToolbar';

export default function ChunkDisplay() {
    const dispatch = useAppDispatch();

    const chunkId = useAppSelector((state) => selectActiveChunkId(state));
    const chunk = useAppSelector((state) => selectById(state, chunkId || ''));

    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const prevChunk = useRef(chunk);

    let allowChangeEvent = true;

    const onEditorChange = (value: string | undefined) => {
        if (chunk && allowChangeEvent) {
            dispatch(
                updateChunk({
                    id: chunk.id,
                    changes: {
                        content: value || '',
                    },
                })
            );
        }
    };

    const updateEditorContent = (editorChunk: Chunk) => {
        if (editorChunk && editorRef.current && monacoRef.current) {
            const editor = editorRef.current as any;
            const monacoEditor = (monacoRef.current as any).editor as any;

            allowChangeEvent = false;

            if (editor.getModel()) {
                editor.getModel().setValue(editorChunk.content);
                monacoEditor.setModelLanguage(
                    editor.getModel(),
                    editorChunk.language
                );
            }

            allowChangeEvent = true;
        }
    };

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        updateEditorContent(chunk as Chunk);
    };

    useEffect(() => {
        // update the content if we've changed chunk, and it hasn't just changed with the content save
        if (
            !prevChunk.current ||
            (chunk && prevChunk.current.id !== chunk.id)
        ) {
            prevChunk.current = chunk;

            updateEditorContent(chunk as Chunk);
        }
    }, [chunk]);

    useEffect(() => {
        if (chunk) {
            updateEditorContent(chunk as Chunk);
        }
    }, [(chunk as Chunk)?.language]);

    return (
        <div className="h-full flex flex-col flex-1 pb-5 px-6 overflow-hidden">
            {chunk && (
                <>
                    <ChunkToolbar chunk={chunk} />
                    <Editor
                        theme="chunks-dark"
                        defaultLanguage={
                            chunk && chunk.language && chunk.language
                                ? chunk.language
                                : 'plaintext'
                        }
                        options={{
                            fontSize: 18,
                            minimap: { enabled: false },
                        }}
                        onChange={onEditorChange}
                        onMount={handleEditorDidMount}
                        beforeMount={configureMonaco}
                    />
                </>
            )}
        </div>
    );
}
