import { IonIcon } from "@ionic/react";
import { trash } from "ionicons/icons";
import { FC } from "react";
import { cn } from "../lib/utils";
interface EmptyViewType {
  message?: string;
  className?: string
}

const EmptyView: FC<EmptyViewType> = ({ message, className }) => {
  return (
    <div className={cn('w-full h-[80vh] flex flex-col justify-center items-center gap-4', className)}>
      <IonIcon className="text-8xl text-gray-500" icon={trash} />
      <span className="text-gray-500">{message}</span>
    </div>
  );
};

export default EmptyView;
