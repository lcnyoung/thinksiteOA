;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-phone" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M755.608533 932.927795 268.394537 932.927795c-28.85637 0-52.204058-20.154016-52.204058-44.995797L216.190479 107.928105c0-24.840758 23.347688-44.995797 52.204058-44.995797l487.213997 0c28.852277 0 52.200988 20.154016 52.200988 44.995797l0 780.003893C807.808498 912.773779 784.46081 932.927795 755.608533 932.927795zM511.999488 887.931998c19.203128 0 34.803046-13.4575 34.803046-30.008454 0-16.549931-15.599919-30.007431-34.803046-30.007431-19.200058 0-34.798953 13.4575-34.798953 30.007431C477.199512 874.474498 492.799431 887.931998 511.999488 887.931998zM755.608533 152.923902l-17.401012 0L285.791455 152.923902l-17.397942 0 0 629.996414 17.397942 0 452.415044 0 17.401012 0L755.60751 152.923902z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiala" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M517.436772 598.65255l148.743683-148.775664c9.17855-9.17855 11.896936-22.866423 6.939879-34.859302-4.957057-11.960898-16.630126-19.732284-29.550454-19.732284L346.050532 395.285299c-12.920329 0-24.593398 7.803367-29.550454 19.732284-1.631032 3.965645-2.430557 8.123177-2.430557 12.248727 0 8.315063 3.262063 16.502202 9.370436 22.610575l148.775664 148.775664c6.01243 6.01243 14.135607 9.370436 22.610575 9.370436S511.456323 604.632999 517.436772 598.65255z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-duihao-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M430.85824 898.12992c0 0 120.2176-225.56672 258.53952-420.70016 106.74176-150.60992 239.8208-282.46016 239.8208-282.46016l-27.77088-75.07968c0 0-157.85984 106.65984-285.696 237.568-129.80224 132.83328-229.49888 290.16064-229.49888 290.16064l-196.03456-178.50368-80.15872 82.944L430.85824 898.12992 430.85824 898.12992z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shangla" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M504.32 424.96c5.12-5.12 12.8-5.12 17.92 0l166.4 143.36c7.68 7.68 2.56 33.28-7.68 33.28h-332.8c-10.24 0-15.36-25.6-7.68-33.28l163.84-143.36z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-cross" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M768.992 839.542c-15.595 0-31.187-6.237-43.677-18.72l-530.309-530.309c-24.954-24.954-24.954-62.395 0-87.343s62.395-24.954 87.343 0l530.309 530.309c24.954 24.954 24.954 62.395 0 87.343-12.485 12.485-28.081 18.72-43.677 18.72z"  ></path>' +
    '' +
    '<path d="M238.682 839.542c-15.595 0-31.187-6.237-43.677-18.72-24.954-24.954-24.954-62.395 0-87.343l530.309-530.309c24.954-24.954 62.395-24.954 87.343 0s24.954 62.395 0 87.343l-530.309 530.309c-12.485 12.485-28.081 18.72-43.677 18.72z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)