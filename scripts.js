/* =====================================================================
   Muiz Abiola Aminu — Portfolio behaviour
   Theme · Nav · Reveal · Render projects · Filters · Modal · Contact
   ===================================================================== */
(function () {
    'use strict';

    var PROJECTS = window.PROJECTS || [];
    var EMAIL = 'aminumuiz@gmail.com';

    /* ---------------- Helpers ---------------- */
    function $(sel, ctx) { return (ctx || document).querySelector(sel); }
    function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function chips(list, limit) {
        var arr = limit ? list.slice(0, limit) : list;
        return arr.map(function (t) { return '<span class="chip tag">' + escapeHtml(t) + '</span>'; }).join('');
    }

    /* ---------------- Theme ---------------- */
    function initTheme() {
        var root = document.documentElement;
        var btn = $('#themeToggle');
        var stored = null;
        try { stored = localStorage.getItem('theme'); } catch (e) { /* ignore */ }
        var followsDarkSystem = !stored && window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(stored ? stored === 'dark' : followsDarkSystem);
        if (btn) {
            btn.addEventListener('click', function () {
                var isDark = root.getAttribute('data-theme') === 'dark';
                applyTheme(!isDark);
            });
        }
        function applyTheme(dark) {
            root.setAttribute('data-theme', dark ? 'dark' : 'light');
            try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
            var i = btn ? btn.querySelector('i') : null;
            if (i) i.className = dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
    }

    /* ---------------- Nav ---------------- */
    function initNav() {
        var nav = $('#navbar');
        var burger = $('#hamburger');
        var links = $('#navLinks');

        var onScroll = function () {
            if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        if (burger && links) {
            burger.addEventListener('click', function () {
                var open = links.classList.toggle('open');
                burger.classList.toggle('open', open);
                burger.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
            $$('.nav-link', links).forEach(function (a) {
                a.addEventListener('click', function () {
                    links.classList.remove('open');
                    burger.classList.remove('open');
                });
            });
        }
    }

    /* ---------------- Reveal on scroll ---------------- */
    var revealObs;
    function ensureRevealObserver() {
        if (revealObs) return;
        revealObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    function observeReveals(ctx) {
        ensureRevealObserver();
        $$('.reveal:not(.in)', ctx || document).forEach(function (el) { revealObs.observe(el); });
    }

    /* ---------------- Modal ---------------- */
    function buildModal(project) {
        var hero = $('#modalHero');
        var body = $('#modalBody');
        if (!hero || !body) return;

        hero.innerHTML =
            '<img src="' + project.image + '" alt="' + escapeHtml(project.title) + '">' +
            '<div class="mh-cap"><span class="mh-tag">' + escapeHtml(project.tag) + '</span><h3>' + escapeHtml(project.title) + '</h3></div>';

        var galleryHtml = '';
        if (project.gallery && project.gallery.length) {
            galleryHtml = '<div class="modal-gallery">' +
                project.gallery.map(function (g) {
                    return '<img src="' + g + '" alt="' + escapeHtml(project.title) + ' detail" loading="lazy">';
                }).join('') +
                '</div>';
        }

        var caseHtml = (project.caseStudy || []).map(function (section) {
            return '<div class="cs-block"><h5>' + escapeHtml(section.heading) + '</h5><p>' + escapeHtml(section.text) + '</p></div>';
        }).join('');

        body.innerHTML =
            '<h4><i class="fa-solid fa-circle-info"></i> Overview</h4>' +
            '<p class="modal-lead">' + escapeHtml(project.summary) + '</p>' +
            galleryHtml +
            '<h4><i class="fa-solid fa-diagram-project"></i> Expanded case study</h4>' +
            '<div class="cs-list">' + caseHtml + '</div>' +
            '<h4><i class="fa-solid fa-microchip"></i> Tags &amp; technologies</h4>' +
            '<div class="chip-row">' + chips(project.tech) + '</div>' +
            '<div class="modal-links">' +
            '<a class="btn btn-primary" href="mailto:' + EMAIL + '?subject=' + encodeURIComponent('Enquiry about ' + project.title) + '"><i class="fa-solid fa-paper-plane"></i> Discuss this project</a>' +
            '<a class="btn btn-ghost" data-close><i class="fa-solid fa-xmark"></i> Close</a>' +
            '</div>';

        var modal = $('#projectModal');
        modal.classList.add('open');
        document.body.classList.add('lock');
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        var modal = $('#projectModal');
        if (!modal) return;
        modal.classList.remove('open');
        document.body.classList.remove('lock');
        modal.setAttribute('aria-hidden', 'true');
    }

    function initModal() {
        var modal = $('#projectModal');
        if (!modal) return;

        // open via [data-open] triggers (e.g. featured "case study" links)
        document.addEventListener('click', function (ev) {
            var t = ev.target.closest('[data-open]');
            if (!t) return;
            ev.preventDefault();
            var slug = t.getAttribute('data-open');
            var p = PROJECTS.find(function (x) { return x.slug === slug; });
            if (p) buildModal(p);
        });

        // Delegated so the Close button rendered inside the modal body is covered too.
        document.addEventListener('click', function (ev) {
            var t = ev.target && ev.target.closest ? ev.target.closest('[data-close]') : null;
            if (!t || !modal.contains(t)) return;
            ev.preventDefault();
            closeModal();
        });

        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape') closeModal();
        });
    }

    /* ---------------- Featured rows (index) ---------------- */
    function renderFeatured() {
        var host = $('#featuredList');
        if (!host) return;
        var featured = PROJECTS.filter(function (p) { return p.featured; });
        var html = featured.map(function (p, i) {
            return '<div class="feature-row reveal ' + (i % 2 === 1 ? 'flip' : '') + '" data-open="' + p.slug + '">' +
                '<div class="fr-media"><div class="frame"><img src="' + p.image + '" alt="' + escapeHtml(p.title) + '" loading="lazy"></div></div>' +
                '<div class="fr-body">' +
                '<span class="tag-label">' + escapeHtml(p.tag) + '</span>' +
                '<h3>' + escapeHtml(p.title) + '</h3>' +
                '<p>' + escapeHtml(p.summary) + '</p>' +
                '<div class="chip-row">' + chips(p.tech, 4) + '</div>' +
                '<div class="fr-links"><a href="projects.html?p=' + p.slug + '" class="link-arrow" data-open="' + p.slug + '">Full case study <i class="fa-solid fa-arrow-right"></i></a></div>' +
                '</div></div>';
        }).join('');
        host.innerHTML = html;
        observeReveals(host);
    }

    /* ---------------- Grid + filters (projects page) ---------------- */
    function renderGrid(list) {
        var grid = $('#projectGrid');
        if (!grid) return;
        grid.innerHTML = list.map(function (p) {
            return '<article class="proj-card reveal" data-slug="' + p.slug + '">' +
                '<div class="pc-media">' +
                (p.status ? '<span class="pc-status">' + escapeHtml(p.status) + '</span>' : '') +
                '<img src="' + p.image + '" alt="' + escapeHtml(p.title) + '" loading="lazy"></div>' +
                '<div class="pc-body">' +
                '<span class="pc-tag">' + escapeHtml(p.tag) + '</span>' +
                '<h3>' + escapeHtml(p.title) + '</h3>' +
                '<p>' + escapeHtml(p.summary) + '</p>' +
                '<div class="chip-row">' + chips(p.tech, 4) + '</div>' +
                '<div class="pc-foot"><button class="btn btn-primary btn-sm" data-open="' + p.slug + '">View case study <i class="fa-solid fa-arrow-right"></i></button></div>' +
                '</div></article>';
        }).join('');

        // whole card clickable too
        $$('.proj-card', grid).forEach(function (card) {
            card.addEventListener('click', function (ev) {
                if (ev.target.closest('[data-open]')) return; // handled by global handler
                var p = PROJECTS.find(function (x) { return x.slug === card.getAttribute('data-slug'); });
                if (p) buildModal(p);
            });
        });
        observeReveals(grid);
    }

    function renderProjectsPage() {
        var host = $('#filters');
        if (!host) return;

        var tags = ['All'];
        PROJECTS.forEach(function (p) {
            if (tags.indexOf(p.tag) === -1) tags.push(p.tag);
        });

        host.innerHTML = tags.map(function (t) {
            return '<button class="filter-btn' + (t === 'All' ? ' active' : '') + '" data-filter="' + escapeHtml(t) + '">' + escapeHtml(t) + '</button>';
        }).join('');

        renderGrid(PROJECTS);

        host.addEventListener('click', function (ev) {
            var b = ev.target.closest('.filter-btn');
            if (!b) return;
            $$('.filter-btn', host).forEach(function (x) { x.classList.remove('active'); });
            b.classList.add('active');
            var f = b.getAttribute('data-filter');
            var list = f === 'All' ? PROJECTS : PROJECTS.filter(function (p) { return p.tag === f; });
            renderGrid(list);
        });
    }

    /* ---------------- Contact (mailto compose) ---------------- */
    function initContact() {
        var form = $('#contactForm');
        if (!form) return;
        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            var name = $('#cfName').value.trim();
            var email = $('#cfEmail').value.trim();
            var subject = $('#cfSubject').value.trim() || 'Portfolio inquiry';
            var msg = $('#cfMsg').value.trim();
            var body = 'Hi Muiz,\n\n' + msg + '\n\n— ' + name + '\n' + email;
            window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            var note = $('#formNote');
            if (note) note.classList.add('ok');
        });
    }

    /* ---------------- Deep links: projects.html?p=slug or #slug ---------------- */
    function initDeepLink() {
        if (!$('#projectGrid')) return;
        var params = new URLSearchParams(window.location.search);
        var slug = params.get('p');
        if (!slug && window.location.hash) slug = window.location.hash.replace('#', '');
        if (!slug) return;
        var p = PROJECTS.find(function (x) { return x.slug === slug; });
        if (p) setTimeout(function () { buildModal(p); }, 350);
    }

    /* ---------------- Footer year ---------------- */
    function initYear() {
        var y = $('#year');
        if (y) y.textContent = new Date().getFullYear();
    }

    /* ---------------- Boot ---------------- */
    function boot() {
        initTheme();
        initNav();
        renderFeatured();
        renderProjectsPage();
        initModal();
        initContact();
        initDeepLink();
        initYear();
        observeReveals();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
