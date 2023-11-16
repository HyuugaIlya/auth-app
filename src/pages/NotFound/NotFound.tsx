import { ReactElement } from 'react'

export function NotFound(): ReactElement {
    return (
        <div className='container'>
            <div className='notfound'>
                <span>😕</span>
                <div className='text_b'>Sorry, but this Web Page doesn't exist </div>
            </div>
        </div>
    )
}
