import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod';
import { useEffect } from 'react';

export function useCustomForm(formSchema: any, defaultValue?: any) {
    const form = useForm<z.infer<typeof formSchema>>({
        mode: 'all',
        resolver: zodResolver(formSchema),
        defaultValues: defaultValue || {}
    })

    const resetForm = () => {
        const fieldObject = formSchema.strict().shape
        for (const key in fieldObject) {
            form.resetField(key, {defaultValue: ''})
        }  
        form.clearErrors();
    }

    return { form, resetForm }
}