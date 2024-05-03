document.addEventListener('DOMContentLoaded', () => {
  const scales = document.querySelectorAll('[data-scale]')
  scales.forEach(scale => {

    getScaleValue(scale)

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'data-scale-progress') {
          getScaleValue(scale);
        }
      });
    });

    observer.observe(scale, { attributes: true });
  })

  const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', documentHeight)
  documentHeight()

  function getScaleValue(scale) {
    const value = scale.getAttribute('data-scale-progress')
    const result = (value / 100) * 210
    scale.setAttribute('style', `height: ${result}px`)
  }

})


