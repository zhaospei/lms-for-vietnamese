import React from 'react'
import { BRICES_FONT } from '@/styles/fonts';


export default function TitleWithFont({
    title,
    className,
}: any) {
    return (
        <div className={className}>
            <p className={BRICES_FONT.className}> {title} </p>
        </div>
    )
}
