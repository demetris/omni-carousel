import type { Emitter, Unsubscribe } from 'nanoevents';

export type ScrollAlign = 'start' | 'center';
export type ScrollDirection = 'left' | 'right' | 'none';
export type ScrollSteps = 'one' | 'auto';

export interface OmniAPI {
  //
  // Lifecycle methods
  //
  init: () => void;
  setup: () => void;
  destroy: () => void;

  //
  // Navigation methods
  //
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;

  //
  // Event subscription
  //
  on: <K extends keyof OmniEvents>(
    event: K,
    callback: OmniEvents[K]
  ) => Unsubscribe;
}

export interface Options {
  selectors?: Partial<Selectors>;
  scrollSteps?: ScrollSteps;
  scrollAlign?: ScrollAlign;
  hasEqualWidths?: boolean;
  indicatorNumbers?: boolean;
  transitionHelpers?: boolean;
  preloadAdjacentImages?: boolean;
}

export interface Selectors {
  track: string;
  slide: string;
  prevButton: string;
  nextButton: string;
  startButton: string;
  endButton: string;
  indicatorArea: string;
  indicator: string;
}

/**
 * Types for custom Omni events
 */
export interface OmniEvents {
  //
  // State events
  //
  'omni:visibility:change': (data: {
    state: State,
    slide: HTMLElement,
    fullIntersecting: boolean,
    partIntersecting: boolean,
    wasFullIntersecting: boolean,
    wasPartIntersecting: boolean,
    startBoundaryChanged: boolean,
    endBoundaryChanged: boolean,
  }) => void;
  'omni:dimensions:change': (data: {
    width: number,
    scrollWidth: number,
  }) => void;

  //
  // Navigation events
  //
  'omni:nav:prev': () => void;
  'omni:nav:next': () => void;
  'omni:nav:index': (data: { index: number }) => void;

  //
  // Lifecycle events
  //
  'omni:init': () => void;
  'omni:setup': () => void;
  'omni:destroy': (data?: { mode?: 'full' | 'partial' }) => void;
}

export interface OmniElements {
  root: HTMLElement;
  track: HTMLElement;
  slides: HTMLElement[];
  prevButton?: HTMLButtonElement;
  nextButton?: HTMLButtonElement;
  startButton?: HTMLButtonElement;
  endButton?: HTMLButtonElement;
  indicatorArea?: HTMLElement;
  invisibleAnchor?: HTMLElement;
}

export interface Config {
  scrollAlign: ScrollAlign;
  scrollSteps: ScrollSteps;

  selectors: Selectors;

  hasEqualWidths: boolean;
  indicatorNumbers: boolean;
  transitionHelpers: boolean;
  preloadAdjacentImages: boolean;
}

/**
 * Dynamic state that changes during carousel operation
 */
export interface State {
  width: number;
  scrollWidth: number;
  containerLeft?: number;

  //
  // @neededfor scrollSteps:'auto'
  //
  itemSpacing?: number;
  itemWidth?: number;
  itemWidthMap: Map<number, number>;

  //
  // @neededfor indicators
  //
  indicatorSpacing?: number;
  indicatorWidth?: number;

  fullItems: HTMLElement[];
  partItems: HTMLElement[];
  startItemFullIntersecting: boolean;
  endItemFullIntersecting: boolean;

  hasIndicators: boolean;
  indicatorOverflow: boolean;

  //
  // @neededfor scrollAlign:'center' + scrollSteps:'one'
  //
  centeredItemIndex?: number;
  previousCenteredItemIndex?: number;

  //
  // @neededfor scrollSteps:'auto' + scrollAlign:'center'
  // @neededfor Chrome
  //
  // Stores browser engine detection result for the carousel’s lifecycle
  //
  detectedBlinkEngine?: boolean;

  //
  // @neededfor scrollAlign:'center' + scrollSteps:'auto'
  //
  // Tracks whether we have old invisible anchors that need cleanup on scrollend
  //
  hasOldInvisibleAnchors?: boolean;

  //
  // @neededfor scrollAlign:'center' + scrollSteps:'auto'
  //
  // Tracks whether we set position:relative on the track element
  //
  addedTrackCSSPosition?: boolean;

  //
  // @neededfor scrollAlign:'center' + scrollSteps:'auto' + hasEqualWidths: false
  //
  // Tracks current and previous slide indexes that are part of the centered group
  //
  centeredGroupItems: number[];
  previousCenteredGroupItems: number[];

  //
  // @neededfor scrollend compat
  //
  // Debounced function for centering overflowing indicators
  // in browsers without scrollend support (Safari)
  //
  debouncedCenterIndicators?: ((context: Context) => void);

  slideIndexMap: Map<HTMLElement, number>;
}

/**
 * Combined context containing all carousel data
 */
export interface Context {
  config: Config;
  elements: OmniElements & {
    indicators: HTMLButtonElement[];
  };
  state: State;
  utils: Utils;
  eventEmitter: Emitter<OmniEvents>;
}

/**
 * Utility functions for working with carousel state
 */
export interface Utils {
  getElementRect: (element: HTMLElement, property?: 'width' | 'left') => { width: number, left: number } | number;
  getItemIndex: (slide: HTMLElement | undefined) => number;
  getItemWidth: (index: number) => number;
  getContainerLeft: () => number;
}

type EventElementKey = keyof Pick<OmniElements, 'root' | 'track'>;

/**
 * Configuration for event handlers
 */
export interface EventHandlerConfig<K extends EventElementKey = EventElementKey, E extends Event = Event> {
  handler: (event: E) => void;
  event: string;
  element: K;
  options?: AddEventListenerOptions;
  //
  // Optional condition function to determine
  // whether this handler should be attached
  //
  condition?: () => boolean;
}

export interface InboundItems {
  count: number;
  startIndex: number;
  width: number;
  centermostIndex?: number;
  centermostOffset?: number;
}

export interface InitialState {
  buttonAttributes: Map<HTMLButtonElement, boolean>;
  trackCSSPosition?: string;
}

export interface IntersectionState {
  changed: boolean;
  slide: HTMLElement;
  fullIntersecting: boolean;
  partIntersecting: boolean;
  wasFullIntersecting: boolean;
  wasPartIntersecting: boolean;
  startBoundaryChanged: boolean;
  endBoundaryChanged: boolean;
}

export interface ItemIntersectionObservation {
  slide: HTMLElement;
  fullIntersecting: boolean;
  partIntersecting: boolean;
}
