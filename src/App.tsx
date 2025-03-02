import React, { useState, useEffect } from 'react';
import { 
  Wrench,
  ShowerHead as Shower,
  } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  Droplets,
  Flame,
  Building2, 
  PaintBucket,
  Phone,
  Mail,
  Info,
  MapPin,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

function App() {
  const [showButton, setShowButton] = React.useState(false);
  const [scrollPercentage, setScrollPercentage] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setScrollPercentage(Math.min((scrolled / totalHeight) * 100, 100));
      setShowButton(scrolled > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const { t, language, setLanguage } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const images = [
    "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
  ];

  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoading(false);
    });

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const [servicesInView, setServicesInView] = useState(false);
  const [aboutInView, setAboutInView] = useState(false);

  useEffect(() => {
    const servicesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setServicesInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAboutInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const servicesSection = document.getElementById('services');
    const aboutSection = document.getElementById('about');
    
    if (servicesSection) servicesObserver.observe(servicesSection);
    if (aboutSection) aboutObserver.observe(aboutSection);

    return () => {
      if (servicesSection) servicesObserver.unobserve(servicesSection);
      if (aboutSection) aboutObserver.unobserve(aboutSection);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Navigation */}
      <nav className={`fixed w-full top-0 z-50 px-4 md:px-20 py-3 backdrop-blur-sm transition-all duration-300 ${
        scrollPercentage > 1 ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-shrink-0">
            {scrollPercentage > 1 ? 
              <img src="https://github.com/othsma/kmk-mobile/blob/main/src/altLogo3.png?raw=true" alt="KMK VVS Logo" className="h-12 w-auto" /> : 
              <img src="https://github.com/othsma/kmk-mobile/blob/main/src/logo3.png?raw=true" alt="KMK VVS Logo" className="h-12 w-auto" />
            }
          </div>
          <div className={`space-x-4 transition-colors duration-300 ${
            scrollPercentage > 1 ? 'text-[#c09f76]' : 'text-white'
          }`}>
            <a href="https://www.facebook.com/people/G-Teknik-ApS/100063713580343/#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://www.instagram.com/kmkvvsaps" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
        </div>
      </nav>

      {/* Content wrapper with padding for fixed nav */}
      <div className="pt-16"> {/* Add padding top to account for fixed nav */}
        {/* Hero Section */}
        <div className="h-screen relative overflow-hidden -mt-16"> {/* Negative margin to offset the padding */}
          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {showButton && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed right-4 w-14 h-14 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-50 group back-to-top-button"
              aria-label="Back to top"
              style={{ bottom: scrollPercentage > 95 ? '5%' : '4rem' }}
            >
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-current text-gray-200"
                  fill="none"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-current text-blue-600"
                  fill="none"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * scrollPercentage) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-blue-600 group-hover:text-blue-700 transition-colors">
                <svg
                  className="w-6 h-6 transform"
                  style={{ transform: `rotate(${scrollPercentage * 3.6}deg)` }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 10l7-7 7 7M5 14l7 7 7-7" />
                </svg>
              </span>
            </button>
          )}
          
          {/* Carousel images */}
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                currentImageIndex === index ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${image}")`,
              }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
            <div className="container mx-auto px-6 h-full flex items-center justify-center">
              <div className="max-w-3xl text-center">
                <h1 className="text-4xl md:text-7xl font-bold text-white">
                  {t('heroTitle')}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mt-6 md:mt-12">
                  {t('heroSubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 md:mt-24">
                  <button 
                    className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition text-lg"
                    onClick={() => window.open('https://www.instagram.com/kmkvvsaps', '_blank')}
                  >
                    {t('latestProject')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Carousel indicators */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Rest of the content remains unchanged */}
        {/* Services Section */}
        <div className="relative -mt-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-1">
              <div id="services" className="bg-white rounded-2xl shadow-2xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('servicesTitle')}</h2>
                  <p className="text-xl text-gray-600">{t('servicesSubtitle')}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { icon: <img src="https://github.com/othsma/kmk-mobile/blob/main/src/service1.png?raw=true" alt="Service 1 Icon" />, title: 'plumbingTasks', description: 'plumbingDesc' },
                    { icon: <img src="https://github.com/othsma/kmk-mobile/blob/main/src/service2.png?raw=true" alt="Service 2 Icon" />, title: 'bathroomInstallation', description: 'bathroomDesc' },
                    { icon: <img src="https://github.com/othsma/kmk-mobile/blob/main/src/service3.png?raw=true" alt="Service 3 Icon" />, title: 'waterTreatment', description: 'waterDesc' },
                    { icon: <img src="https://github.com/othsma/kmk-mobile/blob/main/src/service4.png?raw=true" alt="Service 4 Icon" />, title: 'heatSources', description: 'heatDesc' },
                    { icon: <img src="https://github.com/othsma/kmk-mobile/blob/main/src/service5.png?raw=true" alt="Service 5 Icon" />, title: 'newConstruction', description: 'constructionDesc' },
                    { icon: <img src="https://github.com/othsma/kmk-mobile/blob/main/src/service6.png?raw=true" alt="Service 6 Icon" />, title: 'energyTasks', description: 'energyDesc' },
                  ].map((service, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 ease-out flex flex-col items-center text-center"
                      style={{
                        opacity: servicesInView ? 1 : 0,
                        transform: servicesInView ? 'translateY(0)' : 'translateY(20px)',
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="mb-4"><img src={service.icon.props.src} alt={service.icon.props.alt} style={{width: '50px', height: '50px'}} /></div>
                      <h3 className="text-xl font-bold mb-3">{t(service.title)}</h3>
                      <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: t(service.description) }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* About Us Section */}
              <div id="about" className="bg-white rounded-2xl shadow-2xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative h-[600px] rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1642014586226-6de3da27a974?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80" 
                      alt="KMK VVS Team"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="bg-blue-600 text-white px-6 py-4 rounded-lg inline-block">
                        <p className="text-2xl font-bold">7+ {t('yearsExperience')}</p>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="lg:pl-12"
                    style={{
                      opacity: aboutInView ? 1 : 0,
                      transform: aboutInView ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'all 0.5s ease-out'
                    }}
                  >
                    <h2 className="text-4xl font-bold mb-6">{t('aboutTitle')}</h2>
                    <p className="text-gray-600 mb-6 text-lg">{t('aboutDesc1')}</p>
                    <p className="text-gray-600 mb-6 text-lg">{t('aboutDesc2')}</p>
                    <p className="text-gray-600 mb-6 text-lg">{t('aboutDesc3')}</p>
                    <div 
                      className="grid grid-cols-2 gap-6 mb-8"
                      style={{
                        opacity: aboutInView ? 1 : 0,
                        transform: aboutInView ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.5s ease-out',
                        transitionDelay: '100ms'
                      }}
                    >
                      
                    </div>
                    
                  </div>
                </div>
              </div>

              {/* Why Choose Us Section */}
              <div id="why-choose-us" className="bg-white rounded-2xl shadow-2xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-bold mb-6">{t('whyChooseUs')}</h2>
                    <div className="space-y-6">
                      {[
                        { title: 'qualityService', description: 'qualityServiceDesc' },
                        { title: 'expertTeam', description: 'expertTeamShort' },
                        { title: 'material', description: 'materialDesc' },
                        { title: 'result', description: 'resultDesc' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="h-6 w-6 rounded-full bg-blue-600 flex-shrink-0 mt-1"></div>
                          <div className="ml-4">
                            <h3 className="text-xl font-semibold mb-2">{t(item.title)}</h3>
                            <p className="text-gray-600">{t(item.description)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-[500px]">
                    <img 
                      src="https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80" 
                      alt="Modern luxury bathroom"
                      className="rounded-lg object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-6 ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
              <div>
                <h2 className="text-4xl font-bold mb-6">{t('contactTitle')}</h2>
                <p className="text-gray-400 mb-8">{t('contactDesc')}</p>
               
              </div>
              <div className="contact-info space-y-6 md:text-right">
                  <div className="flex items-center md:justify-end">
                    <Phone className="w-6 h-6 mr-4" />
                    <span>+45 40 60 94 01</span>
                  </div>
                  <div className="flex items-center md:justify-end">
                    <Mail className="w-6 h-6 mr-4" />
                    <span>kmk@kmkvvs.dk</span>
                  </div>
                  <div className="flex items-center md:justify-end">
                    <Info className="w-6 h-6 mr-4" />
                    <span>{t('vat')}</span>
                  </div>
                </div>
            </div>
           
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8">
          
          <div className="container mx-auto px-6">
            
            <div className="flex flex-col md:flex-row justify-between items-center">
              
              <p>{t('copyright')}</p>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <span>{t('language')}:</span>
                <button
                  onClick={() => setLanguage('da')}
                  className={`px-3 py-1 rounded ${language === 'da' ? 'bg-blue-600 text-white' : 'hover:text-white'}`}
                >
                  Dansk
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'hover:text-white'}`}
                >
                  English
                </button>
                <div className="md:flex space-x-4">
            <a href="https://www.facebook.com/people/G-Teknik-ApS/100063713580343/#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://www.instagram.com/kmkvvsaps" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
