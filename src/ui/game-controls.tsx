import {
  faArrowsRotate,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useCurrentLevelTitle, useGameControls } from "../model/puzzles";
import { Button } from "./button";
import { IconButton } from "./icon-button";
import { Spacer } from "./spacer";

export function GameControls() {
  const level = useCurrentLevelTitle();
  const ctrl = useGameControls();

  return (
    <div className="flex gap-4 items-center">
      <Button
        iconBefore={faChevronLeft}
        onClick={ctrl.goToPrevLevel}
        disabled={!ctrl.hasPrevLevel}
      >
        Previous
      </Button>

      <Spacer />
      <h2 className="text-gray-600 text-md">{level}</h2>
      <IconButton icon={faArrowsRotate} onClick={ctrl.restart}>
        Restart
      </IconButton>
      <Spacer />

      <Button
        iconAfter={faChevronRight}
        onClick={ctrl.goToNextLevel}
        disabled={!ctrl.hasNextLevel}
      >
        Next
      </Button>
    </div>
  );
}
