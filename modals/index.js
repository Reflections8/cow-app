document.addEventListener('DOMContentLoaded', () => {
    const modalButtons = document.querySelectorAll('[data-modal-button]')
    const modalWrapper = document.querySelector('.modalWrapper')

    function hideAllModals() {
        const modals = document.querySelectorAll('[data-modal]')
        modals.forEach(modal => {
            modal.classList.add('modalHidden')
        })
    }

    function hideModalWrapper() {
        modalWrapper.classList.add('modalWrapper--Hidden')
    }

    function showModalWrapper() {
        modalWrapper.classList.remove('modalWrapper--Hidden')
    }

    modalButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            showModalWrapper()
            hideAllModals()

            const thisAttribute = e.currentTarget.getAttribute('data-modal-button')
            const thisModal = modalWrapper.querySelector(`[data-modal='${thisAttribute}']`)
            thisModal?.classList?.remove('modalHidden')
        })
    })

    /* Close by icon */
    const closeIcons = document.querySelectorAll('.modalWrapper__woodBg-closeIcon')
    closeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            hideModalWrapper()
            hideAllModals()
        })
    })

    /* Close by click outside */
    modalWrapper.addEventListener('click', e => {
        if (!e.target.closest('.modalWrapper__content')) {
            hideModalWrapper()
            hideAllModals()
        }
    })
})
