import React, { useState, useEffect } from 'react';
import vocabularyData from '../../data/n5.json';
import { Search, ChevronLeft, ChevronRight, Book, Globe, Heart } from 'lucide-react';

function VocabularyList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [showPronunciation, setShowPronunciation] = useState(false);
  const itemsPerPage = 8;

  // Filter vocabulary based on search term and selected language
  const filteredVocabulary = vocabularyData.vocabulary.filter(item => {
    const matchesSearch = 
      item.japanese.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nepali.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vietnamese.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedLanguage === 'all') return matchesSearch;
    if (selectedLanguage === 'english') return item.english.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedLanguage === 'japanese') return item.japanese.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedLanguage === 'nepali') return item.nepali.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedLanguage === 'vietnamese') return item.vietnamese.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredVocabulary.length / itemsPerPage);
  const currentItems = filteredVocabulary.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle favorite status
  const toggleFavorite = (japanese) => {
    if (favorites.includes(japanese)) {
      setFavorites(favorites.filter(item => item !== japanese));
    } else {
      setFavorites([...favorites, japanese]);
    }
  };

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;
    
    // Calculate range of buttons to display
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);
    
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }
    
    // Add "First" button if not at the beginning
    if (startPage > 1) {
      buttons.push(
        <button 
          key="first" 
          onClick={() => setCurrentPage(1)}
          className="px-3 py-1 mx-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        buttons.push(<span key="ellipsis1" className="px-2">...</span>);
      }
    }
    
    // Add numbered buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button 
          key={i} 
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 mx-1 rounded-md ${
            currentPage === i 
              ? 'bg-blue-600 text-white' 
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {i}
        </button>
      );
    }
    
    // Add "Last" button if not at the end
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="ellipsis2" className="px-2">...</span>);
      }
      
      buttons.push(
        <button 
          key="last" 
          onClick={() => setCurrentPage(totalPages)}
          className="px-3 py-1 mx-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          {totalPages}
        </button>
      );
    }
    
    return buttons;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Book className="text-blue-600 mr-2" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">JLPT N5 <span className="text-blue-600">Vocabulary</span></h1>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          <button 
            onClick={() => setSelectedLanguage('all')} 
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedLanguage === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setSelectedLanguage('japanese')} 
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedLanguage === 'japanese' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Japanese
          </button>
          <button 
            onClick={() => setSelectedLanguage('english')} 
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedLanguage === 'english' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            English
          </button>
          <button 
            onClick={() => setSelectedLanguage('nepali')} 
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedLanguage === 'nepali' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Nepali
          </button>
          <button 
            onClick={() => setSelectedLanguage('vietnamese')} 
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedLanguage === 'vietnamese' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Vietnamese
          </button>
        </div>
      </div>
      
      {/* Search Input */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search vocabulary in any language..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          className="w-full pl-10 p-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label className="flex items-center text-sm text-gray-600 cursor-pointer">
            <input 
              type="checkbox" 
              checked={showPronunciation}
              onChange={() => setShowPronunciation(!showPronunciation)}
              className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            Show pronunciation
          </label>
        </div>
        <div className="text-sm text-gray-600">
          Showing {currentItems.length} of {filteredVocabulary.length} vocabulary words
        </div>
      </div>

      {/* Vocabulary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {currentItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-200">
            <div className="p-4 flex justify-between items-start">
              <div>
                <div className="flex items-baseline">
                  <h3 className="text-lg font-bold text-gray-800">{item.japanese}</h3>
                  {showPronunciation && (
                    <span className="ml-2 text-sm text-gray-500 italic">
                      {/* This would show pronunciation - you'd need actual data */}
                      [pronunciation]
                    </span>
                  )}
                </div>
                <div className="mt-2 grid grid-cols-1 gap-1">
                  <div className="flex">
                    <span className="w-24 text-xs font-medium text-gray-500 uppercase">English</span>
                    <span className="text-gray-800">{item.english}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-xs font-medium text-gray-500 uppercase">Nepali</span>
                    <span className="text-gray-800">{item.nepali}</span>
                  </div>
                  <div className="flex">
                    <span className="w-24 text-xs font-medium text-gray-500 uppercase">Vietnamese</span>
                    <span className="text-gray-800">{item.vietnamese}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => toggleFavorite(item.japanese)}
                className="text-gray-400 hover:text-red-500 focus:outline-none transition duration-200"
              >
                <Heart 
                  size={20} 
                  fill={favorites.includes(item.japanese) ? "#ef4444" : "none"} 
                  className={favorites.includes(item.japanese) ? "text-red-500" : ""} 
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex mb-4 sm:mb-0">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-2 rounded-lg mr-2 bg-blue-50 text-blue-600 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-blue-100 transition duration-200"
            >
              <ChevronLeft size={18} className="mr-1" />
              Previous
            </button>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-600 disabled:bg-gray-100 disabled:text-gray-400 hover:bg-blue-100 transition duration-200"
            >
              Next
              <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          
          <div className="flex justify-center">
            {renderPaginationButtons()}
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center mb-2">
          <Globe size={16} className="mr-2 text-blue-500" />
          <span>JLPT N5 Vocabulary Learning Tool</span>
        </div>
        <p>Study and master essential Japanese vocabulary for the JLPT N5 exam</p>
      </div>
    </div>
  );
}

export default VocabularyList;