import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  containerClassName?: string;
  onClick?: () => void;
};

function Card({ children, containerClassName, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "rounded bg-soft-white p-4 text-dark",
        containerClassName
      )}
    >
      {children}
    </div>
  );
}

export default Card;
