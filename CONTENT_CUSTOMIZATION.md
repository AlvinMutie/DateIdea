# Content Customization Guide 🌿

## Sections to Personalize

### 1. Hero Section
**File:** `index.html` (lines 84-95)

Current text:
- "Hey Sandra…"
- "I have a question for you."

**Suggestions:**
- Keep it simple and personal
- Use her name naturally
- Match your communication style

---

### 2. Appreciation Messages
**File:** `index.html` (lines 133-152)

There are 4 appreciation cards. Current messages:
1. "This isn't about impressing you. It's about spending time with you, at your pace."
2. "I appreciate your gentleness, and I want you to feel chosen, safe, and valued."
3. "There's no pressure here. Just a simple question, and whatever answer feels right to you."
4. "Your presence matters to me, and I'd love to share this experience with you."

**Suggestions:**
- Keep the warm, safe tone
- Add specific things you appreciate about her
- Make them authentic to your relationship
- Avoid being too intense or pressuring

---

### 3. Surprise Messages
**File:** `script.js` (lines 34-40)

There are 5 rotating surprise messages. Current messages:
1. "You're wonderful, just as you are."
2. "Your smile makes everything brighter."
3. "I'm grateful to know you."
4. "You bring so much light into the world."
5. "Being around you feels like home."

**Suggestions:**
- Add more personal messages
- Include specific things you notice about her
- Keep them genuine and warm
- You can add as many as you want!

---

### 4. Location Details
**File:** `index.html` (lines 130-180)

**Current details:**
- Location: "Nairobi Safari Walk"
- Address: "Langata Road, Nairobi, Kenya"
- Parking: "Parking available on-site. We can meet at the main entrance."
- What to expect: "A gentle walk through nature, about 1-2 hours. Comfortable walking shoes recommended."

**To customize:**
1. Update the address if needed
2. Add specific parking instructions
3. Add more details about what to expect
4. Update the Google Maps embed URL (see below)

---

### 5. Personal Note Section
**File:** `index.html` (lines 182-198)

**Current note:**
> "I chose this place because I thought it would be a peaceful, beautiful setting where we can talk and just enjoy each other's company. There's something special about being surrounded by nature that makes conversations feel more natural and comfortable.
> 
> I'm really looking forward to spending this time with you, and I hope it feels like a safe, gentle space for us to connect. No expectations, just genuine time together."

**This is the most important section to personalize!**
- Write it in your own voice
- Explain why you chose this location
- Share what you're looking forward to
- Keep it warm and genuine

---

### 6. Google Maps Embed
**File:** `index.html` (line 168)

**To get the correct embed URL:**
1. Go to [Google Maps](https://www.google.com/maps)
2. Search for "Nairobi Safari Walk" (or your location)
3. Click "Share" → "Embed a map"
4. Copy the iframe `src` URL
5. Replace the current `src` in the iframe tag

**Or use this format:**
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d[LAT]!2d[LNG]!3d[ZOOM]!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x[PLACE_ID]!2s[Nairobi+Safari+Walk]!5e0!3m2!1sen!2sus!4v[TIMESTAMP]
```

---

### 7. Suggested Date & Time
**File:** `script.js` (lines 17-19)

**Current:**
- Date: "Wednesday, 17th December 2025"
- Time: "10:00 AM" (default)

**To change:**
- Update `SUGGESTED_DATE` and `SUGGESTED_DATE_ISO`
- Update `DEFAULT_TARGET_DATE`
- Update the default time in the time picker (line 211 in `index.html`)

---

## Quick Customization Checklist

- [ ] Review hero section text
- [ ] Personalize appreciation messages (4 cards)
- [ ] Add personal surprise messages (5+ messages)
- [ ] Update location details (address, parking, expectations)
- [ ] **Write your personal note** (most important!)
- [ ] Update Google Maps embed URL
- [ ] Verify date and time are correct
- [ ] Test everything works

---

## Tips

1. **Keep it authentic** - Write in your own voice
2. **Less is more** - Don't overdo it
3. **Safety first** - Make sure she feels safe and comfortable
4. **No pressure** - Keep the tone gentle and respectful
5. **Test before sending** - Use `resetWebsiteData()` in console to test

---

## Need Help?

If you need help customizing any section, just ask! I can help you:
- Write personalized messages
- Update dates/times
- Fix the map embed
- Adjust the tone
- Add more features

Good luck! 🌿🤍

