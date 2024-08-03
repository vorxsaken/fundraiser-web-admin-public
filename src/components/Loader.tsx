import { IonSpinner } from '@ionic/react'
import React from 'react'

const Loader: React.FC = () => {
    return (
        <div className='w-full flex justify-center'>
            <IonSpinner name='dots' className='scale-150' />
        </div>
    )
}

export default Loader