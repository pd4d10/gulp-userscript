import stream from 'stream';

declare namespace gulpUserscript {
  interface Header {
    name: string;
    namespace?: string;
    version?: string;
    author?: string;
    description?: string;
    homepage?: string;
    homepageURL?: string;
    website?: string;
    source?: string;
    icon?: string;
    iconURL?: string;
    defaulticon?: string;
    icon64?: string;
    icon64URL?: string;
    updateURL?: string;
    downloadURL?: string;
    supportURL?: string;
    include?: string | string[];
    match?: string | string[];
    exclude?: string | string[];
    require?: string | string[];
    resource?: string | string[];
    connect?: string | string[];
    'run-at'?: 'document-start' | 'document-body' | 'document-end' | 'document-idle' | 'context-menu';
    grant?: string | string[];
    nocompat?: string;
  }
}

declare function gulpUserscript(opt: gulpUserscript.Header): stream.Transform;

export = gulpUserscript;