import { IonHeader, IonImg, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'

const MainHeader: React.FC = () => {
    return (
        <IonHeader id='header' className='shadow-none border-b border-gray-400 dark:border-gray-700 lg:hidden'>
            <IonToolbar>
                <IonTitle className='h-[8vh]'>
                    <div className='w-full h-full flex justify-center items-center gap-4 flex-row'>
                        <IonImg src='/logo.png' className='w-14' />
                        <span className='font-extrabold text-2xl mt-1 flex flex-col justify-start items-start'>
                            <span>{`SMK CSK`}</span>
                            <span className='text-[0.5rem] -mt-3'>SMK Cendekia Sungai karang</span>
                        </span>
                    </div>
                </IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default MainHeader