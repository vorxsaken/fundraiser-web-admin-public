import { IonInput } from '@ionic/react'
import { ComponentProps, forwardRef } from 'react'
interface InputTextProps extends ComponentProps<typeof IonInput> { errors: any, fieldName: string, labelHelper: string }

const InputTextForm = forwardRef(({ errors, fieldName, labelHelper, ...props }: InputTextProps, ref) => {
    
    return (
        <div className='w-full flex flex-col gap-2'>
            <IonInput
                ref={ref as any}
                className={`${errors[fieldName]?.message && 'ion-invalid ion-touched'}`}
                {...props}
            ></IonInput>
            {errors[fieldName]?.message ?
                (<span className='text-xs ml-1 text-red-500'>{errors[fieldName]?.message}</span>) :
                (<span className='text-xs ml-1'>{labelHelper}</span>)}
        </div>
    )
})

export default InputTextForm