import { IonButton, IonSpinner } from "@ionic/react";
import { ComponentProps, FC, ReactNode } from "react";

interface ButtonInterface extends ComponentProps<typeof IonButton> {
  loading?: boolean;
  children: ReactNode
}
const Button: FC<ButtonInterface> = ({ loading, children, ...props }) => {
  return (
    <IonButton className="w-[180px] h-10" type="submit" color={"dark"} {...props}>
      {loading ? <IonSpinner name="dots" /> : children}
    </IonButton>
  );
};

export default Button;
