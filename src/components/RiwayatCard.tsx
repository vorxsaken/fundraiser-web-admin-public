import { RouteComponentProps } from 'react-router'
import Card from './Card'
import { IonButton } from '@ionic/react'
import { parseCurrency, standartDate } from '../lib/utils';
interface RiwayatCardType { className?: string, title: string, payDate: string, paymentMethod: string, nominal: number, id: number }

const RiwayatCard: React.FC<RiwayatCardType> = ({ className, title, payDate, paymentMethod, nominal, id }) => {
    const pathname = window.location.pathname;
    const date = standartDate(payDate);

    return (
        <Card className={className}>
            <div className='w-full flex justify-between items-center capitalize'>
                <div className='flex justify-start items-start flex-col gap-1'>
                    <span className='text-[0.6rem]'>
                        {title}
                    </span>
                    <span className='text-xl font-bold'>
                        {parseCurrency(nominal)}
                    </span>
                </div>
                <div className='flex flex-col justify-center border border-slate-300 rounded-lg p-2'>
                    <span className='text-[0.6rem]'>
                        {date}
                    </span>
                    <span className='text-xs'>
                        {paymentMethod}
                    </span>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <IonButton fill='clear' size='small' routerLink={`${pathname}/detailriwayat/${id}`}>
                    Lihat
                </IonButton>
            </div>
        </Card>
    )
}

export default RiwayatCard