import classNames from "classnames";
import { useEffect, useRef, useState, Fragment } from "react";

export type Option<T = string> = {
  label: string;
  value: T;
};

type Props<T> = {
  value: string;
  label?: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  options: Option<T>[];
  innerLabel?: string;
  onChange?: (e: T) => void;
};

function InputSelect<T>({
  value,
  label,
  id,
  options,
  innerLabel = "Select Option",
  onChange,
}: Props<T>) {
  const popOverRef = useRef<HTMLDivElement | null>(null);

  const [showPopOver, setShowPopOver] = useState(false);

  const handleClickValue = (option: Option<T>) => {
    if (onChange) {
      setShowPopOver(false);
      onChange(option.value);
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popOverRef.current &&
        !popOverRef.current.contains(e.target as Node)
      ) {
        setShowPopOver(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickField = () => {
    setShowPopOver(!showPopOver);
  };

  return (
    <div className="w-full relative" ref={popOverRef}>
      {label && (
        <label htmlFor={id} className="block text-brand-primary mb-2">
          {label}
        </label>
      )}
      <div className="relative" onClick={handleClickField}>
        <div
          className={classNames(
            "outline-none w-full bg-secondary-background rounded-lg text-light-grey p-2"
          )}
        >
          {options.find((el) => el.value === value)?.label || innerLabel}
        </div>
        <button type="button" className="absolute top-2 right-3">
          <img src="./icons/caret-down.svg" alt="" className="w-6" />
        </button>
      </div>
      <div
        className={classNames(
          "bg-gray-600 w-full rounded-lg absolute top-[45px] overflow-hidden transition-[max-height] ease-linear duration-500",
          showPopOver ? "max-h-[1000px]" : "max-h-0"
        )}
        style={{
          transitionTimingFunction: "linear",
          transitionDuration: "500ms",
        }}
      >
        {options.map((el, i) => (
          <Fragment key={i}>
            <span
              onClick={() => handleClickValue(el)}
              className="text-light-grey py-2 px-4 hover:bg-gray-700 cursor-pointer block w-full"
            >
              {el.label}
            </span>
            {i < options.length - 1 && <hr className="border-light-grey" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default InputSelect;
