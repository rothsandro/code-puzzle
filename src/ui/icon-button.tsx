import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import type { ComponentProps } from "react";

export interface IconButtonProps extends ComponentProps<"button"> {
  icon: IconDefinition;
}

export function IconButton(props: IconButtonProps) {
  const { icon, children, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={clsx(
        "flex text-teal-700 cursor-pointer",
        "rounded-full outline-offset-[6px]",
        className
      )}
    >
      <FontAwesomeIcon icon={icon} widthAuto size="sm" />
      <span className="sr-only">{children}</span>
    </button>
  );
}
