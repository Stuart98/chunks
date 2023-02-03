import { useEffect } from 'react';
import { PathMatch, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../state/hooks';

import { isFolder } from "../util/isFolder";
import Node from "../types/Node.type";
import Chunk from "../types/Chunk.type";
import Folder from "../types/Folder.type";
import { selectNodeBySlug, updateNode } from './../state/reducers/chunksSlice';

import Editor, { useMonaco} from "@monaco-editor/react";

export default function ChunkDisplay() {
    const dispatch = useAppDispatch();
    let loc = useLocation();

    const params = loc.pathname.replace(/^(\/view\/)/, '');
    const spl = params.split('/');
    const slug = spl.pop() || '';
    const chunk: Node | null = useAppSelector(selectNodeBySlug)(slug);

    const onEditorChange = (value: string | undefined) => {
        if (chunk) {
            dispatch(updateNode({
                ...chunk,
                content: value || '',
            }));
        }
    }
    const monaco = useMonaco();
    useEffect(() => {
        // do conditional chaining
        
        // or make sure that it exists by other ways
        if (monaco) {
            //monaco.editor.setModelLanguage(monaco.editor.getModel() || monaco.editor.createModel(''), 'sql');
          console.log("here is the monaco instance:", monaco, monaco.languages.getLanguages());
        }
    }, [monaco]);

    return (
        <div className="flex-1">
            {
                chunk && !isFolder(chunk) && chunk !== null &&
                <Editor
                    key={chunk.id}
                    defaultLanguage={chunk.language}
                    value={chunk.content}
                    onChange={onEditorChange}
                />    
            }
        </div>
    );
}