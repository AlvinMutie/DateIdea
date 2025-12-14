# Safari Date Invitation 🌿

A romantic, nature-themed single-page website designed as a thoughtful date invitation. Built with vanilla HTML, CSS, and JavaScript, featuring smooth animations, a warm respectful tone, and a backend API for email delivery.

## Features

- **Nature-Inspired Design**: Soft greens, earth tones, and elegant typography
- **Smooth Animations**: Word-by-word reveals, breathing gradients, shimmer effects
- **Backend API**: Express + Nodemailer for reliable email delivery
- **Receipt-Style Confirmation**: Emotional, non-transactional confirmation messages
- **Fully Responsive**: Mobile-first design that works on all devices
- **Accessibility**: Respects reduced motion preferences and keyboard navigation
- **Human Motion**: Slow, intentional animations that feel spoken, not mechanical

## Project Structure

```
.
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
├── config.js          # API endpoint configuration
├── backend/            # Express backend
│   ├── server.js       # Main server file
│   ├── package.json    # Dependencies
│   └── env.example     # Environment template
├── netlify.toml        # Netlify configuration
├── DEPLOYMENT.md       # Complete deployment guide
└── README.md          # This file
```

## Quick Start

### Frontend (Netlify)
1. Update `config.js` with your backend URL
2. Deploy to Netlify (see DEPLOYMENT.md)

### Backend (Render)
1. Set up environment variables in `backend/.env`
2. Deploy to Render (see DEPLOYMENT.md)

**For complete setup instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## Customization

### Changing the Suggested Date

1. Open `script.js`
2. Update the `SUGGESTED_DATE` constant (line 11)
3. Update the `SUGGESTED_DATE_ISO` constant (line 12) to match
4. Update the date in `index.html` (line 93)

### Changing Colors

Edit the CSS variables in `styles.css` (lines 7-17):

```css
:root {
    --color-forest-green: #5a7c5a;
    --color-sage-green: #9fb5a0;
    /* ... etc */
}
```

### Modifying Text Content

Edit the content directly in `index.html`:
- Hero section (lines 29-40)
- Location section (lines 50-54)
- Appreciation section (lines 61-75)
- Date question (line 98)
- Form labels

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Respects `prefers-reduced-motion`
- High contrast mode support

## Notes

- The form requires JavaScript to function properly
- All animations are gentle and respect user preferences
- The site is fully static - backend is separate
- Text will appear even if JavaScript fails (fallback animations)

## License

Personal project - feel free to use and modify as needed.

---

Built with care and intention. 🌿

