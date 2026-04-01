import SplitType from "split-type";

function resolveTargets(
  target: string | Element | Array<string | Element>
): HTMLElement[] {
  if (Array.isArray(target)) {
    return target.flatMap((t) => {
      if (typeof t === "string") {
        return Array.from(document.querySelectorAll(t)) as HTMLElement[];
      }
      return [t as HTMLElement];
    });
  }
  if (typeof target === "string") {
    return Array.from(document.querySelectorAll(target)) as HTMLElement[];
  }
  return [target as HTMLElement];
}

/** Maps GSAP SplitText-style `type` strings to SplitType's `types` option */
function gsapTypeToSplitType(type: string): string {
  const parts = type.split(",").map((s) => s.trim().toLowerCase());
  if (parts.includes("lines") && parts.includes("words")) {
    return "lines, words";
  }
  if (parts.includes("lines") && parts.includes("chars")) {
    return "lines, chars";
  }
  if (parts.includes("words") && parts.includes("chars")) {
    return "words, chars";
  }
  if (parts.includes("chars")) return "chars";
  if (parts.includes("words")) return "words";
  if (parts.includes("lines")) return "lines";
  return "lines, chars";
}

/**
 * Drop-in replacement for GSAP Club SplitText (used with GSAP animations).
 * Uses MIT-licensed `split-type` instead of gsap-trial (which redirects production sites).
 */
export class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private instances: SplitType[] = [];

  constructor(
    target: string | Element | Array<string | Element>,
    options: { type: string; linesClass?: string }
  ) {
    const elements = resolveTargets(target);
    const types = gsapTypeToSplitType(options.type);
    const lineClass = options.linesClass?.trim() || "";

    for (const el of elements) {
      const st = new SplitType(el, {
        types: types as never,
        ...(lineClass ? { lineClass } : {}),
      });
      this.instances.push(st);
      this.chars.push(...(st.chars ?? []));
      this.words.push(...(st.words ?? []));
      this.lines.push(...(st.lines ?? []));
    }
  }

  revert() {
    for (const i of this.instances) {
      i.revert();
    }
    this.instances = [];
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}
