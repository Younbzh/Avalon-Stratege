import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, ChevronRight, Check, CheckCircle, Clock, Award, Star, Calendar, ExternalLink, Zap, Shield, DollarSign, Users, Sparkles } from 'lucide-react';
import { siteConfig } from './config/siteConfig';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900">{siteConfig.companyName}</h1>
                <p className="text-sm text-gray-600">{siteConfig.tagline}</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-blue-600 transition-colors">Accueil</button>
              <button onClick={() => scrollToSection('offre')} className="text-gray-700 hover:text-blue-600 transition-colors">Offre</button>
              <button onClick={() => scrollToSection('processus')} className="text-gray-700 hover:text-blue-600 transition-colors">Comment ça marche</button>
              <button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
                Devis gratuit
              </button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-900">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4">
              {['accueil', 'offre', 'processus', 'contact'].map(section => (
                <button key={section} onClick={() => scrollToSection(section)} className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 capitalize">
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section id="accueil" className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 px-6 py-2 rounded-full mb-6 border border-green-200">
              <Check className="text-green-600" size={20} />
              <span className="text-sm font-semibold text-green-700">{siteConfig.hero.promise}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              {siteConfig.hero.title}
            </h1>
            
            <p className="text-2xl md:text-3xl text-blue-600 mb-4 font-semibold">
              {siteConfig.hero.subtitle}
            </p>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-bold text-3xl shadow-lg">
                {siteConfig.hero.price}
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-600">Installation complète</div>
                <div className="text-xs text-green-600 font-semibold">Déductible d'impôts</div>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              {siteConfig.hero.description}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-xl flex items-center gap-2">
                {siteConfig.hero.cta}
                <ChevronRight size={20} />
              </button>
              <button onClick={() => scrollToSection('offre')} className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg border-2 border-blue-200">
                Voir l'offre détaillée
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{siteConfig.whyUs.title}</h2>
            <p className="text-xl text-gray-600">{siteConfig.whyUs.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {siteConfig.whyUs.reasons.map((reason, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-blue-100">
                <div className="text-5xl mb-4">{reason.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                <p className="text-gray-700 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offre principale */}
      <section id="offre" className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-4">
              <span className="text-white font-bold">{siteConfig.mainOffer.subtitle}</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-4">{siteConfig.mainOffer.title}</h2>
            <p className="text-xl text-blue-100">{siteConfig.mainOffer.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {siteConfig.mainOffer.includes.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-2xl">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {siteConfig.mainOffer.taxDeductible && (
            <div className="bg-green-500 rounded-xl p-6 text-center shadow-xl">
              <p className="text-white font-bold text-lg">
                💡 {siteConfig.mainOffer.taxNote}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Pack Sérénité */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block bg-indigo-100 px-6 py-2 rounded-full mb-4 border border-indigo-200">
              <span className="text-indigo-700 font-bold">{siteConfig.serenityPack.subtitle}</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">{siteConfig.serenityPack.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{siteConfig.serenityPack.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {siteConfig.serenityPack.includes.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-2 border-indigo-200 hover:border-indigo-400 transition-all">
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle className="text-indigo-500 flex-shrink-0 mt-0.5" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center shadow-lg">
              <p className="font-bold text-lg">✓ {siteConfig.serenityPack.commitment}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white text-center shadow-lg">
              <p className="font-bold text-lg">🎯 {siteConfig.serenityPack.benefit}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{siteConfig.target.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {siteConfig.target.profiles.map((profile, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-blue-100">
                <div className="text-4xl mb-3">{profile.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{profile.title}</h3>
                <p className="text-gray-600 text-sm">{profile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section id="processus" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{siteConfig.process.title}</h2>
            <p className="text-xl text-gray-600">{siteConfig.process.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {siteConfig.process.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                  <p className="text-sm text-gray-600 text-center leading-relaxed">{step.description}</p>
                </div>
                {index < siteConfig.process.steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-blue-400" size={24} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{siteConfig.testimonials.title}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {siteConfig.testimonials.reviews.map((review, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border border-blue-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 italic">"{review.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-500 to-green-600">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">{siteConfig.guarantees.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {siteConfig.guarantees.items.map((item, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white font-semibold text-lg">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Questions fréquentes</h2>
          </div>

          <div className="space-y-6">
            {siteConfig.faq.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <span className="text-blue-600 flex-shrink-0">Q:</span>
                  {item.question}
                </h3>
                <p className="text-gray-700 leading-relaxed pl-8">
                  <span className="text-green-600 font-bold">R:</span> {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl p-12 shadow-2xl text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{siteConfig.contact.title}</h2>
            <p className="text-xl text-gray-600 mb-8">{siteConfig.contact.subtitle}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <a href={`mailto:${siteConfig.contact.email}`} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-3">
                <Mail size={24} />
                <div className="text-left">
                  <div className="text-sm opacity-80">Email</div>
                  <div className="font-bold">{siteConfig.contact.email}</div>
                </div>
              </a>

              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-3">
                <Phone size={24} />
                <div className="text-left">
                  <div className="text-sm opacity-80">Téléphone</div>
                  <div className="font-bold">{siteConfig.contact.phone}</div>
                </div>
              </a>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-blue-700 font-semibold">
                <Clock className="inline mr-2" size={20} />
                {siteConfig.contact.availability}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">{siteConfig.companyName}</h3>
              <p className="text-gray-400 mb-4">{siteConfig.slogan}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Mail size={16} />
                  {siteConfig.legalInfo.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={16} />
                  {siteConfig.legalInfo.phone}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Offre</h3>
              <div className="space-y-2 text-gray-400">
                <p>Business plan complet : 890€</p>
                <p>Accompagnement : 149€/mois</p>
                <p className="text-green-400 font-semibold">Sans engagement</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 {siteConfig.companyName} - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}