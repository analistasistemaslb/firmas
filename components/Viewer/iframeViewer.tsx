import React, { ReactElement, useState } from 'react'

interface Props {
    file: any,
    index: any,
}

export default function IframeViewer({ file, index }: Props): ReactElement{
    const refreshFileFrame = () => {
        // @ts-ignore
        const iframe : HTMLIFrameElement | null = document.getElementById(`file-frame-${index}`);
        // @ts-ignore
        iframe.src = iframe.src;
    }
    return  (
        <div className="tab-pane fade" id={`tabref-${index}`}
             role="tabpanel" aria-labelledby="home-tab">
            <button onClick={refreshFileFrame} className="btn btn-info btn-sm">Recargar archivo</button>
            <div dangerouslySetInnerHTML={{ __html: `<iframe id="file-frame-${index}" width="100%" allowfullscreen="allowfullscreen" height="360" src="https://docs.google.com/a/umd.edu/viewer?url=${file.path}&amp;embedded=true"/>`}} />
        </div>
    );
}