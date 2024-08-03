import { FC, useState } from 'react'
import SecondLayout from '../components/SecondLayout'
import SecondaryHeader from '../components/SecondaryHeader'
import Card from '../components/Card'
import { IonButton, IonImg, IonSpinner, useIonRouter } from '@ionic/react'
import { RouteComponentProps } from 'react-router'
import { fetchWithToken, showToast } from '../lib/utils'
import { dispatch, stateType } from '../store'
import { removeAdmin, selectAdminById } from '../store/admin'
import { API_URL } from '../lib/variables'
import { useSelector } from 'react-redux'
import { Alert } from '../components/Alert'
interface DetailAdminType extends RouteComponentProps<{ id: string }> { }

const DetailAdmin: FC<DetailAdminType> = ({ match }) => {
    const admin = useSelector((state: stateType) => selectAdminById(state, match.params.id as any))
    const [loading, setloading] = useState(false)
    const [errormessage, seterrormessage] = useState('')
    const [isErrorOpen, setErrorIsOpen] = useState(false)
    const router = useIonRouter()

    const deleteAdmin = async () => {
        setloading(true)
        try {
            const res = await fetchWithToken(`${API_URL}/api/user/delete/admin`, { id: match.params.id })
            const { id } = res.json as any
            setTimeout(() => { dispatch(removeAdmin(id)) }, 1000)
            router.goBack()
        } catch (error) {
            console.log(error)
            setErrorIsOpen(true)
            seterrormessage(error as any)
        } finally {
            showToast("berhasil delete admin")
        }
    }

    return (
        <SecondLayout header={<SecondaryHeader title={`detail admin`} />} title='Detail Admin'>
            <Alert message={errormessage} setIsOpen={setErrorIsOpen} isOpen={isErrorOpen} />
            <Card>
                <div className='w-full flex justify-start items-center flex-col gap-2'>
                    <div className='flex justify-center'>
                        <div className='w-36 h-36 relative rounded-full overflow-hidden'>
                            <IonImg src={admin.foto} className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-7'>
                    <div className='flex flex-col gap-1'>
                        <span className='font-2xl font-extrabold'>
                            Nama
                        </span>
                        <span className='text-sm'>
                            {admin.nama}
                        </span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='font-xl font-extrabold'>
                            Alamat
                        </span>
                        <span className='text-sm break-all'>
                            {admin.alamat}
                        </span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='font-xl font-extrabold'>
                            Email
                        </span>
                        <span className='text-sm'>
                            {admin.email}
                        </span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='font-xl font-extrabold'>
                            No. Telp
                        </span>
                        <span className='text-sm'>
                            {admin.no_telp}
                        </span>
                    </div>
                </div>
                <div className='w-full flex justify-center items-center gap-2 flex-col'>
                    <IonButton fill='clear' className='w-4/5' routerLink={`/tabs/admin/edit-admin/${match.params.id}/true`} routerDirection='none'>
                        Edit
                    </IonButton>
                    <IonButton onClick={() => deleteAdmin()} fill='clear' color={'danger'} className='w-4/5'>
                        {loading ? <IonSpinner name='dots' /> : 'Hapus'} 
                    </IonButton>
                </div>
            </Card>
        </SecondLayout>
    )
}

export default DetailAdmin