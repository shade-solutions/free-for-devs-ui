export default function Header() {
  return (
    <header className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 md:py-24 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Free for <span className="text-blue-200">Developers</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
              Discover amazing free tools, services, and resources for developers. 
              From APIs to hosting, find everything you need to build your next project.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg mb-8">
            <div className="flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Always Free Tiers</span>
            </div>
            
            <div className="flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>No Credit Card</span>
            </div>
            
            <div className="flex items-center space-x-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Curated & Updated</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                document.querySelector('#search-bar')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Explore Tools →
            </button>
            <a
              href="https://github.com/ripienaar/free-for-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 text-gray-50 dark:text-gray-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,96L48,80C96,64,192,32,288,32C384,32,480,64,576,85.3C672,107,768,117,864,122.7C960,128,1056,128,1152,112C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="currentColor"></path>
        </svg>
      </div>
    </header>
  );
}
