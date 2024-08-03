import { IonContent, IonPage, useIonRouter } from '@ionic/react'   
import React, { ReactNode, useEffect } from 'react'
interface LayoutType { children: ReactNode, header?: JSX.Element, title?: string }

const SecondLayout: React.FC<LayoutType> = ({ children, header, title = 'Page' }) => {
    
    return (
        <IonPage>
            {header}
            <IonContent fullscreen>
                <div className='w-full p-5 flex justify-start items-start flex-col gap-6 relative pt-28'>
                    {children}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default SecondLayout