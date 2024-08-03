import { IonIcon } from '@ionic/react'
import { sadOutline } from 'ionicons/icons'
import React from 'react'

interface erroMsgType { message?: string }
const ErrorMessage: React.FC<erroMsgType> = ({ message }) => {
  return (
    <div className='w-full flex justify-center items-center flex-col gap-4'>
      <IonIcon icon={sadOutline} color='danger' style={{fontSize: '64px'}} />
      <div className='flex flex-col gap-0 items-center'>
        <p className='text-xs text-red-400'>unknown error appeared</p>
        {
          message && <p className='text-xs text-red-400'>{message}</p>
        }
      </div>
    </div>
  )
}

export default ErrorMessage