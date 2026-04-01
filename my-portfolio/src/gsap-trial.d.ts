declare module "gsap-trial/SplitText" {
  export class SplitText {
    constructor(target: unknown, vars?: Record<string, unknown>);
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  export class ScrollSmoother {
    static create(vars: Record<string, unknown>): ScrollSmoother;
    static refresh(hard?: boolean): void;
    scrollTop(value: number): void;
    paused(value: boolean): void;
    scrollTo(
      target: string | Element | null,
      smooth?: boolean,
      position?: string
    ): void;
  }
}
