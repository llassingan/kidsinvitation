# Design Document --- Islamic Wonderland

## Interactive Digital Invitation: Aqiqah & Khitanan

**Design direction:** Contemporary Islamic Architecture × 3D Children's
Animation\
**Experience:** Interactive, playful, whimsical, warm, and memorable\
**Platform:** Responsive web application (mobile-first)

------------------------------------------------------------------------

# 1. Project Overview

## 1.1 Vision

Create an immersive digital invitation website for an Islamic
celebration combining Aqiqah and Khitanan ceremonies.

The website should feel less like a conventional digital invitation and
more like opening a magical storybook. Guests experience a journey from
opening an invitation envelope, discovering the child's identity,
exploring event details, and leaving prayers and wishes for the child.

The visual identity combines three major elements:

1.  **Hagia Sophia-inspired architecture:** grand domes, Islamic arches,
    intricate geometric patterns, mosaic details, and elegant
    architectural silhouettes.
2.  **Contemporary Islamic design:** modern layouts, sophisticated
    typography, warm neutral palettes, Islamic geometric motifs, and
    decorative Arabic calligraphy.
3.  **3D children's animation:** original, expressive Muslim boy
    characters with rounded proportions, cheerful expressions, playful
    poses, and colorful environments.

The overall atmosphere must remain fun, innocent, warm, and
child-oriented rather than formal or overly ceremonial.

## 1.2 Design Principles

-   **Storytelling first:** Every section should feel like another
    chapter in a children's storybook.
-   **Playful interactions:** Animations should encourage exploration
    and interaction.
-   **Islamic identity:** Islamic visual elements should be integrated
    naturally without making the interface feel traditional or outdated.
-   **Child-centric:** The child is the central character of the
    invitation.
-   **Elegant but fun:** Balance architectural sophistication with
    colorful children's illustrations.
-   **Performance-conscious:** Rich animations should remain lightweight
    and smooth, especially on mobile devices.

# 2. Visual Identity

## 2.1 Color Palette

Use a warm, playful palette inspired by Islamic architecture, Turkish
mosaics, and children's storybooks.

  Color           Hex         Usage
  --------------- ----------- ----------------------------------------
  Deep Teal       `#174F50`   Primary background and strong contrast
  Emerald         `#287B67`   Primary accent
  Turquoise       `#70C6BB`   Decorative elements
  Warm Cream      `#FFF5E5`   Main background
  Golden Sand     `#D9AE68`   Architectural details
  Soft Gold       `#F2D59A`   Highlights
  Terracotta      `#D98465`   Playful accent
  Sky Blue        `#A9D5E8`   Illustration backgrounds
  Soft Lavender   `#C7B9DD`   Secondary accent

The dominant background should be warm cream. Deep teal and emerald
provide contrast, while gold establishes the architectural identity.
Avoid excessive gradients and overly saturated colors.

## 2.2 Typography

Use a combination of expressive display typography and readable
sans-serif typography.

-   **Display:** Playfair Display or Cormorant Garamond.
-   **Body:** Plus Jakarta Sans or Nunito.
-   **Arabic:** Amiri or Noto Naskh Arabic.
-   **Decorative labels:** Nunito Sans with slightly expanded letter
    spacing.

Typography should feel friendly and elegant, not corporate.

## 2.3 Architectural Language

Architectural references should be inspired by:

-   Hagia Sophia's grand central dome.
-   Ottoman-style pointed arches.
-   Islamic geometric star patterns.
-   Decorative arabesque motifs.
-   Mosaic-inspired decorative borders.
-   Minarets and architectural silhouettes.
-   Ornamental window patterns.

Use these elements as decorative framing rather than reproducing an
entire building in every section.

## 2.4 Illustration Direction

All major illustrations must use original 3D cartoon artwork.

### Character concept

An adorable Indonesian Muslim boy wearing traditional Muslim clothing.

**Visual characteristics:** - Rounded, slightly oversized head. - Large
expressive eyes. - Soft facial features. - Small, friendly smile. -
Rounded hands and feet. - Smooth, stylized 3D materials. - Soft ambient
lighting. - Colorful but harmonious clothing. - Expressive and
exaggerated poses.

