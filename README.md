# The Great Emu War - Interactive Historical Experience

![Great Emu War Banner](assets/banner.jpg)

An interactive educational website that brings the remarkable story of Australia's Great Emu War of 1932 to life through engaging content, animations, and a playable game.

## 🎯 Overview

The Great Emu War was a nuisance wildlife management military operation undertaken in Australia over the later part of 1932 to address public concern over the number of emus said to be running amok in the Campion district of Western Australia. This project transforms this fascinating historical event into an engaging, educational web experience.

### 🌟 Key Features

- **📚 Interactive Timeline**: Scroll-triggered animations revealing the war's progression
- **🎮 Playable Game**: Control an emu using arrow keys to experience the conflict from the winning side
- **📊 Animated Statistics**: Dynamic counters showing the war's key numbers
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **♿ Accessibility**: Screen reader support, keyboard navigation, and high contrast mode
- **🎨 Modern UI**: Beautiful gradients, smooth animations, and intuitive interface

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/great-emu-war.git
   cd great-emu-war
   ```

2. **Open the project:**
   Simply open `index.html` in your web browser, or use a local development server:
   
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if you have live-server installed)
   npx live-server
   
   # Using PHP (if installed)
   php -S localhost:8000
   ```

3. **Navigate to the site:**
   Open `http://localhost:8000` in your browser if using a local server, or simply double-click `index.html`

## 📁 Project Structure

```
great-emu-war/
├── index.html              # Main homepage
├── README.md              # This file
├── css/                   # Stylesheets
│   ├── main.css          # Core styles and animations
│   └── game.css          # Game-specific styles
├── js/                    # JavaScript files
│   ├── main.js           # General website functionality
│   └── game.js           # Interactive emu game logic
├── pages/                 # Additional HTML pages
│   ├── about.html        # About page with historical context
│   └── timeline-detail.html # Detailed day-by-day timeline
└── assets/               # Images and media files
    ├── favicon.svg       # Site favicon
    ├── banner.jpg        # README banner image
    └── apple-touch-icon.png # iOS app icon
```

## 🎮 Game Instructions

The interactive emu game lets you experience the Great Emu War from the emus' perspective:

### Objective
- Destroy all 20 wheat crops to win the war
- Avoid bullets fired by 3 soldiers
- You have 3 lives to complete the mission

### Controls
- **↑ ↓ ← →** Arrow keys to move your emu
- **🌾** Walk into crops to destroy them (+10 points each)
- **💥** Avoid yellow bullets from soldiers
- **👥** Other emus provide distraction for the soldiers

### Strategy Tips
- Use the speed and agility that made emus successful in the real war
- Scatter when under fire, just like real emus did
- Use other emus as distractions while you destroy crops
- Move unpredictably to avoid soldier targeting

## 🛠️ Technical Details

### Technologies Used

- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Advanced styling with Flexbox, Grid, and custom animations
- **JavaScript (ES6+)**: Modern JavaScript with classes, arrow functions, and modules
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Alpine.js**: Lightweight JavaScript framework for reactive components
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Custom typography (Cinzel and Inter fonts)

### Browser Compatibility

- **Chrome**: 90+ ✅
- **Firefox**: 88+ ✅
- **Safari**: 14+ ✅
- **Edge**: 90+ ✅
- **Mobile browsers**: iOS Safari 14+, Chrome Mobile 90+ ✅

### Performance Features

- **Lazy Loading**: Images load only when needed
- **CSS Animations**: Hardware-accelerated transitions
- **Optimized Assets**: Compressed images and efficient code
- **CDN Resources**: Fast loading of external libraries
- **Responsive Images**: Appropriate sizes for different devices

## 📚 Educational Content

### Historical Accuracy

All historical facts, dates, and statistics are researched and verified from primary sources:

- Australian War Memorial archives
- National Archives of Australia
- Contemporary newspaper reports from 1932
- Academic historical journals

### Learning Objectives

Students and visitors will learn about:

