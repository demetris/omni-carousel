export interface Classes {
  setupComplete: string;

  itemCentered: string;
  itemGroupCentered: string;

  indicatorCurrent: string;
  indicatorPartCurrent: string;
  indicatorOverflowing: string;
  itemCurrent: string;
  itemPartCurrent: string;
  itemEntering: string;
  itemExiting: string;
}

export interface Selectors {
  invisibleAnchor: string;
}

interface InternalConfig {
  ioRootMargin: string;
  ioThresholds: number[];

  scrollBehavior: ScrollBehavior;
  scrollBlock: ScrollLogicalPosition;

  centerTolerance: number;
  scrollendTimeoutDelay: number;

  classes: Classes;
  selectors: Selectors;
  dataAttributes: {
    carouselInstance: string;
  };
}

export const internalConfig: InternalConfig = {
  ioRootMargin: '0px 1px 0px 1px',
  ioThresholds: [0, 1],

  scrollBehavior: 'smooth',
  scrollBlock: 'nearest',

  centerTolerance: 1,
  scrollendTimeoutDelay: 250,

  classes: {
    setupComplete: 'is-omni-ready',

    itemCentered: 'is-omni-centered',
    itemGroupCentered: 'is-omni-centered',
    indicatorCurrent: 'is-omni-current',
    indicatorPartCurrent: 'is-omni-part-current',
    indicatorOverflowing: 'is-omni-indicator-overflow',
    itemCurrent: 'is-omni-current',
    itemPartCurrent: 'is-omni-part-current',
    itemEntering: 'is-omni-entering',
    itemExiting: 'is-omni-exiting',
  },

  selectors: {
    invisibleAnchor: '.omni-invisible-anchor',
  },

  dataAttributes: {
    carouselInstance: 'data-omni-carousel',
  }
};
