import React, { ChangeEvent, ComponentProps, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { personAdd } from 'ionicons/icons'
import { IonIcon, IonImg } from '@ionic/react'
import { compressImage } from '../lib/utils'

interface InputFileProps extends ComponentProps<'input'> { 
    errors: any, 
    fieldName: string, 
    labelHelper: string, 
    value?: string, 
    onChange: (e: any) => void }

export interface SelectImageRefFunction {
    resetImageSrc: () => void
}

const SelectImage = forwardRef(({errors, fieldName, value, labelHelper, onChange, ...props }: InputFileProps, ref) => {
    const inputFileRef = useRef<null | HTMLInputElement>(null)
    const [imageSrc, setImageSrc] = useState(value || '')
    const error = errors[fieldName]?.message

    const inputImageClick = () => inputFileRef.current?.click()

    const inputFileChange = async (file: ChangeEvent<HTMLInputElement>) => {
        if (!file.target.files) return;

        const inputFile = await compressImage(file.target.files[0])
        const imageUrl = URL.createObjectURL(inputFile)
        setImageSrc(imageUrl)
        onChange(inputFile)
    }
    
    const resetImageSrc = () => setImageSrc('')

    useImperativeHandle(ref, () => ({
        resetImageSrc
    }))

    return (
        <div className='w-full flex justify-start items-center flex-col'>
            <div
                className={`w-56 h-56 rounded-full overflow-auto flex justify-center items-center ${error ? 'bg-red-100' : 'bg-gray-200'}`}
                onClick={() => inputImageClick()}
            >
                {imageSrc ?
                    <IonImg src={imageSrc as any} className='w-full h-full object-cover' /> :
                    <IonIcon
                        icon={personAdd}
                        className={`w-20 h-20 ${error ? 'text-red-300' : 'text-gray-400'}`}
                    />}
            </div>
            {error ?
                (<span className='text-sm ml-1 text-red-500 mt-6'>{error}</span>) :
                (<span className='text-sm ml-1 mt-6'>{labelHelper}</span>)}
            <input type="file" className='invisible' onChange={(e) => inputFileChange(e)} ref={inputFileRef} {...props} />
        </div>
    )
})

export default SelectImage