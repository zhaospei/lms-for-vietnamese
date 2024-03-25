import React from 'react'
import { BRICES_FONT, MAIN_FONT } from '@/styles/fonts';


export default function TitleWithFont({
    title,
    className,
}: any) {
    return (
        <div className={className}>
            <p className={MAIN_FONT.className}> {title} </p>
        </div>
    )
}
