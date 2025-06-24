# Free for Developers - Real-time Tool Discovery Platform

A beautiful, modern web application that fetches the GitHub README of [free-for-dev](https://github.com/ripienaar/free-for-dev) in real time, parses it as a JSON database, and provides both a stunning UI and public API for developers to discover amazing free tools and services.

## 🚀 Key Features

### Real-time GitHub Integration
- **Live Data Sync**: Automatically fetches and parses the latest README from the free-for-dev repository
- **Smart Caching**: 1-hour cache with automatic refresh when repository updates
- **Fallback System**: Local backup ensures the app works even if GitHub is unavailable

### Advanced Search & Filtering
- 🔍 **Intelligent Search** - Search through tools by name, description, or features  
- 🏷️ **Smart Categorization** - Tools organized by categories like APIs, Hosting, Analytics, etc.
- 💰 **Pricing Filters** - Filter by Free, Freemium, Paid, or Trial offerings
- ⚡ **Real-time Results** - Instant filtering as you type

### Public API Access
- **RESTful Endpoints**: Access parsed data programmatically
- **CORS Enabled**: Use directly from frontend applications
- **No Authentication**: Free and open access for all developers
- **Real-time Updates**: API data stays in sync with GitHub repository

### Modern User Experience
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean, minimalistic design with dark mode support
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🔗 **Status Monitoring** - Real-time website status indicators
- 📊 **Live Statistics** - Overview of available tools and categories

## 🌐 API Endpoints

### Get All Tools
```
GET /api/tools
```
Returns the complete parsed dataset with all tools and categories in JSON format.

### Get Statistics  
```
GET /api/stats
```
Returns metadata including tool counts and last update timestamp.

## 📊 Data Source

This application provides real-time access to the amazing [free-for-dev](https://github.com/ripienaar/free-for-dev) repository by R.I. Pienaar, which is a curated list of free services for developers maintained by the community.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Deployment**: Cloudflare Pages (via OpenNext)
- **Icons**: Heroicons & Shield.io badges
- **Logos**: Google Favicon API

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd free-for-dev
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Main header
│   ├── SearchBar.tsx      # Search functionality
│   ├── FilterSidebar.tsx  # Desktop filters
│   ├── MobileFilter.tsx   # Mobile filters
│   ├── ToolCard.tsx       # Individual tool cards
│   ├── ToolGrid.tsx       # Grid layout for tools
│   ├── Stats.tsx          # Statistics display
│   └── LoadingSpinner.tsx # Loading component
├── types/                 # TypeScript type definitions
│   └── index.ts
└── utils/                 # Utility functions
    └── parser.ts          # Markdown parsing logic
```

## Features in Detail

### Smart Parsing
The application intelligently parses the free-for-dev markdown file to extract:
- Tool names and descriptions
- Pricing models (Free, Freemium, Trial, Paid)
- Key features and capabilities
- Categories and tags
- Website URLs and domains

### Advanced Filtering
- **Text Search**: Search across tool names, descriptions, and tags
- **Category Filter**: Filter by service categories
- **Pricing Filter**: Multiple pricing model selection
- **Real-time Results**: Instant filtering without page reloads

### Responsive Design
- Desktop-first design with comprehensive mobile support
- Collapsible sidebar for mobile devices
- Touch-friendly interfaces
- Optimized layouts for all screen sizes

### Visual Enhancements
- Website favicons using Google's favicon API
- Real-time status badges via Shield.io
- Hover effects and smooth transitions
- Dark mode support
- Custom scrollbars

## Deployment

The application is configured for deployment on Cloudflare Pages using OpenNext:

```bash
pnpm run deploy
```

## 👨‍💻 About the Developer

This project is created and maintained by **Shaswat Raj** ([@sh20raj](https://github.com/sh20raj)).

### Connect with me:
- 🐱 **GitHub**: [@sh20raj](https://github.com/sh20raj)
- 💼 **LinkedIn**: [@sh20raj](https://linkedin.com/in/sh20raj) 
- 🐦 **Twitter**: [@sh20raj](https://twitter.com/sh20raj)

### Repository
- 📂 **Source Code**: [github.com/shade-solutions/free-for-devs-ui](https://github.com/shade-solutions/free-for-devs-ui)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **R.I. Pienaar** and all contributors to the [free-for-dev](https://github.com/ripienaar/free-for-dev) repository
- The amazing developer community for curating these resources
- All the service providers who offer free tiers for developers

---

**Made with ❤️ by [@sh20raj](https://github.com/sh20raj)**

The application fetches data from the `free-for-dev/README.md` file. To update the data:

1. Update the source file in the `free-for-dev/` directory
2. The application will automatically parse and display the new data

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [free-for-dev](https://github.com/ripienaar/free-for-dev) - The amazing community-maintained list of free services
- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - The utility-first CSS framework
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons

## Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

---

Built with ❤️ for the developer community
