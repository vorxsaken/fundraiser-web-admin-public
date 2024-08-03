import { IonTextarea } from '@ionic/react'
import React, { ComponentProps, forwardRef } from 'react'
interface InputTextAreaProps extends ComponentProps<typeof IonTextarea> { errors: any, fieldName: string, labelHelper: string }

const InputTextAreaForm = forwardRef(({ errors, fieldName, labelHelper, ...props }: InputTextAreaProps, ref) => {
    return (
        <div className='w-full flex flex-col gap-2'>
            <IonTextarea
                ref={ref as any}
                className={`${errors[fieldName]?.message && 'ion-invalid ion-touched'}`}
                autoGrow={true}
                {...props}
            ></IonTextarea>
            {errors[fieldName]?.message ?
                (<span className='text-xs ml-1 text-red-500'>{errors[fieldName]?.message}</span>) :
                (<span className='text-xs ml-1'>{labelHelper}</span>)}
        </div>
    )
})

export default InputTextAreaForm