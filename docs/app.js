const app = document.querySelector("#app");

const fallbackContent = {
  business: {
    name: "Aurum Luxe Cars",
    shortName: "A",
    tagline: "Luxury chauffeur service",
    whatsappNumber: "910000000000",
    phone: "+91 00000 00000",
    phoneHref: "+910000000000",
    email: "booking@aurumluxecars.com",
    location: "Bangalore, Karnataka",
    description: "Luxury airport transfers, corporate travel, weddings, outstation rides, and private hourly rentals.",
  },
  navigation: [
    { label: "Services", href: "#services" },
    { label: "Airport", href: "#services" },
    { label: "Corporate", href: "#experiences" },
    { label: "Fleet", href: "#fleet" },
    { label: "Experiences", href: "#experiences" },
    { label: "Weddings", href: "#gallery" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#faq" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Private luxury cars with professional chauffeurs",
    slides: [
      {
        tab: "Airport",
        tabNote: "Meet-and-greet arrivals",
        title: "Arrive with quiet confidence.",
        copy: "Premium sedans, SUVs, and executive vans for airport transfers, business movement, weddings, and curated outstation journeys.",
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=2200&q=84",
      },
    ],
  },
  booking: {
    eyebrow: "Instant concierge request",
    title: "Tell us the occasion. We will pair the car, chauffeur, and route.",
    serviceOptions: ["Airport Transfer", "Corporate Travel", "Wedding Car", "Hourly Rental", "Outstation Trip"],
  },
  services: { eyebrow: "Our Services", title: "Luxury travel services.", items: [] },
  experiences: { eyebrow: "Signature experiences", title: "Every ride feels composed.", copy: "", stats: [], items: [] },
  fleet: { eyebrow: "Our Fleet", title: "Luxury cars selected for comfort.", items: [] },
  whyChooseUs: { eyebrow: "Why choose us", title: "Luxury is punctual, clean, calm, and handled.", items: [] },
  gallery: { eyebrow: "Travel Gallery", title: "Elegant cars and polished cabins.", images: [] },
  faq: { eyebrow: "FAQ", title: "Everything clients usually ask before booking.", items: [] },
  cta: { eyebrow: "Ready to book?", title: "Your next arrival should feel effortless.", copy: "" },
  footer: { copyright: "© 2026 Aurum Luxe Cars. All rights reserved.", legal: "Privacy Policy · Terms & Conditions" },
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function whatsappUrl(content, message) {
  return `https://wa.me/${content.business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function brandTemplate(content, footer = false) {
  return `
    <a class="brand${footer ? " footer-brand" : ""}" href="#top" aria-label="${escapeHtml(content.business.name)} home">
      <span class="brand-mark">${escapeHtml(content.business.shortName)}</span>
      <span>
        <strong>${escapeHtml(content.business.name)}</strong>
        <small>${escapeHtml(footer ? "Premium chauffeur rentals" : content.business.tagline)}</small>
      </span>
    </a>
  `;
}

function sectionHeading(section, linkHref, linkLabel) {
  return `
    <div class="section-heading">
      <p class="eyebrow dark">${escapeHtml(section.eyebrow)}</p>
      <h2>${escapeHtml(section.title)}</h2>
      ${linkLabel ? `<a href="${escapeHtml(linkHref)}">${escapeHtml(linkLabel)}</a>` : ""}
    </div>
  `;
}

function renderPage(content) {
  const firstSlide = content.hero.slides[0];
  const navLinks = content.navigation
    .map((item) => `<a href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`)
    .join("");
  const bookingMessage = `Hello ${content.business.name}, I want to book a luxury car.`;

  document.title = `${content.business.name} | Luxury Chauffeur & Premium Car Rentals`;

  app.innerHTML = `
    <header class="site-header" id="top">
      <nav class="nav-shell" aria-label="Primary navigation">
        ${brandTemplate(content)}
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <div class="nav-links" data-nav-links>${navLinks}</div>
        <div class="nav-status" aria-label="Service status">
          <span class="status-dot"></span>
          <span>24/7 concierge</span>
        </div>
        <a class="nav-cta" href="${whatsappUrl(content, bookingMessage)}" target="_blank" rel="noreferrer">Book Now</a>
      </nav>
    </header>

    <main>
      <section class="hero" aria-label="Luxury car rental hero">
        <div class="hero-media" data-hero-media style="background-image: url('${escapeHtml(firstSlide.image)}')"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <p class="eyebrow">${escapeHtml(content.hero.eyebrow)}</p>
          <h1 data-hero-title>${escapeHtml(firstSlide.title)}</h1>
          <p data-hero-copy>${escapeHtml(firstSlide.copy)}</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#booking">Reserve a Car</a>
            <a class="button button-ghost" href="#fleet">View Fleet</a>
          </div>
          <div class="hero-widgets" aria-label="Service widgets">
            <div class="widget-card">
              <span>Live availability</span>
              <strong>18 premium cars</strong>
              <small>7 ready now</small>
            </div>
            <div class="widget-card">
              <span>Avg. response</span>
              <strong>Under 4 mins</strong>
              <small>WhatsApp concierge</small>
            </div>
            <div class="widget-card">
              <span>Trusted by</span>
              <strong>2,400+ clients</strong>
              <small>Corporate & events</small>
            </div>
          </div>
          <div class="hero-meta" aria-label="Luxury service highlights">
            <span>Verified chauffeurs</span>
            <span>Sanitized premium fleet</span>
            <span>WhatsApp concierge</span>
          </div>
          <div class="hero-tabs" role="tablist" aria-label="Featured services">
            ${content.hero.slides
              .map(
                (slide, index) => `
                  <button class="hero-tab${index === 0 ? " active" : ""}" type="button" data-slide="${index}" role="tab" aria-selected="${index === 0}">
                    ${escapeHtml(slide.tab)}
                    <span>${escapeHtml(slide.tabNote)}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="quick-book" id="booking" aria-label="Quick booking form">
        <div class="section-inner booking-grid">
          <div>
            <p class="eyebrow dark">${escapeHtml(content.booking.eyebrow)}</p>
            <h2>${escapeHtml(content.booking.title)}</h2>
          </div>
          <form class="booking-form" data-booking-form>
            <label>
              Service
              <select name="service" aria-label="Service type">
                ${content.booking.serviceOptions.map((option) => `<option>${escapeHtml(option)}</option>`).join("")}
              </select>
            </label>
            <label>
              Vehicle
              <select name="model" aria-label="Vehicle model">
                <option value="">Any suitable vehicle</option>
                ${content.fleet.items.map((car) => `<option value="${escapeHtml(car.name)}">${escapeHtml(car.name)}</option>`).join("")}
              </select>
            </label>
              <label>Pickup <input name="pickup" type="text" placeholder="Location or airport" required /></label>
            <label>Date <input name="date" type="date" required /></label>
            <button class="button button-dark" type="submit">Request Quote</button>
          </form>
          <p class="booking-status" data-booking-status role="status" aria-live="polite"></p>
        </div>
      </section>

      <section class="trust-strip" aria-label="Service guarantees">
        <div class="section-inner trust-grid">
          <span>Airport meet-and-greet</span>
          <span>Corporate billing ready</span>
          <span>Wedding convoy planning</span>
          <span>Outstation packages</span>
        </div>
      </section>

      <section class="section" id="services">
        ${sectionHeading(content.services, "#contact", content.services.linkLabel)}
        <div class="card-grid services-grid">
          ${content.services.items
            .map(
              (item, index) => `
                <article class="service-card">
                  <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" />
                  <div>
                    <span>${escapeHtml(item.label)}</span>
                    <h3>${escapeHtml(item.title)}</h3>
                    <p>${escapeHtml(item.copy)}</p>
                    <small>0${index + 1}</small>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="split-band" id="experiences" style="background-image: linear-gradient(90deg, rgba(15, 15, 15, 0.96), rgba(15, 15, 15, 0.78)), url('${escapeHtml(content.experiences.background)}')">
        <div class="split-copy">
          <p class="eyebrow">${escapeHtml(content.experiences.eyebrow)}</p>
          <h2>${escapeHtml(content.experiences.title)}</h2>
          <p>${escapeHtml(content.experiences.copy)}</p>
          <div class="stats">
            ${content.experiences.stats.map((stat) => `<strong>${escapeHtml(stat.value)}<span>${escapeHtml(stat.label)}</span></strong>`).join("")}
          </div>
        </div>
        <div class="experience-list">
          ${content.experiences.items
            .map((item) => `<a href="#booking">${escapeHtml(item.name)} <span>${escapeHtml(item.price)}</span></a>`)
            .join("")}
        </div>
      </section>

      <section class="section" id="fleet">
        ${sectionHeading(content.fleet, "#booking", content.fleet.linkLabel)}
        <div class="fleet-grid">
          ${content.fleet.items
            .map(
              (car) => `
                <article class="fleet-card${car.featured ? " featured" : ""}">
                  <img src="${escapeHtml(car.image)}" alt="${escapeHtml(car.alt)}" />
                  <div>
                    <p>${escapeHtml(car.category)}</p>
                    <h3>${escapeHtml(car.name)}</h3>
                    <span>${escapeHtml(car.details)}</span>
                    <strong>${escapeHtml(car.price)}</strong>
                    <button class="fleet-reserve" type="button" data-model="${escapeHtml(car.name)}">Reserve this model</button>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="why-band">
        <div class="section-inner why-grid">
          <div>
            <p class="eyebrow">${escapeHtml(content.whyChooseUs.eyebrow)}</p>
            <h2>${escapeHtml(content.whyChooseUs.title)}</h2>
          </div>
          <div class="why-points">
            ${content.whyChooseUs.items
              .map((item) => `<article><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.copy)}</p></article>`)
              .join("")}
          </div>
        </div>
      </section>

      <section class="section" id="gallery">
        ${sectionHeading(content.gallery, "#fleet", content.gallery.linkLabel)}
        <div class="gallery-grid">
          ${content.gallery.images.map((image) => `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" />`).join("")}
        </div>
      </section>

      <section class="faq-section" id="faq">
        <div class="section-inner faq-grid">
          <div>
            <p class="eyebrow dark">${escapeHtml(content.faq.eyebrow)}</p>
            <h2>${escapeHtml(content.faq.title)}</h2>
          </div>
          <div class="faq-list">
            ${content.faq.items
              .map(
                (item, index) => `
                  <details ${index === 0 ? "open" : ""}>
                    <summary>${escapeHtml(item.question)}</summary>
                    <p>${escapeHtml(item.answer)}</p>
                  </details>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="cta-panel" id="contact" style="background-image: linear-gradient(90deg, rgba(9, 9, 9, 0.93), rgba(9, 9, 9, 0.7)), url('${escapeHtml(content.cta.image)}')">
        <div>
          <p class="eyebrow">${escapeHtml(content.cta.eyebrow)}</p>
          <h2>${escapeHtml(content.cta.title)}</h2>
          <p>${escapeHtml(content.cta.copy)}</p>
        </div>
        <a class="button button-primary" href="${whatsappUrl(content, `Hello ${content.business.name}, please share luxury car availability.`)}" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
      </section>
    </main>

    <div class="booking-modal" data-booking-modal hidden>
      <div class="booking-modal-backdrop" data-modal-close></div>
      <section class="booking-dialog" role="dialog" aria-modal="true" aria-labelledby="booking-dialog-title">
        <button class="modal-close" type="button" aria-label="Close reservation form" data-modal-close>&times;</button>
        <p class="eyebrow dark">Private reservation</p>
        <h2 id="booking-dialog-title">Reserve <span data-modal-model></span></h2>
        <p class="modal-copy">Share the essentials and our concierge will confirm availability for your selected vehicle.</p>
        <form class="modal-form" data-model-booking-form>
          <input type="hidden" name="model" />
          <label>Pickup location <input name="pickup" type="text" placeholder="Airport, hotel, or address" required /></label>
          <label>Travel date <input name="date" type="date" required /></label>
          <button class="button button-dark" type="submit">Request this model</button>
          <p class="booking-status" data-modal-status role="status" aria-live="polite"></p>
        </form>
      </section>
    </div>

    <footer class="site-footer">
      <div class="footer-grid">
        <div>
          ${brandTemplate(content, true)}
          <p>${escapeHtml(content.business.description)}</p>
        </div>
        <div>
          <h3>Services</h3>
          ${content.services.items.map((item) => `<a href="#services">${escapeHtml(item.title)}</a>`).join("")}
        </div>
        <div>
          <h3>Fleet</h3>
          ${content.fleet.items.map((item) => `<a href="#fleet">${escapeHtml(item.name)}</a>`).join("")}
        </div>
        <div>
          <h3>Contact</h3>
          <a href="tel:${escapeHtml(content.business.phoneHref)}">${escapeHtml(content.business.phone)}</a>
          <a href="mailto:${escapeHtml(content.business.email)}">${escapeHtml(content.business.email)}</a>
          <span>${escapeHtml(content.business.location)}</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>${escapeHtml(content.footer.copyright)}</span>
        <span>${escapeHtml(content.footer.legal)}</span>
      </div>
    </footer>
  `;

  bindInteractions(content);
}

function bindInteractions(content) {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector("[data-nav-links]");
  const heroTitle = document.querySelector("[data-hero-title]");
  const heroCopy = document.querySelector("[data-hero-copy]");
  const heroMedia = document.querySelector("[data-hero-media]");
  const heroTabs = document.querySelectorAll(".hero-tab");
  const bookingForm = document.querySelector("[data-booking-form]");
  const bookingStatus = document.querySelector("[data-booking-status]");
  const bookingModal = document.querySelector("[data-booking-modal]");
  const modalModel = document.querySelector("[data-modal-model]");
  const modalForm = document.querySelector("[data-model-booking-form]");
  const modalStatus = document.querySelector("[data-modal-status]");
  const modalModelField = modalForm.querySelector('[name="model"]');
  const modalDateField = modalForm.querySelector('[name="date"]');

  modalDateField.min = new Date().toISOString().split("T")[0];

  function setSlide(index) {
    const slide = content.hero.slides[index];
    heroTitle.textContent = slide.title;
    heroCopy.textContent = slide.copy;
    heroMedia.style.backgroundImage = `url("${slide.image}")`;
    heroTabs.forEach((tab) => {
      const isActive = tab.dataset.slide === String(index);
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.dataset.model) return;
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      window.setTimeout(() => target.focus({ preventScroll: true }), 350);
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll("[data-model]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      modalModel.textContent = link.dataset.model;
      modalModelField.value = link.dataset.model;
      modalForm.reset();
      modalModelField.value = link.dataset.model;
      modalDateField.min = new Date().toISOString().split("T")[0];
      modalStatus.textContent = "";
      modalStatus.className = "booking-status";
      bookingModal.hidden = false;
      document.body.classList.add("modal-open");
      modalForm.querySelector('[name="pickup"]').focus();
    });
  });

  document.querySelectorAll("[data-modal-close]").forEach((control) => {
    control.addEventListener("click", () => {
      bookingModal.hidden = true;
      document.body.classList.remove("modal-open");
    });
  });

  modalForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    modalStatus.textContent = "Preparing your concierge request...";
    modalStatus.className = "booking-status is-loading";
    const formData = new FormData(modalForm);
    const request = {
      service: "Specific model reservation",
      model: formData.get("model"),
      pickup: formData.get("pickup"),
      date: formData.get("date"),
    };
    const message = `Hello ${content.business.name}, I want to reserve ${request.model}.\nPickup: ${request.pickup}\nDate: ${request.date}`;
    const whatsappWindow = window.open("about:blank", "_blank", "noopener,noreferrer");

    try {
      const response = await fetch("/api/booking-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!response.ok) throw new Error(`Booking API returned ${response.status}`);
      modalStatus.textContent = "Request received. Opening WhatsApp concierge...";
      modalStatus.className = "booking-status is-success";
    } catch (error) {
      console.warn("Could not save model reservation locally.", error);
      modalStatus.textContent = "Opening WhatsApp concierge. Your request can still be sent securely.";
      modalStatus.className = "booking-status is-warning";
    }

    const whatsappTarget = whatsappUrl(content, message);
    if (whatsappWindow) whatsappWindow.location.href = whatsappTarget;
    else window.location.href = whatsappTarget;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !bookingModal.hidden) {
      bookingModal.hidden = true;
      document.body.classList.remove("modal-open");
    }
  });

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  heroTabs.forEach((tab) => {
    tab.addEventListener("click", () => setSlide(Number(tab.dataset.slide)));
  });

  setSlide(0);

  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    bookingStatus.textContent = "Preparing your concierge request...";
    bookingStatus.className = "booking-status is-loading";
    const formData = new FormData(bookingForm);
    const request = {
      service: formData.get("service") || "Luxury car booking",
      model: formData.get("model") || "Any suitable vehicle",
      pickup: formData.get("pickup") || "Pickup not specified",
      date: formData.get("date") || "Date not specified",
    };
    const message = `Hello ${content.business.name}, I need a quote.\nVehicle: ${request.model}\nService: ${request.service}\nPickup: ${request.pickup}\nDate: ${request.date}`;
    const whatsappWindow = window.open("about:blank", "_blank", "noopener,noreferrer");

    try {
      const response = await fetch("/api/booking-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      if (!response.ok) throw new Error(`Booking API returned ${response.status}`);
      bookingStatus.textContent = "Request received. Opening WhatsApp concierge...";
      bookingStatus.className = "booking-status is-success";
    } catch (error) {
      console.warn("Could not save booking request locally.", error);
      bookingStatus.textContent = "Opening WhatsApp concierge. Your request can still be sent securely.";
      bookingStatus.className = "booking-status is-warning";
    }

    const whatsappTarget = whatsappUrl(content, message);
    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappTarget;
    } else {
      window.location.href = whatsappTarget;
    }
  });

  let activeSlide = 0;
  window.setInterval(() => {
    activeSlide = (activeSlide + 1) % content.hero.slides.length;
    setSlide(activeSlide);
  }, 6500);
}

async function init() {
  try {
    const contentUrl = window.SITE_CONTENT_URL || "/api/site-content";
    const response = await fetch(contentUrl);
    if (!response.ok) throw new Error("Could not load content");
    renderPage(await response.json());
  } catch (error) {
    console.warn("Using fallback website content.", error);
    renderPage(fallbackContent);
  }
}

init();
