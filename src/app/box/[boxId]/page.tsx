import React from 'react'


interface Props {
    params: {
        boxId: string | undefined
    }
}
export default function page({ params }: Props) {
    return (
        <div>{params.boxId}</div>
    )
}