**Wardrobe:** - White koko shirt. - Cream or pastel-colored baju koko. -
Sarong or comfortable trousers. - Black or white peci. - Optional
sandals.

The artistic direction should capture the general appeal of high-quality
Indonesian family-friendly 3D children's animation, with a distinctive
original character design. Do not reproduce existing copyrighted
characters.

**Character consistency is essential:** The same boy should appear
throughout the website, with different expressions, poses, outfits, and
activities.

Suggested character variations: - Holding a crescent moon. - Waving at
visitors. - Reading the Quran. - Sitting on a decorative Islamic
carpet. - Standing beside a mosque arch. - Holding a small invitation
card. - Celebrating with balloons and confetti. - Making a prayer
gesture.

# 3. Website Experience & Information Architecture

The website consists of six primary sections:

1.  Invitation Cover
2.  Opening Greeting
3.  Child Profile
4.  Event Details
5.  Event Location
6.  Wishes & Prayers

The experience should feel like scrolling through an interactive
illustrated storybook.

# 4. Section Design Specifications

## 4.1 Section 01 --- Interactive Invitation Cover

**Purpose:** Create a memorable first impression and introduce the
invitation.

### Visual composition

The initial screen should resemble a luxurious Islamic invitation
envelope.

Elements: - Full-screen warm cream background. - Large Islamic
arch-shaped invitation cover. - Deep teal decorative frame. - Gold
geometric patterns. - Decorative crescent moon. - Small 3D Muslim boy
character peeking from behind the envelope. - Floating stars and subtle
sparkles. - Invitation title.

### Suggested copy

> بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
>
> **You're Invited!**
>
> A Special Celebration of
>
> **Aqiqah & Khitanan**
>
> \[Child's Name\]

### Opening interaction

The cover must behave like a physical invitation.

Animation sequence:

1.  The invitation envelope enters the screen with a gentle scale and
    fade animation.
2.  Decorative stars appear around the envelope.
3.  The character peeks from behind the cover.
4.  The invitation seal gently pulses.
5.  A clear CTA appears: **Buka Undangan**.
6.  When clicked, the envelope flap rotates open.
7.  The inner invitation card slides upward.
8.  Gold particles and subtle confetti appear.
9.  The camera transitions into the main invitation experience.

The opening animation should be the most elaborate animation on the
website.

### Technical implementation

Use CSS 3D transforms: - `perspective` -
`transform-style: preserve-3d` - `rotateX()` - `backface-visibility` -
`transform-origin`

Use Framer Motion for entrance transitions and coordinated animations.

The opening should be user-triggered to comply with browser autoplay
restrictions.

## 4.2 Section 02 --- Opening Greeting

**Purpose:** Introduce the event with a warm Islamic greeting.

### Visual composition

A large Ottoman-inspired arch with an illustrated 3D boy standing in the
center.

Background: - Warm cream. - Subtle geometric Islamic pattern. -
Decorative mosque silhouette. - Small floating clouds. - Crescent moon
and stars.

### Content

Arabic greeting:

> السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ

Indonesian greeting:

> Assalamu'alaikum Warahmatullahi Wabarakatuh.
>
> Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud mengundang
> Bapak/Ibu/Saudara/i untuk menghadiri acara syukuran aqiqah dan
> khitanan putra tercinta kami.

### Animation

-   The arch reveals itself using a vertical mask animation.
-   Arabic calligraphy fades in.
-   The character waves at visitors.
-   Clouds move slowly in the background.
-   Decorative stars float gently.

## 4.3 Section 03 --- Meet Our Little Prince

**Purpose:** Introduce the child and parents. This should be the
emotional centerpiece of the website.

### Visual composition

Create a playful character showcase.

The boy should appear in a large 3D illustration, standing on a
decorative circular platform inspired by Islamic mosaic flooring.

Background elements: - Large architectural arch. - Geometric patterns. -
Floating decorative stars. - Small plants and flowers. - Soft ambient
shadows.

### Content structure

**Meet Our Little Prince**

**\[Child's Name\]**

-   Nama lengkap: \[Full Name\]
-   Tempat, tanggal lahir: \[Birthplace, Date\]

Putra dari:

**Bapak \[Father's Name\]**\
&\
**Ibu \[Mother's Name\]**

Optional supporting text:

> Semoga tumbuh menjadi anak yang shalih, berakhlak mulia, dan
> senantiasa menjadi penyejuk hati keluarga.

### Animation

-   Character enters with a playful bounce.
-   Profile information reveals sequentially.
-   Decorative elements float at different speeds.
-   A small star appears when the child's name is revealed.
-   The character changes expressions when scrolling.

Use scroll-triggered animation with restrained parallax effects.

## 4.4 Section 04 --- Event Details

**Purpose:** Communicate the event schedule clearly.

### Visual composition

Design this section as an illustrated Islamic calendar or event
announcement board.

A large decorative arch frames the event information.

Use two visually distinct event labels: - AQIQAH - KHITANAN

Both should be presented as one unified celebration.

### Content

**Save the Date**

-   Hari/Tanggal: \[Day, Date\]
-   Waktu: \[Start Time\] -- \[End Time\] WIB
-   Acara:
    -   Syukuran Aqiqah
    -   Syukuran Khitanan
    -   Doa Bersama
    -   Ramah Tamah
-   Optional dress code: \[Dress Code\]

### Animation

-   Calendar card slides into view.
-   Date numbers animate with a slight scale effect.
-   Small 3D boy character points toward the event date.
-   Decorative stars appear sequentially.
-   Timeline items reveal one by one.

Include a countdown timer to the event.

Countdown components: - Days - Hours - Minutes - Seconds

The countdown must use the event's actual date and timezone.

## 4.5 Section 05 --- Location & Venue

**Purpose:** Make it easy for guests to find the event.

### Visual composition

Use a playful illustrated map environment.

Visual elements: - A small mosque-inspired building. - Trees and
flowers. - Decorative road. - A 3D Muslim boy character holding a
direction sign. - A location marker with a gentle bounce.

### Content

**Where the Celebration Happens**

-   \[Venue Name\]
-   \[Full Address\]
-   \[Additional Location Instructions\]

CTA: **Open Google Maps**

The CTA should open the exact Google Maps destination in a new browser
tab.

### Animation

-   Map elements appear progressively.
-   Character walks toward the venue marker.
-   Location pin bounces once when entering the viewport.
-   Clouds move slowly in the background.

The map itself should be functional, not just an illustration. An
embedded map can be provided as an optional secondary element.

## 4.6 Section 06 --- Wishes & Prayers

**Purpose:** Allow guests to submit their prayers and wishes for the
child.

This is the final interactive chapter of the invitation.

### Visual composition

A magical garden with an Islamic architectural arch in the background.

The 3D character sits on a carpet while holding a small glowing lantern.

Background: - Deep teal to emerald gradient. - Warm golden lights. -
Floating stars. - Crescent moon. - Islamic geometric ornaments.

### Content

**Your Prayers Mean the World to Us**

> Doa dan harapan terbaik dari Bapak/Ibu/Saudara/i akan menjadi hadiah
> yang sangat berarti bagi tumbuh kembang putra kami.

### Wish form

Fields: - Nama Pengirim - Ucapan & Doa

CTA: **Kirim Doa**

### Form behavior

-   Validate required fields.
-   Show a friendly success animation after submission.
-   Display a confirmation message.
-   Store submissions in a backend database.
-   Display submitted wishes as decorative cards.

Suggested success message:

> Alhamdulillah! Terima kasih atas doa dan harapan baiknya. Semoga Allah
> membalas dengan kebaikan yang berlipat.

The wish cards should resemble small floating letters or storybook
notes.

# 5. Global Interaction & Animation System

Animations should be present throughout the experience, but each section
should have its own animation identity.

  Section         Main animation           Supporting animation
  --------------- ------------------------ ----------------------------------
  Cover           3D envelope opening      Sparkles, floating stars
  Greeting        Arch reveal              Character waving, clouds
  Child Profile   Character entrance       Parallax, information reveal
  Event Details   Calendar reveal          Countdown, pointing character
  Location        Illustrated map reveal   Walking character, bouncing pin
  Wishes          Magical garden reveal    Floating lanterns, glowing stars

## 5.1 Animation guidelines

-   Use smooth spring animations for character movement.
-   Use ease-out transitions for content reveals.
-   Use staggered animation for decorative elements.
-   Use parallax sparingly.
-   Avoid excessive bouncing.
-   Keep text animations subtle and readable.
-   Avoid animating every element simultaneously.

Recommended animation durations:

  Animation             Duration
  --------------------- ---------------
  Small interactions    200--350 ms
  Section transitions   500--800 ms
  Character entrances   700--1200 ms
  Cover opening         1500--2500 ms
  Ambient floating      3000--6000 ms

## 5.2 Scroll experience

Use scroll-triggered animations to reveal each section.

Recommended behavior: - Fade and slide content into view. - Animate
illustrations independently. - Apply subtle parallax to architectural
backgrounds. - Use staggered reveals for text and cards.

Avoid scroll hijacking. Guests must retain normal scrolling behavior.

## 5.3 Music

Optional background instrumental music with a gentle, cheerful
atmosphere.

Requirements: - Never autoplay with sound before user interaction. -
Provide a persistent mute/unmute button. - Respect device and browser
audio policies. - Use original or properly licensed music.

# 6. Layout & Responsive Design

## 6.1 Mobile-first

The invitation will primarily be accessed through WhatsApp links on
mobile devices.

Priorities: - Full-width content. - Readable typography. - Large touch
targets. - Lightweight illustrations. - Vertical storytelling layout. -
Minimal horizontal scrolling.

## 6.2 Desktop

On desktop, use a centered invitation canvas with a maximum width of
approximately 1200 px.

Some sections can use asymmetric two-column layouts: - Illustration on
one side. - Information on the other.

The cover should remain immersive and fill the viewport.

## 6.3 Responsive breakpoints

  Breakpoint   Layout
  ------------ --------------
  Mobile       \< 640 px
  Tablet       640--1024 px
  Desktop      \> 1024 px

# 7. Technical Architecture

## 7.1 Recommended technology stack

  Technology          Purpose
  ------------------- ---------------------------------
  Next.js             Frontend framework
  TypeScript          Type safety
  Tailwind CSS        Styling
  Framer Motion       UI animations
  GSAP                Advanced coordinated animations
  React Three Fiber   Optional 3D scene rendering
  Lucide Icons        Interface icons
  Supabase            Database and form submissions
  Google Maps         Event navigation

## 7.2 3D rendering strategy

Do not render the entire website as a 3D scene.

Instead, use a hybrid approach: - Pre-rendered 3D character
illustrations for most sections. - CSS 3D transforms for the invitation
envelope. - Framer Motion for interface animations. - React Three Fiber
only for optional interactive 3D elements.

This approach delivers the desired visual richness without making the
website unnecessarily heavy.

Recommended image formats: - WebP for character illustrations. - AVIF
for large photographic assets where supported. - SVG for Islamic
geometric patterns and ornamental borders. - PNG only when transparency
or compatibility requires it.

## 7.3 Suggested project structure

``` text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── invitation/
│   │   ├── InvitationCover.tsx
│   │   ├── OpeningGreeting.tsx
│   │   ├── ChildProfile.tsx
│   │   ├── EventDetails.tsx
│   │   ├── EventLocation.tsx
│   │   └── WishesSection.tsx
│   │
│   ├── characters/
│   │   └── MuslimBoy.tsx
│   │
│   ├── animations/
│   │   ├── FloatingStars.tsx
│   │   ├── ParallaxLayer.tsx
│   │   └── ScrollReveal.tsx
│   │
│   ├── ui/
│   │   ├── IslamicArch.tsx
│   │   ├── DecorativePattern.tsx
│   │   ├── MusicToggle.tsx
│   │   └── Countdown.tsx
│   │
│   └── forms/
│       └── WishesForm.tsx
│
├── lib/
│   ├── supabase.ts
│   └── utils.ts
│
├── data/
│   └── invitation.ts
│
└── public/
    ├── images/
    │   ├── characters/
    │   ├── backgrounds/
    │   └── decorations/
    ├── patterns/
    ├── fonts/
    └── audio/
```

# 8. Data Configuration

All invitation information should be centralized in a configuration
file.

Example:

``` typescript
export const invitation = {
  child: {
    name: "Muhammad [Name]",
    fullName: "Muhammad [Full Name]",
    birthDate: "[Birth Date]",
    birthplace: "[Birthplace]",
    father: "[Father's Name]",
    mother: "[Mother's Name]",
  },

  event: {
    title: "Aqiqah & Khitanan",
    date: "2026-12-20",
    startTime: "09:00",
    endTime: "12:00",
    timezone: "Asia/Makassar",
  },

  venue: {
    name: "[Venue Name]",
    address: "[Full Address]",
    mapsUrl: "[Google Maps URL]",
  },

  wishes: {
    enabled: true,
    showPublicWishes: true,
  },
};
```

The website should be reusable for future events by changing
configuration data without modifying the core components.

# 9. Performance & Accessibility

Rich animation must not compromise usability.

Requirements:

1.  Target Lighthouse Performance score of 90+ where practical.
2.  Lazy-load below-the-fold illustrations.
3.  Optimize all large character images.
4.  Avoid unnecessarily large JavaScript bundles.
5.  Avoid loading multiple heavy 3D scenes.
6.  Use `prefers-reduced-motion` to provide a reduced-animation
    experience.
7.  Ensure adequate text contrast.
8.  Provide descriptive alt text for meaningful illustrations.
9.  Ensure the invitation works without background music.
10. Keep form controls accessible and mobile-friendly.

The cover animation should have a lightweight fallback for low-powered
devices.

# 10. SEO & Social Sharing

The invitation should have a proper social sharing preview when shared
through WhatsApp.

Metadata: - Title: Undangan Aqiqah & Khitanan \[Child's Name\] -
Description: Undangan syukuran aqiqah dan khitanan putra kami. - Open
Graph image: A custom invitation cover illustration. - Theme color: Deep
teal.

Use a dedicated Open Graph image in 1200 × 630 resolution.

# 11. Acceptance Criteria

The implementation is considered complete when:

-   [ ] The opening cover resembles a physical Islamic invitation.
-   [ ] The cover can be opened through a user interaction.
-   [ ] The opening animation feels smooth and immersive.
-   [ ] Every section has its own animation.
-   [ ] Every section has at least one meaningful illustration.
-   [ ] The original 3D Muslim boy character remains visually
    consistent.
-   [ ] The Hagia Sophia-inspired architectural language is
    recognizable.
-   [ ] All event information is clearly presented.
-   [ ] The child and parents' information is displayed.
-   [ ] The countdown reflects the actual event date.
-   [ ] Google Maps navigation works correctly.
-   [ ] Guests can submit wishes and prayers.
-   [ ] Submission feedback is provided.
-   [ ] The website is responsive.
-   [ ] Animations respect reduced-motion preferences.
-   [ ] The website loads efficiently on mobile networks.

# 12. Final Creative Direction

The final website should feel like a combination of:

**A beautiful Islamic storybook + a magical children's animation + an
elegant digital invitation.**

Imagine opening a beautifully decorated Islamic envelope. A cheerful
little Muslim boy welcomes you. You enter a colorful world filled with
domes, arches, stars, mosaics, and playful illustrations.

As you scroll, the story unfolds: you meet the little prince, discover
the celebration details, find the venue, and finally leave your prayers
for his future.

The experience should make guests smile.

**The most important design rule: Do not make this look like a corporate
event landing page. Make it feel like a magical celebration created
especially for a little boy.**
