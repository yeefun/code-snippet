/* #scroll, #effect, #animation, #order, #trigger */

class Scroll {
  constructor(args) {
    const def = {
      beforeScrollH: 0,
      scrollDirection: 'down',
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }

  setScrollDirection() {
    const curtScrollH = window.pageYOffset;
    const diff = curtScrollH - this.beforeScrollH;

    this.scrollDirection = diff >= 0 ? 'down' : 'up';
    this.beforeScrollH = curtScrollH;
  }
}

class ScrollController extends Scroll {
  constructor(args) {
    super();
    const def = {};
    Object.assign(def, args);
    Object.assign(this, def);

    this.curtIntervalOrder = 0;
    this.curtLineOrder = 0;

    this.init();
  }

  init() {
    window.addEventListener(
      'scroll',
      raf(() => {
        this.setScrollDirection();
      })
    );
  }

  lineScene({ order, triggerEl, whOffset = 0, enterFn, leaveFn }) {
    let isOnceTriggered = false;

    window.addEventListener(
      'scroll',
      raf(() => {
        if (isOnceTriggered) {
          return;
        }

        const isScrollDown = this.scrollDirection === 'down';

        if (isScrollDown) {
          if (this.curtLineOrder !== order - 1) {
            return;
          }
        } else {
          if (this.curtLineOrder !== order) {
            return;
          }
        }

        const triggerT = triggerEl.getBoundingClientRect().top;

        if (isScrollDown) {
          if (triggerT - whOffset * window.innerHeight <= 0) {
            this.curtLineOrder = order;

            if (!leaveFn) {
              isOnceTriggered = true;
            }
            enterFn?.();
          }
        } else {
          if (triggerT - whOffset * window.innerHeight > 0) {
            this.curtLineOrder = order - 1;

            if (!enterFn) {
              isOnceTriggered = true;
            }
            leaveFn?.();
          }
        }
      })
    );

    return this;
  }

  intervalScene(
    { order },
    { startEl, enterStartFn, leaveStartFn, startWhOffset = 0 },
    { endEl, enterEndFn, leaveEndFn, endWhOffset = 0 } = {}
  ) {
    let inInterval = false;

    window.addEventListener(
      'scroll',
      raf(() => {
        const isScrollDown = this.scrollDirection === 'down';

        if (!inInterval) {
          if (isScrollDown) {
            if (this.curtIntervalOrder !== order - 1) {
              return;
            }
          } else {
            if (this.curtIntervalOrder !== order) {
              return;
            }
          }
        }

        let startT;
        let endT;

        if (!endEl || endEl.isEqualNode(startEl)) {
          const startElBcr = startEl.getBoundingClientRect();
          startT = startElBcr.top;
          endT = startElBcr.bottom;
        } else {
          startT = startEl.getBoundingClientRect().top;
          endT = endEl.getBoundingClientRect().top;
        }

        if (isScrollDown) {
          if (!inInterval && startT - startWhOffset * window.innerHeight <= 0) {
            inInterval = true;

            enterStartFn?.();
          }
          if (endT - endWhOffset * window.innerHeight <= 0) {
            this.curtIntervalOrder = order;
            inInterval = false;

            if (leaveEndFn) {
              leaveEndFn();
            } else {
              leaveStartFn?.();
            }
          }
        } else {
          if (!inInterval && endT - endWhOffset * window.innerHeight > 0) {
            inInterval = true;

            if (enterEndFn) {
              enterEndFn();
            } else {
              enterStartFn?.();
            }
          }
          if (startT - startWhOffset * window.innerHeight > 0) {
            this.curtIntervalOrder = order - 1;
            inInterval = false;

            leaveStartFn?.();
          }
        }
      })
    );

    return this;
  }
}
