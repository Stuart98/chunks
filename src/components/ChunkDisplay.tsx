import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../state/hooks';

import { isChunk } from "../types/typeUtils";
import Chunk from "../types/Chunk.type";
import Node from "../types/Node.type";
import { selectNodeBySlug, updateNode } from './../state/reducers/chunksSlice';

import Editor, { useMonaco } from "@monaco-editor/react";

export default function ChunkDisplay() {
    const dispatch = useAppDispatch();
    const loc = useLocation();

    const editorRef = useRef(null);
    const monacoRef = useRef(null);

    const params = loc.pathname.replace(/^(\/view\/)/, '');
    const spl = params.split('/');
    const slug = spl.pop() || '';
    const chunk: Chunk | null = useAppSelector(selectNodeBySlug)(slug) as Chunk;

    let allowChangeEvent = true;

    let [languages, setLanguages] = useState<{ name: string, value: string }[]>([
        { name: 'Plain Text', value: 'plaintext' },
        { name: 'Markdown', value: 'markdown' },
        { name: 'JavaScript', value: 'javascript' },
        { name: 'TypeScript', value: 'typescript' },
        { name: 'JSON', value: 'json' },
        { name: 'HTML', value: 'html' },
        { name: 'CSS', value: 'css' },
        { name: 'SCSS', value: 'scss' },
        { name: 'Less', value: 'less' },
        { name: 'SQL', value: 'sql' },
    ]);

    const getCurrentLanguage = (value: string) => {
        const lang = languages.find((l) => l.value === value);

        return lang ? lang.name : 'Plain Text';
    };

    const onLanguageChange = (value: string) => () => {
        if (chunk) {
            dispatch(updateNode({
                ...chunk,
                language: value,
            }));

            const elem = document.activeElement;
            if(elem){
                elem?.blur();
            }
        }
    }

    const onEditorChange = (value: string | undefined) => {
        if (chunk && allowChangeEvent) {
            console.log('chunk', (chunk as Chunk).content, value)
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

            editor.getModel().setValue(chunk.content);
            monacoEditor.setModelLanguage(editor.getModel(), chunk.language);

            allowChangeEvent = true;
        }
    }

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor; 
        monacoRef.current = monaco; 

        updateEditorContent(chunk as Chunk);

        // setLanguages(monaco.languages.getLanguages().map((l: any) => l.id));
    }

    useEffect(() => {
        updateEditorContent(chunk as Chunk);
    }, [chunk]);

    return (
        <div className="flex-1 pb-5 px-6">
            <div className="dropdown mb-2">
                <label tabIndex={0} className="btn m-1">{getCurrentLanguage(chunk ? chunk.language : '')}</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    {
                        languages.map((l) => (
                            <li key={l.value} className={chunk.language}>
                                <a onClick={onLanguageChange(l.value)}>{l.name}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                chunk && isChunk(chunk) && chunk !== null &&
                <Editor
                    //key={chunk.id}
                    theme="vs-dark"
                    defaultLanguage={chunk.language}
                    onChange={onEditorChange}
                    onMount={handleEditorDidMount}
                />    
            }
        </div>
    );
}