// https://github.com/brijeshb42/monaco-themes/blob/master/themes/Dracula.json
import chunksDarkTheme from '@/monaco/themes/chunks-dark.json';

export default (monaco: any) => {
    monaco.editor.defineTheme('chunks-dark', chunksDarkTheme);
    monaco.editor.setTheme('chunks-dark');
};
