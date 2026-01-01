# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features a dark theme with lime green accents, showcasing projects with detailed project pages and an interactive image carousel.

## ✨ Features

- **Responsive Design** - Fully responsive layout that works on all devices (mobile, tablet, desktop)
- **Dark Theme** - Modern dark theme with lime green accent colors (#d2e879)
- **Project Showcase** - Featured projects section with links to detailed project pages
- **Image Carousel** - Interactive image carousel/slider on project detail pages
- **Contact Form** - Functional contact form integrated with EmailJS
- **Mobile Menu** - Hamburger menu with smooth animations for mobile devices
- **Smooth Scrolling** - Smooth scroll navigation between sections
- **Font Awesome Icons** - Modern iconography using Font Awesome 6.5.1

## 🚀 Live Demo

Visit the live website: [Your GitHub Pages URL]

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main homepage
├── styles/
│   ├── main.css            # Main stylesheet (header, hero, projects, about, contact)
│   └── project.css         # Styles for project detail pages
├── scripts/
│   ├── main.js             # Main JavaScript (navigation, form handling, menu)
│   └── carousel.js         # Image carousel functionality
├── projects/
│   ├── project1.html      # Adventure Time Landing Page
│   ├── project2.html      # World News Blog
│   ├── project3.html      # E-commerce Product Page
│   └── project-template.html  # Template for new projects
├── assets/
│   └── images/
│       ├── profile.jpg     # Profile image for hero section
│       └── projects/
│           ├── project1.jpg
│           ├── project2.jpg
│           └── project3.jpg
└── README.md
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern CSS with CSS Grid, Flexbox, and CSS Variables
- **JavaScript (Vanilla)** - No frameworks, pure JavaScript
- **Font Awesome 6.5.1** - Icon library
- **EmailJS** - Email service for contact form

## 🎨 Color Palette

- **Primary Background**: `#000000` (Black)
- **Secondary Background**: `#1a1a1a` (Dark Gray)
- **Tertiary Background**: `#2a2a2a` (Medium Gray)
- **Primary Text**: `#ffffff` (White)
- **Secondary Text**: `#d9d9d9` (Light Gray)
- **Tertiary Text**: `#c7c7c7` (Gray)
- **Accent Color**: `#d2e879` (Lime Green)
- **Accent Hover**: `#c4d86a` (Darker Lime Green)

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- A code editor (VS Code, Sublime Text, etc.)
- Git (for version control)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Open `index.html` in your web browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

## 📝 Customization

### Personal Information

1. Open `index.html`
2. Update the following:
   - Name: Replace "HUBERT KAMIŃSKI" with your name
   - Email: Update email address in contact section
   - About Me: Update the description in the About section
   - Social Media Links: Update links in the contact section

### Adding Projects

1. **Add project to homepage:**
   - Open `index.html`
   - Find the `.projects__list` section
   - Copy an existing `.project-card` structure
   - Update title, description, and project info
   - Add link to project detail page: `projects/your-project.html`

2. **Create project detail page:**
   - Copy `projects/project-template.html` or an existing project file
   - Rename it (e.g., `project4.html`)
   - Update:
     - Page title and meta description
     - Project title and description
     - Project info (Year, Role, Client)
     - Image paths in carousel
     - Links to live demo and GitHub

3. **Add project images:**
   - Add images to `assets/images/projects/`
   - Update image paths in the project HTML file
   - Add multiple images for the carousel gallery

### Contact Form Configuration

The contact form uses **EmailJS** for sending emails.

**Current Configuration:**
- Public Key: Already configured in `scripts/main.js`
- Service ID: `service_ijob117`
- Template ID: `template_vffjf3r`

**To change EmailJS settings:**
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up Email Service and Template
3. Update the values in `scripts/main.js`:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
   ```

## 🎯 Features Breakdown

### Homepage (`index.html`)

- **Header**: Sticky navigation with logo and menu
- **Hero Section**: Introduction with profile image and social links
- **Featured Projects**: Grid layout showcasing projects
- **About Me**: Personal information section
- **Contact**: Contact form and social media links
- **Footer**: Copyright information

### Project Pages (`projects/*.html`)

- **Project Hero**: Title, label, and description
- **Image Carousel**: Interactive slider with multiple project images
- **Project Details**: Project information and detailed description
- **Navigation**: Links back to homepage and to live demo/GitHub

### Interactive Elements

- **Hamburger Menu**: Mobile navigation with smooth animations
- **Image Carousel**: Touch/swipe support, keyboard navigation, indicators
- **Smooth Scrolling**: Animated scroll to sections
- **Form Validation**: Client-side validation for contact form
- **Hover Effects**: Interactive elements with transitions

## 🌐 Deployment

### GitHub Pages

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to repository Settings → Pages
3. Select source branch: `main`
4. Select folder: `/ (root)`
5. Click Save
6. Your site will be available at: `https://yourusername.github.io/portfolio/`

### Other Hosting Options

- **Netlify**: Drag and drop the folder or connect GitHub
- **Vercel**: Import GitHub repository
- **Cloudflare Pages**: Connect repository
- **Traditional Web Hosting**: Upload files via FTP

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Hubert Kamiński**

- Portfolio: [Your Portfolio URL]
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

## 🙏 Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [EmailJS](https://www.emailjs.com/) for email service
- Design inspiration from modern portfolio websites

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact via email
- Check the documentation

---

**Note**: Remember to update all placeholder content, links, and personal information before deploying your portfolio!
