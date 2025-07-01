import type {
  Context,
  EventHandlerConfig,
  InitialState,
  OmniAPI,
  OmniEvents,
  Options,
  Utils,
} from './types';

import {
  internalConfig as internal
} from './internal-config';

import {
  createNanoEvents
} from 'nanoevents';

import {
  mergeConfig,
} from './config';

import {
  getElements,
} from '../dom';

import {
  handleClick,
  handleKeyboard,
  startIndicatorCentering,
  removeInvisibleAnchors,
  updateItemTransitionClasses,

  handleIntersection,
  handleResize,

  handleInit,
  handleSetup,
  handleDestroy,

  updateLayoutData,
  updateUI,
  preloadImages,
} from '../handlers';

import {
  navigate,
} from '../navigation';

import {
  createState,
} from '../state';

import {
  supportsScrollend,
  supportsRequirements,
} from '../utils';

/**
 * Adds basic carousel functionality to a scrollable area
 *
 * @param element - The carousel element
 * @param options - Configuration options
 *
 * @returns A public API object with a few methods for controlling the carousel
 */
export const createOmniCarousel = (
  root: HTMLElement,
  options?: Options
): OmniAPI => {
  if (!supportsRequirements()) {
    throw new Error('Browser requirements not met for carousel functionality.');
  }

  //
  // Guard: prevent multiple carousel instances on the same element
  //
  if (root.hasAttribute(internal.dataAttributes.carouselInstance)) {
    throw new Error('Carousel instance already exists on this element. Each element can only have one carousel instance.');
  }

  //
  // Claim the element immediately to prevent duplicate instances
  //
  root.setAttribute(internal.dataAttributes.carouselInstance, 'true');

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Event subscription management                                            \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  //
  // Helper function to reduce subscription boilerplate
  //
  const onEvent = <K extends keyof OmniEvents>(
    event: K,
    handler: OmniEvents[K]
  ): void => {
    eventEmitter.on(event, handler);
  };

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Configuration                                                            \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  const config = mergeConfig(options);
  const elements = getElements(root, config.selectors);
  const { track, slides } = elements;

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // State initialization                                                     \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  //
  // Create the state object with initial values
  //
  const state = createState(track.clientWidth, track.scrollWidth, config);

  //
  // Create the nanoevents event emitter
  //
  const eventEmitter = createNanoEvents<OmniEvents>();

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Utility functions                                                        \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  const utils: Utils = {
    //
    // @neededfor scrollAlign:'center' + scrollSteps:'many'
    // @neededfor indicators
    //
    getElementRect: (
      element: HTMLElement,
      property?: 'width' | 'left'
    ): { width: number, left: number } | number => {
      const { width, left } = element.getBoundingClientRect();
      
      if (property === 'width') {
        return width;
      } else if (property === 'left') {
        return left;
      }
      
      return { width, left };
    },

    getItemIndex: (slide: HTMLElement | undefined): number => {
      return slide ? (state.slideIndexMap.get(slide) ?? -1) : -1;
    },

    //
    // @neededfor scrollSteps:'many'
    //
    getItemWidth: (index: number): number => {
      if (!state.itemWidthMap.has(index)) {
        const width = slides[index].offsetWidth;
        state.itemWidthMap.set(index, width);
      }
      return state.itemWidthMap.get(index)!;
    },

    //
    // @neededfor scrollAlign:'center' + scrollSteps:'many'
    //
    // Lazily calculates and caches the container's left position
    //
    getContainerLeft: (): number => {
      if (state.containerLeft === undefined) {
        state.containerLeft = track.getBoundingClientRect().left;
      }
      return state.containerLeft;
    },
  };

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Context getter                                                           \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  const getContext = (() => {
    const context: Context = {
      config,
      elements: {
        ...elements,
        indicators: [],
      },
      state,
      utils,
      eventEmitter,
    };

    return (): Context => context;
  })();

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Initial attribute state (for reference during cleanup)                   \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  const initialState: InitialState = { buttonAttributes: new Map() };

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Event listeners                                                          \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  //
  // Define all handlers for native events
  //
  const eventHandlers: EventHandlerConfig[] = [
    {
      handler: (event: Event) => handleClick(getContext(), event),
      event: 'click',
      element: 'root',
      options: { passive: true }
    },
    {
      handler: (event: Event) => handleKeyboard(getContext(), event as KeyboardEvent),
      event: 'keydown',
      element: 'track',
      options: {}
    },
    //
    // @neededfor indicators
    //
    {
      handler: () => startIndicatorCentering(getContext()),
      event: 'scrollend',
      element: 'track',
      options: { passive: true },
      condition: () => {
        const context = getContext();

        return supportsScrollend() && context.state.indicatorOverflow;
      }
    },
    //
    // @neededfor scrollAlign:'center' + scrollSteps:'many'
    //
    {
      handler: () => removeInvisibleAnchors(getContext()),
      event: 'scrollend',
      element: 'track',
      options: { passive: true },
      condition: () => {
        const context = getContext();

        return (
          !!context.state.detectedBlinkEngine
          && supportsScrollend()
          && context.config.scrollAlign === 'center'
          && context.config.scrollSteps === 'many'
        );
      }
    },
    //
    // @neededfor transitionHelpers:true
    //
    {
      handler: (event: Event) => updateItemTransitionClasses(getContext(), event as TransitionEvent),
      event: 'transitionend',
      element: 'track',
      options: { passive: true },
      condition: () => {
        const context = getContext();

        return context.config.transitionHelpers;
      }
    }
  ];

  const addEventListeners = (): void => {
    const { elements } = getContext();

    //
    // Process all event handlers and check their conditions
    //
    eventHandlers
      .filter(config => !config.condition || config.condition())
      .forEach(config => {
        elements[config.element].addEventListener(
          config.event,
          config.handler as EventListener,
          config.options
        );
      });
  };

  const removeEventListeners = (): void => {
    const { elements } = getContext();

    eventHandlers.forEach(config => {
      elements[config.element].removeEventListener(
        config.event,
        config.handler as EventListener
      );
    });
  };

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Listeners for Omni custom events (nanoevents)                            \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  const setupOmniEventListeners = (): void => {
    //
    // omni:visibility:change handler
    //
    // This event is emitted from handleIntersection
    //
    onEvent('omni:visibility:change', (data) => {
      updateUI(getContext(), data);

      // Handle image preloading if enabled
      if (getContext().config.preloadAdjacentImages) {
        preloadImages(getContext());
      }
    });

    //
    // omni:dimensions:change handler
    //
    // The event is emitted from resizeObserver
    // for small changes that don’t require changes to the UI
    //
    onEvent('omni:dimensions:change', () => {
      updateLayoutData(getContext(), intersectionObserver);
    });

    //
    // Go to the previous slide or set of slides
    //
    onEvent('omni:nav:prev', () => {
      navigate(getContext(), 'left', 'none');
    });

    //
    // Go to the next slide or set of slides
    //
    onEvent('omni:nav:next', () => {
      navigate(getContext(), 'right', 'none');
    });

    //
    // Go to a specific slide by index
    //
    onEvent('omni:nav:index', (data) => {
      navigate(getContext(), 'none', data.index);
    });
  };

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Lifecycle methods                                                        \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  //
  // Track initialization state
  //
  let initialized = false;

  const init = (): void => {
    //
    // Ensure init is only called once
    //
    if (initialized) {
      console.warn('Carousel already initialized. Use setup() instead if needed.');

      return;
    }

    eventEmitter.emit('omni:init');
  };

  const destroy = (): void => {
    //
    // Use full as default mode since this function is called externally
    //
    eventEmitter.emit('omni:destroy', { mode: 'full' });
  };

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Observers                                                                \\
  //                                                                          \\
  // IMPORTANT                                                                \\
  //                                                                          \\
  // The observers start at different points:                                 \\
  //                                                                          \\
  // lazyInitObserver starts on omni:init and stops when root is visible      \\
  // resizeObserver starts when root becomes visible and runs all the time    \\
  // intersectionObserver starts on omni:setup for tracking slide visibility  \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  const resizeObserver = new ResizeObserver(() => {
      handleResize(getContext());
    }
  );

  const lazyInitObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        //
        // Start the resize observer
        //
        resizeObserver.observe(elements.track);

        //
        // Continue with setup if we have overflow
        //
        if (state.scrollWidth > state.width) {
          eventEmitter.emit('omni:setup');
        }

        //
        // Disconnect the observer since we only need to detect visibility once
        //
        lazyInitObserver.disconnect();
      }
    }
  );

  const intersectionObserver = new IntersectionObserver(
    (entries) => handleIntersection(getContext(), entries), {
    root: track,
    rootMargin: internal.ioRootMargin,
    threshold: internal.ioThresholds
  });

  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Lifecycle event handlers                                                 \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  //
  // omni:init listener
  //
  // The event is emitted from the public init() function.
  //
  onEvent('omni:init', () => {
    initialized = handleInit(
      getContext(),
      initialState,
      lazyInitObserver
    );
  });

  //
  // omni:setup listener
  //
  // The event is emitted from two places:
  //
  // 1. The omni:init handler if the carousel is overflowing
  // 2. handleResize when we transition to an overflowing track
  //
  onEvent('omni:setup', () => {
    handleSetup(
      getContext(),
      initialState,
      intersectionObserver,
      addEventListeners
    );
  });

  //
  // omni:destroy listener
  //
  // The event is emitted from the public destroy() function
  // and also from handleResize (with mode: 'partial')
  //
  onEvent('omni:destroy', (data) => {
    initialized = handleDestroy(
      getContext(),
      initialState,
      intersectionObserver,
      resizeObserver,
      removeEventListeners,
      eventEmitter,
      data,
      lazyInitObserver
  )});

  ///
  // Initial setup of listeners for custom Omni events (nanoevents)
  //
  setupOmniEventListeners();


  //--------------------------------------------------------------------------\\
  //                                                                          \\
  // Public API                                                               \\
  //                                                                          \\
  //--------------------------------------------------------------------------\\

  const setup = (): void => {
    if (!initialized) {
      init();

      return;
    }

    const { width, scrollWidth } = state;

    if (scrollWidth > width) {
      eventEmitter.emit('omni:setup');
    }
  };

  //
  // Public API
  //
  return {
    //
    // Lifecycle methods
    //
    init,
    setup,
    destroy: () => {
      if (initialized) {
        destroy();
      }
    },

    //
    // Navigation methods
    //
    goTo: (index: number) => eventEmitter.emit('omni:nav:index', { index }),
    next: () => eventEmitter.emit('omni:nav:next'),
    prev: () => eventEmitter.emit('omni:nav:prev'),

    //
    // Event subscription
    //
    on: <K extends keyof OmniEvents>(
      event: K,
      callback: OmniEvents[K]
    ) => eventEmitter.on(event, callback)
  };
};
