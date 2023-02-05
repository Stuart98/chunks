import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../state/hooks';

import { isChunk } from "../types/typeUtils";
import Chunk from "../types/Chunk.type";
import Node from "../types/Node.type";
import { selectNodeBySlug, updateNode } from './../state/reducers/chunksSlice';

import Editor, { useMonaco } from "@monaco-editor/react";
import ChunkToolbar from './ChunkToolbar';

export default function ChunkDisplay() {
    const dispatch = useAppDispatch();
    const loc = useLocation();

    const params = loc.pathname.replace(/^(\/view\/)/, '');
    const spl = params.split('/');
    const slug = spl.pop() || '';
    const chunk: Chunk | null = useAppSelector(selectNodeBySlug)(slug) as Chunk;

    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const prevChunk = useRef(chunk);

    let allowChangeEvent = true;

    const onEditorChange = (value: string | undefined) => {
        if (chunk && allowChangeEvent) {
            dispatch(updateNode({
                ...chunk,
                content: value || '',
            }));
        }
    }

    const updateEditorContent = (chunk: Chunk) => {
        if (chunk && isChunk(chunk) && editorRef.current && monacoRef.current) {
            const editor = (editorRef.current as any);
            const monacoEditor = ((monacoRef.current as any).editor as any);

            allowChangeEvent = false;

            if (editor.getModel()) {
                editor.getModel().setValue(chunk.content);
                monacoEditor.setModelLanguage(editor.getModel(), chunk.language);
            }

            allowChangeEvent = true;
        }
    }

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor; 
        monacoRef.current = monaco; 

        updateEditorContent(chunk as Chunk);
    }

    useEffect(function() {
        // update the content if we've changed chunk, and it hasn't just changed with the content save
        if (!prevChunk.current || prevChunk.current.id !== chunk.id) {
            prevChunk.current = chunk;

            updateEditorContent(chunk as Chunk);
        }
    }, [chunk]);

    return (
        <div className="flex flex-col flex-1 pb-5 px-6 overflow-hidden">
            
            {
                chunk && isChunk(chunk) &&
                <>
                    <ChunkToolbar chunk={chunk} />
                    <Editor
                        //key={chunk.id}
                        theme="vs-dark"
                        defaultLanguage={chunk && chunk.language && chunk.language ? chunk.language : 'plaintext'}
                        options={({
                            fontSize: 18,
                            minimap: { enabled: false }
                        })}
                        onChange={onEditorChange}
                        onMount={handleEditorDidMount}
                    />
                </>
            }
        </div>
    );
}