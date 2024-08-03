import { IonAlert, IonToast } from '@ionic/react'
import { FC } from 'react'
interface AlertType {
    type?: 'modal' | 'toast'
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    message: string
}

export const Alert: FC<AlertType> = ({ isOpen, setIsOpen, message, type = 'toast' }) => {
    return (
        <>
            {type === 'toast' ? <IonToast
                message={message}
                isOpen={isOpen}
                buttons={[{ text: 'Tutup', role: 'cancel' }]}
                onDidDismiss={() => setIsOpen(false)}
                duration={3000}
                position="top"
                positionAnchor="header"

            /> : <IonAlert
                message={message}
                isOpen={isOpen}
                buttons={['Tutup']}
                onDidDismiss={() => setIsOpen(false)}
            />}
        </>
    )
}
