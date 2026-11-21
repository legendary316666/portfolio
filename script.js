document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (menuBtn && navLinks) {
    const setMenuOpen = (isOpen) => {
      navLinks.classList.toggle('open', isOpen);
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    };

    menuBtn.addEventListener('click', () => {
      setMenuOpen(!navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        setMenuOpen(false);
        menuBtn.focus();
      }
    });
  }

  // Project Details Modal (Projects Page)
  const modal = document.getElementById('project-modal');
  const modalBox = modal ? modal.querySelector('.modal-box') : null;
  const modalTitle = document.getElementById('modal-title');
  const modalStack = document.getElementById('modal-stack');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');
  const modalDone = document.getElementById('modal-done');
  const detailButtons = document.querySelectorAll('.project-modal-btn');

  if (modal && detailButtons.length > 0) {
    let lastFocusedElement = null;

    const getFocusableElements = () =>
      modalBox
        ? Array.from(
            modalBox.querySelectorAll(
              'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          )
        : [];

    const closeModal = () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    };

    detailButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        lastFocusedElement = document.activeElement;
        modalTitle.textContent = btn.dataset.title || 'Project Details';
        modalStack.textContent = btn.dataset.stack || 'HTML · CSS · JavaScript';
        modalDesc.textContent = btn.dataset.desc || '';
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        if (modalClose) {
          modalClose.focus();
        }
      });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalDone) modalDone.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;

      if (e.key === 'Escape') {
        closeModal();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }
});