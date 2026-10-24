# The Atelier — Royal Wedding Invitations

> **"Your wedding. Your story. Beautifully invited."**  
> *Indian Heritage × Contemporary Editorial Luxury*  
> A premium customer-facing web destination and bespoke digital wedding invitation service tailored for Indian couples globally.

---

## ⚜️ Platform Overview

The Atelier platform provides an end-to-end customer discovery and design experience:
1. **Studio Homepage (`#/`)**: High-editorial brand introduction, curated collection highlights, a 3-step design process, studio capabilities, and commission call-to-action.
2. **The Collection Catalogue (`#/catalogue`)**: Browsable collection of all 10 architectural invitation suites with category filters, live search, color swatch tooltips, and customization triggers.
3. **Template Presentation Pages (`#/template-detail/:id`)**: Dedicated showcase for each suite featuring aesthetic stories, color token systems, typography specimens, feature checklists, and embedded live previews (Desktop vs. Mobile WhatsApp view).
4. **Interactive Invitation Suites (`#/template/:id`)**: Full-screen live interactive invitations for all 10 designs, complete with countdowns, multi-day schedules, directions modals, calendar export, photo lightbox, ambient raga music, and validated RSVP.
5. **Customer Commission Enquiry Flow (`#/enquire`)**: Fully validated booking and consultation enquiry form with template pre-selection, service options, instant confirmation state, and pre-formatted WhatsApp consultation generator.

---

## 🏛️ The 10 Curated Collections

### Collection 1: Indian Heritage
1. **01 — The Royal Heirloom** (`royal-heirloom`):
   - *Palette*: Warm Ivory (`#FAF6F0`), Antique Gold (`#C5A059`), Imperial Burgundy (`#5E1924`), Rose Blush.
   - *Design*: Mewar palace arches, wax-seal unfold interaction, gold jaali borders, Sanskrit blessings. Original Aadhya & Veer foundation.
2. **02 — The Mewar Mehfil** (`mewar-mehfil`):
   - *Palette*: Deep Vermilion (`#C53726`), Auspicious Saffron (`#E67E22`), Royal Emerald (`#0C4B35`), Gold Leaf.
   - *Design*: Rajasthani miniature court paintings, ornate stepped floral borders, and festive jewel-toned typography.

### Collection 2: Royal & Destination
3. **03 — The Palace Celebration** (`palace-celebration`):
   - *Palette*: Deep Velvet Wine (`#480E1A`), Burnished Brass (`#B38F4D`), Champagne Silk (`#FDF5E6`).
   - *Design*: Velvet-inspired textures, candlelit palace courtyard photography, and dramatic starlit evening atmosphere.
4. **04 — The Regal Chronicle** (`regal-chronicle`):
   - *Palette*: Midnight Blue (`#0A1526`), Embossed Gold (`#D4AF37`), Steel Blue (`#1E3A8A`).
   - *Design*: Stately bilateral architectural symmetry, imperial heraldry crest, and solemn ceremonial proclamation.
5. **05 — The Garden Royale** (`garden-royale`):
   - *Palette*: Heritage Sage (`#4A6B5D`), Blush Rose (`#E8D2CB`), Lawn Cream (`#FAF7F2`), Champagne Gold.
   - *Design*: Botanical leaf engravings, soft pastel floral ceremony cards, and romantic palace lawn soirée aesthetic.
6. **06 — The Desert Royale** (`desert-royale`):
   - *Palette*: Warm Terracotta (`#C86D51`), Jaisalmer Sandstone (`#E09F67`), Desert Ivory (`#F9F5EE`).
   - *Design*: Earthy sandstone fortresses, stepped stone jharokhas, sunset Pheras framing, and warm golden-hour tones.

### Collection 3: Minimal & Editorial
7. **07 — The Modern Editorial** (`modern-editorial`):
   - *Palette*: Pure Chalk (`#FFFFFF`), Editorial Black (`#141414`), Muted Gold (`#B89B5E`), Warm Ash.
   - *Design*: High-fashion magazine masthead, oversized serif headlines, and contemporary asymmetrical photographic balance.
8. **08 — The Floral Minimal** (`floral-minimal`):
   - *Palette*: Alabaster (`#FCFAF7`), Dusty Rose (`#C49486`), Warm Sepia (`#4A3F3B`), Soft Brass.
   - *Design*: Delicate line-art botanical artwork, alabaster background, refined serif typography, and generous whitespace.
9. **09 — The Timeless Editorial** (`timeless-editorial`):
   - *Palette*: True Noir (`#0D0D0D`), Pure White (`#FFFFFF`), Silver Foil (`#C0C0C0`), Pewter Grey.
   - *Design*: Striking monochrome photography, razor-sharp typography, and coffee-table monograph composition.
10. **10 — The Destination Edit** (`destination-edit`):
    - *Palette*: Lake Pichola Blue (`#1C3D5A`), Sand Castle (`#DBC5A4`), Sunlit Marble (`#F9F8F5`).
    - *Design*: Wide-angle landscape panoramas, Lake Pichola boat transfer schedules, weather notes, and guest arrival concierge.

---

## 🗺️ Complete Route Map

The application uses client-side hash routing compatible with static hosting, WhatsApp sharing, and browser history:

| Route | View | Description | Status |
| :--- | :--- | :--- | :--- |
| `#/` | **Studio Homepage** | Hero, featured suites spotlight, 3-step bespoke process, features grid, commission CTA. | **Live** |
| `#/catalogue` | **The Collection** | All 10 suites with category tabs (*Heritage, Royal, Minimal*), search, swatches, and actions. | **Live** |
| `#/template-detail/:id` | **Suite Details** | Dedicated presentation page for any suite with desktop/mobile preview and customize CTA. | **Live** |
| `#/template/:id` | **Interactive Suite** | Full-screen live interactive invitation for any of the 10 suites (preserves all original views). | **Live** |
| `#/enquire` | **Commission Enquiry** | Validated commission form with couple details, destination, guest count, and WhatsApp consultation. | **Live** |

---

## 🚀 Setup & Run Instructions

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
# Server running at: http://localhost:3000

# 3. Production build
npm run build
```

---

## 🛠️ Architecture Highlights

- **`src/components/studio/StudioNav.tsx`**: Unified studio navigation with responsive mobile drawer.
- **`src/components/studio/StudioHomePage.tsx`**: High-editorial studio homepage with hero, process, features, and spotlight collections.
- **`src/components/studio/TemplateDetailPage.tsx`**: Suite presentation page with color tokens, typography specimen, and live embedded preview.
- **`src/components/studio/EnquiryView.tsx`**: Customer booking enquiry form with validation, confirmation state, and WhatsApp link generator.
- **`src/components/catalogue/CatalogueView.tsx`**: 10-suite grid with search, category filtering, and direct links to details or customization.
- **`src/templates/`**: 10 distinct template components ensuring genuinely varied compositions.
- **`src/components/AudioPlayer.tsx`**: Global Web Audio API ambient tanpura raga player with non-autoplay controls.
- **`src/components/AdminEditorDrawer.tsx`**: Instant sample data editor to customize couple names, dates, and venues live in the browser.
