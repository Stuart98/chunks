// REACT
import { useState } from 'react';
import {
  DocumentDuplicateIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

// STATE
import { useAppDispatch } from '@/state/hooks';
import { updateNode } from '@/state/reducers/chunksSlice';

// TYPES
import Chunk from '@/types/Chunk.type';

interface ChunkToolbarProps {
    chunk: Chunk;
}

function ChunkToolbar({ chunk }: ChunkToolbarProps) {
  const dispatch = useAppDispatch();

  const [copied, setCopied] = useState<boolean>(false);
  const [copiedTooltip, setCopiedTooltip] = useState<boolean>(false);

  const languages: { name: string; value: string }[] = [
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
  ];

  const getCurrentLanguage = (value: string) => {
    const lang = languages.find((l) => l.value === value);

    return lang ? lang.name : 'Plain Text';
  };

  const onLanguageChange = (value: string) => () => {
    if (chunk) {
      dispatch(
        updateNode({
          ...chunk,
          language: value,
        }),
      );

      const elem = document.activeElement;
      if (elem) {
        (elem as HTMLElement).blur();
      }
    }
  };

  const onCopyClick = () => {
    navigator.clipboard.writeText(chunk.content);

    setCopied(true);

    setTimeout(() => {
      setCopiedTooltip(true);
    }, 125);

    setTimeout(() => {
      setCopiedTooltip(false);
    }, 1125);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  /*
    eslint-disable
    jsx-a11y/no-noninteractive-tabindex, jsx-a11y/label-has-associated-control
  */
  return (
    <div className="flex flex-row items-center mb-2">
      {chunk && (
        <>
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              {getCurrentLanguage(chunk ? chunk.language : '')}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {languages.map((l) => (
                <li key={l.value} className={chunk.language}>
                  <button
                    type="button"
                    onClick={onLanguageChange(l.value)}
                  >
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1" />

          <div
            className={[
              'tooltip-left',
              'tooltip-primary',
              copiedTooltip ? 'tooltip-open tooltip' : '',
            ].join(' ')}
            data-tip="Copied!"
          >
            <button
              type="button"
              className="btn btn-primary swap swap-rotate"
              onClick={onCopyClick}
            >
              <input checked={copied} type="checkbox" readOnly />
              <CheckBadgeIcon className="swap-on w-7" />
              <DocumentDuplicateIcon className="swap-off w-7" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChunkToolbar;
