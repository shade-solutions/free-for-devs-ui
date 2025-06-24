# Free for Developers - Tool Discovery Platform

A beautiful, modern web application that helps developers discover amazing free tools, services, and resources. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🔍 **Advanced Search** - Search through tools by name, description, or features
- 🏷️ **Smart Categorization** - Tools organized by categories like APIs, Hosting, Analytics, etc.
- 💰 **Pricing Filters** - Filter by Free, Freemium, Paid, or Trial offerings
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean, minimalistic design with dark mode support
- ⚡ **Fast Performance** - Built with Next.js 15 and optimized for speed
- 🔗 **Direct Links** - Quick access to all tools with status monitoring
- 📊 **Statistics** - Overview of available tools and categories

## Data Source

This application parses and displays data from the amazing [free-for-dev](https://github.com/ripienaar/free-for-dev) repository, which is a curated list of free services for developers maintained by the community.

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

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Data Updates

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
