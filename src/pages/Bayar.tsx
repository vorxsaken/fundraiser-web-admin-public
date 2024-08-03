import React from 'react'
import Layout from '../components/Layout'
import SecondaryHeader from '../components/SecondaryHeader'
import Card from '../components/Card'
import { RouteComponentProps } from 'react-router'
import { IonAccordion, IonAccordionGroup, IonButton, IonImg, IonItem, IonLabel, IonList, IonRadio, IonRadioGroup } from '@ionic/react'
interface BayarProps extends RouteComponentProps<{ id: any }> { }

const Bayar: React.FC<BayarProps> = ({ match }) => {
    
    return (
        <Layout header={<SecondaryHeader title='bayar' />}>
            <Card className='p-4'>
                <div className='flex flex-col font-bold text-lg'>
                    <span>Pilih Metode Pembayaran</span>
                    <span className='text-xs font-thin'>
                        Silahkan pilih metode pembayaran yang menurut anda paling mudah dilakukan
                    </span>
                </div>
            </Card>
            <Card className='p-1'>
                <div className='w-full'>
                    <IonAccordionGroup>
                        <IonRadioGroup>
                            <IonAccordion value="first">
                                <IonItem slot="header" color="light">
                                    <IonLabel>E Wallet</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    <IonList>
                                        <IonItem>
                                            <IonRadio value={'shopee-pay'}>
                                                <span className='hidden'>payment method</span>
                                                <IonImg src='/shopeepay.png' className='w-20' alt='shopee' />
                                            </IonRadio>
                                        </IonItem>
                                        <IonItem>
                                            <IonRadio value={'Dana'}>
                                                <span className='hidden'>payment method</span>
                                                <IonImg src='/dana.png' className='w-24' />
                                            </IonRadio>
                                        </IonItem>
                                        <IonItem>
                                            <IonRadio value={'qris'}>
                                                <span className='hidden'>payment method</span>
                                                <IonImg src='/qris.png' className='w-20' />
                                            </IonRadio>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>
                            <IonAccordion value="second">
                                <IonItem slot="header" color="light">
                                    <IonLabel>Bank Transfer</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    <IonList>
                                        <IonItem>
                                            <IonRadio value={'bri'}>
                                                <span className='hidden'>payment method</span>
                                                <IonImg src='/bri.png' className='w-28' />
                                            </IonRadio>
                                        </IonItem>
                                        <IonItem>
                                            <IonRadio value={'bni'}>
                                                <span className='hidden'>payment method</span>
                                                <IonImg src='/bni.png' className='w-20' />
                                            </IonRadio>
                                        </IonItem>
                                        <IonItem>
                                            <IonRadio value={'bca'}>
                                                <span className='hidden'>payment method</span>
                                                <IonImg src='/bca.png' className='w-20' />
                                            </IonRadio>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>
                            <IonAccordion value="third">
                                <IonItem slot="header" color="light">
                                    <IonLabel>Mini Market</IonLabel>
                                </IonItem>
                                <div className="ion-padding" slot="content">
                                    <IonList>
                                        <IonItem>
                                            <IonRadio value={'indomaret'}>
                                                <span className='hidden'>payment method</span>
                                                <IonImg src='/indomaret.png' className='w-20' />
                                            </IonRadio>
                                        </IonItem>
                                        <IonItem>
                                            <IonRadio value={'alfamart'}>
                                                <span className='hidden'>payment method</span>
                                                <IonImg src='/alfamart.png' className='w-20' />
                                            </IonRadio>
                                        </IonItem>
                                    </IonList>
                                </div>
                            </IonAccordion>
                        </IonRadioGroup>
                    </IonAccordionGroup>
                </div>
            </Card>
            <div className='w-full'>
                <IonButton expand='block' fill='outline'>
                    bayar sekarang
                </IonButton>
            </div>
        </Layout>
    )
}

export default Bayar