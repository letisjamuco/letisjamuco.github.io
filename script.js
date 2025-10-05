// ==============================
// Global UI Interactions (Vanilla JS)
// ==============================

// -- NAV: hide on scroll + hero parallax
(() => {
	let lastScroll = 0;
	const nav = document.getElementById("nav");
	const hero = document.querySelector("#hero");

	const onScroll = () => {
		const current = window.pageYOffset;

		// Hide nav when scrolling down past 100px, show on scroll up
		if (current > lastScroll && current > 100) {
			nav?.classList.add("hide");
		} else {
			nav?.classList.remove("hide");
		}
		lastScroll = current;

		// Mild parallax on hero (only within first viewport height)
		if (hero && current < window.innerHeight) {
			hero.style.transform = `translateY(${current * 0.5}px)`;
		}
	};

	window.addEventListener("scroll", onScroll, { passive: true });
})();

// -- Mobile menu toggle (ARIA-friendly)
(() => {
	const menu = document.getElementById("nav-menu");
	const toggleBtn = document.querySelector('[data-toggle="menu"]');

	if (!menu || !toggleBtn) return;

	const toggle = () => {
		const active = menu.classList.toggle("active");
		toggleBtn.setAttribute("aria-expanded", String(active));
	};

	const close = () => {
		menu.classList.remove("active");
		toggleBtn.setAttribute("aria-expanded", "false");
	};

	toggleBtn.addEventListener("click", toggle);

	// Close menu when a nav link is clicked
	menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
})();

// -- Reveal sections on viewport (IntersectionObserver)
(() => {
	const options = { threshold: 0.1, rootMargin: "0px 0px -100px 0px" };
	const io = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) entry.target.classList.add("visible");
		});
	}, options);

	document.querySelectorAll("section").forEach((section) => io.observe(section));
})();

// -- Contact form submission
// Supports three modes:
//   1) Native POST (e.g., Formspree): use <form action="..." method="POST"> (no handler here)
//   2) Mailto fallback: add data-mailto to the form element
//   3) Optional AJAX: add data-ajax="true" and data-endpoint="https://..." (POST JSON)
(() => {
	const form = document.querySelector(".contact-form");
	if (!form) return;

	// If developer wants mailto behavior, add data-mailto attribute in HTML
	const useMailto = form.hasAttribute("data-mailto");
	const useAjax = form.getAttribute("data-ajax") === "true";
	const endpoint = form.getAttribute("data-endpoint");

	if (useMailto) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			const fd = new FormData(form);

			const subject = encodeURIComponent(fd.get("subject"));
			const body = encodeURIComponent(
				`Name: ${fd.get("name")}\n` +
				`Email: ${fd.get("email")}\n\n` +
				`Message:\n${fd.get("message")}`
			);

			window.location.href = `mailto:letisjamuco@gmail.com?subject=${subject}&body=${body}`;
			form.reset();
			alert("Thank you! Your message has been prepared in your email client.");
		});
	} else if (useAjax && endpoint) {
		form.addEventListener("submit", async (e) => {
			e.preventDefault();
			const fd = new FormData(form);
			const payload = Object.fromEntries(fd.entries());

			try {
				const res = await fetch(endpoint, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload)
				});
				if (!res.ok) throw new Error("Network response was not ok");
				form.reset();
				alert("Thank you! Your message has been sent successfully.");
			} catch (err) {
				console.error(err);
				alert("Oops! Something went wrong. Please try again later.");
			}
		});
	}
	// If neither data-mailto nor data-ajax is set, the form will submit natively (e.g., Formspree).
})();

// -- Smooth scroll for internal anchor links
(() => {
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			const hash = this.getAttribute("href");
			if (!hash || hash === "#") return;

			const target = document.querySelector(hash);
			if (!target) return;

			e.preventDefault();
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		});
	});
})();
