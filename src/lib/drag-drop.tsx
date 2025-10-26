import { useActorRef, useSelector } from "@xstate/react";
import {
  type PointerEventHandler,
  useCallback,
  type ComponentProps,
  type PointerEvent,
} from "react";
import { fromEvent, map, takeUntil } from "rxjs";
import { assign, fromObservable, setup } from "xstate";
import type { Position } from "../model/puzzle.types";

export interface UseDragDropProps {
  onMove: (offset: Position) => void;
}

export function useDragDrop(props: UseDragDropProps) {
  const { onMove } = props;

  const actor = useActorRef(
    machine.provide({
      actions: {
        move: (_, offset) => onMove(offset),
      },
    })
  );

  return {
    isDragging: useSelector(actor, (x) => x.matches("dragging")),
    elementProps: {
      onPointerDown: useCallback<PointerEventHandler<HTMLElement>>(
        (e) => {
          if (e.button !== 0) return;
          actor.send({
            type: "drag.start",
            x: e.clientX,
            y: e.clientY,
            pointerId: e.pointerId,
            el: e.currentTarget,
          });
        },
        [actor]
      ),
    } satisfies ComponentProps<"div">,
  };
}

const moveObserver = fromObservable<
  { x: number; y: number },
  { el: HTMLElement }
>(({ input }) =>
  fromEvent<PointerEvent>(input.el, "pointermove").pipe(
    takeUntil(fromEvent(input.el, "pointerup")),
    map((e) => ({ x: e.clientX, y: e.clientY }))
  )
);

const machine = setup({
  types: {
    context: {} as {
      el: HTMLElement | null;
      pointerId: number | null;
      start: { x: number; y: number };
      offset: { x: number; y: number };
    },
    events: {} as {
      type: "drag.start";
      x: number;
      y: number;
      pointerId: number;
      el: HTMLElement;
    },
  },
  actions: {
    move: (_, _offset: { x: number; y: number }) => undefined,
    resetTransform: (ctx) => ctx.context.el?.style.removeProperty("transform"),
    capturePointer: (ctx) =>
      ctx.context.el?.setPointerCapture(ctx.context.pointerId!),
    releaseCapture: (ctx) =>
      ctx.context.el?.releasePointerCapture(ctx.context.pointerId!),
    applyTransform: (ctx) => {
      ctx.context.el?.style.setProperty(
        "transform",
        `translate(${ctx.context.offset.x}px, ${ctx.context.offset.y}px)`
      );
    },
  },
  actors: { moveObserver },
}).createMachine({
  context: {
    el: null,
    pointerId: null,
    start: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
  },
  initial: "idle",
  states: {
    idle: {
      entry: assign({
        el: null,
        pointerId: null,
        start: { x: 0, y: 0 },
        offset: { x: 0, y: 0 },
      }),
      on: {
        "drag.start": {
          target: "dragging",
          actions: [
            assign({
              el: (ctx) => ctx.event.el,
              pointerId: (ctx) => ctx.event.pointerId,
              start: (ctx) => ({ x: ctx.event.x, y: ctx.event.y }),
            }),
            (e) => e.event.el.setPointerCapture(e.event.pointerId),
          ],
        },
      },
    },
    dragging: {
      invoke: {
        src: "moveObserver",
        input: (ctx) => ({ el: ctx.context.el! }),
        onSnapshot: {
          guard: ({ event }) => !!event.snapshot.context,
          actions: [
            assign({
              offset: (ctx) => ({
                x: ctx.event.snapshot.context!.x - ctx.context.start.x,
                y: ctx.event.snapshot.context!.y - ctx.context.start.y,
              }),
            }),
            "applyTransform",
          ],
        },
        onDone: {
          target: "idle",
          actions: [
            {
              type: "move",
              params: (ctx) => ctx.context.offset,
            },
            "resetTransform",
          ],
        },
      },
    },
  },
});