- **Historical Context**: Post-WWI Australia and the soldier settlement scheme
- **Environmental Issues**: Wildlife management and agricultural challenges
- **Military Strategy**: Why conventional tactics failed against unconventional opponents
- **Cultural Impact**: How embarrassing events can become beloved folklore

## 🎨 Design Philosophy

### Visual Design

- **Color Palette**: Warm earth tones reflecting the Australian landscape
- **Typography**: Elegant serif fonts for headings, clean sans-serif for body text
- **Layout**: Clean, spacious design with clear information hierarchy
- **Animations**: Subtle, meaningful animations that enhance rather than distract

### User Experience

- **Progressive Disclosure**: Information revealed as users scroll
- **Interactive Elements**: Engaging components that invite exploration
- **Accessibility First**: Designed for users of all abilities
- **Mobile Responsive**: Excellent experience on all device sizes

## 🔧 Development

### Local Development

1. **Make changes** to HTML, CSS, or JavaScript files
2. **Refresh browser** to see changes immediately
3. **Test responsiveness** using browser developer tools
4. **Validate code** using HTML/CSS validators

### Code Style

- **HTML**: Semantic markup with proper accessibility attributes
- **CSS**: BEM methodology for class naming, mobile-first responsive design
- **JavaScript**: ES6+ features, detailed comments, modular structure

### Adding New Features

1. **Plan the feature** and its educational value
2. **Create mockups** for any UI changes
3. **Implement functionality** in appropriate files
4. **Test thoroughly** across browsers and devices
5. **Update documentation** including this README

## 📖 Content Management

### Adding Historical Information

1. **Research thoroughly** using primary sources
2. **Fact-check** all dates, numbers, and events
3. **Add content** to appropriate HTML files
4. **Include citations** in the About page
5. **Test readability** and flow

### Updating Game Content

Game logic is contained in `js/game.js`. Key areas:

- **Game Balance**: Adjust difficulty by modifying speed, lives, or scoring
- **Visual Elements**: Update sprites and animations in CSS
- **New Features**: Add new game mechanics while maintaining historical accuracy

## 🤝 Contributing

We welcome contributions that improve the educational value and user experience:

### Types of Contributions

- **Historical Research**: Additional verified facts and sources
- **Accessibility Improvements**: Better screen reader support, keyboard navigation
- **Performance Optimizations**: Faster loading, smoother animations
- **Educational Content**: New interactive elements or explanatory material
- **Bug Fixes**: Resolving issues across different browsers or devices

### Contribution Process

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with clear, commented code
4. **Test thoroughly** across browsers
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with detailed description

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Educational Use

This project is specifically designed for educational purposes. Teachers, students, and educational institutions are encouraged to use, modify, and share this content.

## 🙏 Acknowledgments

### Historical Sources

- **Australian War Memorial**: Official military records
- **National Archives of Australia**: Government correspondence
- **State Library of Western Australia**: Contemporary newspaper archives
- **Academic Historians**: Scholarly research on the Great Emu War

### Technical Inspiration

- **Modern Web Standards**: Following best practices for accessibility and performance
- **Educational Technology**: Inspired by interactive learning platforms
- **Game Design**: Simple, educational game mechanics

### Special Thanks

- The farmers of 1930s Western Australia for their resilience
- Major G.P.W. Meredith for his detailed military reports
- The emus, for their tactical superiority and providing us with this wonderful story

## 📞 Contact

- **Project Maintainer**: [Your Name](mailto:your-email@example.com)
- **Educational Inquiries**: [education@greatemuwar.com](mailto:education@greatemuwar.com)
- **Technical Issues**: [GitHub Issues](https://github.com/your-username/great-emu-war/issues)

## 🔄 Version History

### v1.0.0 (2025-01-XX)
- Initial release with complete interactive experience
- Fully functional emu game
- Comprehensive historical timeline
- Responsive design for all devices
- Accessibility features implemented

---

**Remember**: The Great Emu War teaches us that sometimes the most unexpected opponents can emerge victorious. In the battle between military precision and natural adaptability, nature found a way to win. 🦆⚔️

*"The emus have won the first round" - Perth Daily News, November 1932*