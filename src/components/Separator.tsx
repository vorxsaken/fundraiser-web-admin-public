import React from 'react'
import { cn } from '../lib/utils'
type SeparatorType = React.ComponentProps<'hr'>

const Separator: React.FC<SeparatorType> = ({ className, ...props }) => {
    return (
        <div className={cn('w-full h-[0.01rem] bg-slate-300 dark:bg-slate-700', className)} {...props} />
    )
}

export default Separator