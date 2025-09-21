# Voice AI Receptionist Website

A modern, responsive website for a Voice AI Receptionist service.

## Features

- Responsive design that works on all devices
- Dark/light theme toggle with persistent settings
- Animated Aurora background effect
- Interactive FAQ section
- Smooth scroll animations
- Mobile-friendly navigation
- Demo videos page with product showcases
- Vibrant orange color scheme on black background
- "Book a Meeting" call-to-action buttons

## Demo Page

The website includes a dedicated demo page ([demo.html](demo.html)) featuring:
- Two product demonstration videos
- "Book a Meeting" button for direct scheduling
- Consistent styling with the main website
- Responsive design for all devices

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to http://localhost:5173

### Alternative Local Server

For a simple local server without Node.js:
```bash
python -m http.server 8000
```

Then open your browser to http://localhost:8000

## Customization

### Color Scheme

The website uses a vibrant orange (#ff4d00) and black color scheme:
- Primary accent color: #ff4d00
- Background color: #000000
- Card background: #111111

### Demo Videos

The demo page includes sample videos from Google's sample collection:
- First video: Big Buck Bunny
- Second video: Elephants Dream

To replace with your own videos, update the `src` attributes in [demo.html](demo.html).

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.