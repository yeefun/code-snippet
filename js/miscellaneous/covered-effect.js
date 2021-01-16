/* #scroll, #covered, #effect */

class CoveredEffect extends Scroll {
  constructor(args) {
    super();

    const def = {};
    Object.assign(def, args);
    Object.assign(this, def);

    this.curtOrder = 0;

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
  get isScrollDown() {
    return this.scrollDirection === 'down';
  }

  applyCoveredEffect(order, coveredEl, coverEl, whOffset = 0) {
    let curtSpace = 0;
    let isCovered = false;

    window.addEventListener(
      'scroll',
      raf(() => {
        const wh = window.innerHeight;

        if (this.isScrollDown) {
          if (this.curtOrder !== order - 1) {
            return;
          }
        } else {
          if (this.curtOrder !== order) {
            return;
          }
        }

        const coverT = coverEl.getBoundingClientRect().top;

        if (isCovered) {
          if (coverT - wh * (whOffset + 1) >= 0) {
            coveredEl.style.position = '';
            document.body.style.paddingTop = `${curtSpace}px`;
            coveredEl.style.width = '';
            coveredEl.style.bottom = '';
            coveredEl.style.left = '';
            isCovered = false;

            this.curtOrder = order - 1;
          }
        } else {
          if (coverT - wh < 0) {
            const coveredH = coveredEl.clientHeight;

            curtSpace = parseFloat(document.body.style.paddingTop) || 0;
            coveredEl.style.width = '100%';
            coveredEl.style.bottom = '0';
            coveredEl.style.left = '0';
            coveredEl.style.position = 'fixed';
            document.body.style.paddingTop = `${
              curtSpace + (coveredH + wh * whOffset)
            }px`;
            isCovered = true;

            this.curtOrder = order;
          }
        }
      })
    );

    return this;
  }

  applyBetweenEffect(order, betweenEl) {
    window.addEventListener(
      'scroll',
      raf(() => {
        const curtBetweenOpacity = betweenEl.style.opacity;

        if (this.curtOrder !== order) {
          if (!this.isScrollDown) {
            if (curtBetweenOpacity !== '0') {
              betweenEl.style.opacity = '0';
            }
          }
          return;
        }

        if (this.isScrollDown && curtBetweenOpacity === '1') {
          return;
        }

        const wh = window.innerHeight;
        const afterScrollH = window.pageYOffset;
        const curtScrollH = parseFloat(document.body.style.paddingTop) - wh;
        const diff = afterScrollH - curtScrollH;

        if (diff > wh) {
          if (!this.isScrollDown) {
            return;
          }
          betweenEl.style.opacity = '1';
        } else {
          betweenEl.style.opacity = `${(diff / wh).toFixed(2)}`;
        }
      })
    );

    return this;
  }
}
