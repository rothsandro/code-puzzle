import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import type { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  iconBefore?: IconDefinition;
  iconAfter?: IconDefinition;
}

export function Button(props: ButtonProps) {
  const { iconBefore, iconAfter, children, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={clsx(
        "flex items-center gap-2 px-4 py-[3px]",
        "outline-teal-500",
        "rounded-full bg-teal-500 text-teal-50 font-medium",
        "transition-colors duration-150 hover:bg-teal-600 hover:text-white",
        "active:enabled:scale-[0.98]",
        "disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-default",
        "cursor-pointer",
        className
      )}
    >
      {!!iconBefore && (
        <FontAwesomeIcon icon={iconBefore} widthAuto size="sm" />
      )}
      <span>{children}</span>
      {!!iconAfter && <FontAwesomeIcon icon={iconAfter} widthAuto size="sm" />}
    </button>
  );
}
