import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPopover, IonRadio, IonRadioGroup } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { ellipsisHorizontal } from 'ionicons/icons'

interface SelectType { defaultValue: string, options: string[], labelHeader?: string, onChange: (value: any) => void }

const Select: React.FC<SelectType> = ({ defaultValue, options, labelHeader, onChange }) => {
    const [value, setvalue] = useState(defaultValue);
    useEffect(() => { onChange(value) }, [value])

    return (
        <>
            <IonButton id='select-popover' fill='clear' color={'dark'}>
                <IonIcon icon={ellipsisHorizontal} slot='icon-only' />
            </IonButton>
            <IonPopover trigger='select-popover' dismissOnSelect={true}>
                <IonContent>
                    <IonRadioGroup value={value} onIonChange={e => setvalue(e.detail.value)}>
                        <IonList>
                            <IonListHeader>
                                <IonLabel className='capitalize'>
                                    {labelHeader || 'pilih salah satu'}
                                </IonLabel>
                            </IonListHeader>
                            {
                                options.map(option => (
                                    <IonItem key={option}>
                                        <IonRadio value={option} className='capitalize'>{option}</IonRadio>
                                    </IonItem>
                                ))
                            }
                        </IonList>
                    </IonRadioGroup>
                </IonContent>
            </IonPopover>
        </>
    )
}

export default Select