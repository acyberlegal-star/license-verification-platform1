'use client'

import { useState } from 'react'
import { Search, Shield, User, Globe, CheckCircle, XCircle, Calendar, MapPin, Phone, Mail, ExternalLink } from 'lucide-react'

// Tipos de datos
interface License {
  id: string
  name: string
  licenseNumber: string
  profession: string
  status: 'active' | 'expired' | 'suspended'
  issueDate: string
  expiryDate: string
  state: string
  email: string
  phone: string
  verified: boolean
  photo?: string
}

// Datos de ejemplo (en producción vendrían de una base de datos)
const sampleLicenses: License[] = [
  {
    id: '1',
    name: 'Dr. María González',
    licenseNumber: 'MD-12345',
    profession: 'Médico General',
    status: 'active',
    issueDate: '2020-03-15',
    expiryDate: '2025-03-15',
    state: 'Antioquia',
    email: 'maria.gonzalez@email.com',
    phone: '+57 300 123 4567',
    verified: true
  },
  {
    id: '2',
    name: 'Ing. Carlos Rodríguez',
    licenseNumber: 'ENG-67890',
    profession: 'Ingeniero Civil',
    status: 'active',
    issueDate: '2019-08-20',
    expiryDate: '2024-08-20',
    state: 'Cundinamarca',
    email: 'carlos.rodriguez@email.com',
    phone: '+57 301 987 6543',
    verified: true
  },
  {
    id: '3',
    name: 'Abg. Ana Martínez',
    licenseNumber: 'LAW-54321',
    profession: 'Abogado',
    status: 'expired',
    issueDate: '2018-01-10',
    expiryDate: '2023-01-10',
    state: 'Valle del Cauca',
    email: 'ana.martinez@email.com',
    phone: '+57 302 456 7890',
    verified: false
  }
]

// Textos en español e inglés
const texts = {
  es: {
    title: 'Verificación de Licencias Profesionales',
    subtitle: 'Verifica la validez de licencias profesionales de manera rápida y segura',
    searchPlaceholder: 'Buscar por nombre o número de licencia...',
    searchButton: 'Buscar',
    login: 'Iniciar Sesión',
    noResults: 'No se encontraron resultados',
    licenseNumber: 'Número de Licencia',
    profession: 'Profesión',
    status: 'Estado',
    issueDate: 'Fecha de Emisión',
    expiryDate: 'Fecha de Vencimiento',
    state: 'Departamento',
    contact: 'Contacto',
    verified: 'Verificado',
    notVerified: 'No Verificado',
    active: 'Activa',
    expired: 'Vencida',
    suspended: 'Suspendida',
    viewDetails: 'Ver Detalles'
  },
  en: {
    title: 'Professional License Verification',
    subtitle: 'Verify the validity of professional licenses quickly and securely',
    searchPlaceholder: 'Search by name or license number...',
    searchButton: 'Search',
    login: 'Login',
    noResults: 'No results found',
    licenseNumber: 'License Number',
    profession: 'Profession',
    status: 'Status',
    issueDate: 'Issue Date',
    expiryDate: 'Expiry Date',
    state: 'State',
    contact: 'Contact',
    verified: 'Verified',
    notVerified: 'Not Verified',
    active: 'Active',
    expired: 'Expired',
    suspended: 'Suspended',
    viewDetails: 'View Details'
  }
}

export default function HomePage() {
  const [language, setLanguage] = useState<'es' | 'en'>('es')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<License[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null)

  const t = texts[language]

  // Función de búsqueda
  const handleSearch = () => {
    if (!searchTerm.trim()) return

    setIsSearching(true)
    
    // Simular búsqueda con delay
    setTimeout(() => {
      const results = sampleLicenses.filter(license => 
        license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.profession.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 800)
  }

  // Función para obtener color según estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'expired': return 'text-red-600 bg-red-100'
      case 'suspended': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'es' ? 'es-CO' : 'en-US')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LicenseCheck</h1>
                <p className="text-xs text-gray-500">Professional Verification</p>
              </div>
            </div>

            {/* Botones del header */}
            <div className="flex items-center space-x-4">
              {/* Cambio de idioma */}
              <button
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>

              {/* Botón de login */}
              <button
                onClick={() => window.location.href = '/admin'}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">{t.login}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Formulario de búsqueda */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={t.searchPlaceholder}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span className="font-medium">
                  {isSearching ? '...' : t.searchButton}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Resultados de búsqueda */}
        {searchResults.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {searchResults.length} {searchResults.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((license) => (
                <div
                  key={license.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer"
                  onClick={() => setSelectedLicense(license)}
                >
                  {/* Header de la tarjeta */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {license.name}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {license.licenseNumber}
                      </p>
                    </div>
                    {license.verified ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>

                  {/* Información básica */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">{t.profession}</p>
                      <p className="font-medium">{license.profession}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">{t.status}</p>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(license.status)}`}>
                        {t[license.status as keyof typeof t]}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">{t.state}</p>
                      <p className="font-medium">{license.state}</p>
                    </div>
                  </div>

                  {/* Botón ver detalles */}
                  <button className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <ExternalLink className="h-4 w-4" />
                    <span>{t.viewDetails}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal de detalles */}
        {selectedLicense && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header del modal */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedLicense.name}
                    </h2>
                    <p className="text-blue-600 font-medium text-lg">
                      {selectedLicense.licenseNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLicense(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-8 w-8" />
                  </button>
                </div>

                {/* Estado de verificación */}
                <div className={`p-4 rounded-lg mb-6 flex items-center space-x-3 ${
                  selectedLicense.verified ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {selectedLicense.verified ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                  <span className={`font-semibold ${
                    selectedLicense.verified ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedLicense.verified ? t.verified : t.notVerified}
                  </span>
                </div>

                {/* Información detallada */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t.profession}</p>
                      <p className="font-semibold text-lg">{selectedLicense.profession}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t.status}</p>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedLicense.status)}`}>
                        {t[selectedLicense.status as keyof typeof t]}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t.issueDate}</p>
                      <p className="font-semibold flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(selectedLicense.issueDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t.expiryDate}</p>
                      <p className="font-semibold flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {formatDate(selectedLicense.expiryDate)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.state}</p>
                    <p className="font-semibold flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {selectedLicense.state}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-3">{t.contact}</p>
                    <div className="space-y-2">
                      <p className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {selectedLicense.email}
                      </p>
                      <p className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {selectedLicense.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje de no resultados */}
        {searchTerm && searchResults.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t.noResults}
              </h3>
              <p className="text-gray-600">
                Intenta con otro término de búsqueda
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">LicenseCheck</h3>
            </div>
            <p className="text-gray-400">
              Plataforma segura de verificación de licencias profesionales
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
