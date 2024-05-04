document.addEventListener('DOMContentLoaded', () => {
  // calculate document height
  const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', documentHeight)
  documentHeight()


  const scaleContainer = document.querySelectorAll('.main__bar-wood-ScaleContainer')

  scaleContainer.forEach(container => {
    const scales = document.querySelectorAll('[data-scale]')
    handleScaleContainerRender(container)

    const childrenCountCallback = function(mutationsList, observer) {
      for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          handleScaleContainerRender(container)
        }
      }
    };

    const observer = new MutationObserver(childrenCountCallback);
    const config = { childList: true };
    observer.observe(container, config);

    scales.forEach((scale, index) => {
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

  })



  function getScaleValue(scale) {
    const value = scale.getAttribute('data-scale-progress')
    scale.setAttribute('style', `height: ${value}px`)
  }

  function handleScaleContainerRender(container) {
    const count = container.childElementCount
    const items = []
    container.childNodes.forEach(item => {
      if (item.tagName === 'DIV') {
        items.push(item)
      }
    })
    items.forEach((item, i) => {
      const isSecondColumnItem = (i + 1) - 5 > 0
      if (isSecondColumnItem) {
         item.setAttribute('style', `grid-row: ${5 + (5 - i)}`)
      } else {
        item.setAttribute('style', `grid-row: ${5 - i}`)
      }
    })

    if (count > 5) {
      container.classList.add('main__bar-wood-ScaleContainer--TwoColumns')
    }

    if (count <= 5) {
      container.classList.remove('main__bar-wood-ScaleContainer--TwoColumns')
    }
  }
})


