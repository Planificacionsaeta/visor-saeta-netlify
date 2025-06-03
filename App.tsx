
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DiversionCard from './components/DiversionCard';
import AdminForm from './components/AdminForm';
import { Diversion, Corridor } from './types';
import { CORRIDOR_DETAILS, INITIAL_DIVERSIONS_DATA } from './constants';

const App: React.FC = () => {
  const [diversions, setDiversions] = useState<Diversion[]>(INITIAL_DIVERSIONS_DATA as Diversion[]);
  const [isAdminView, setIsAdminView] = useState(false);
  const [selectedCorridor, setSelectedCorridor] = useState<Corridor | ''>('');
  const [filterLine, setFilterLine] = useState('');

  const loadDiversions = useCallback(() => {
    // Try to load from localStorage
    const storedDiversions = localStorage.getItem('saetaDiversions');
    if (storedDiversions) {
      try {
        const parsedDiversions = JSON.parse(storedDiversions) as Diversion[];
        // Basic validation: check if it's an array and first item has an id (not exhaustive)
        if (Array.isArray(parsedDiversions) && (parsedDiversions.length === 0 || parsedDiversions[0]?.id)) {
           setDiversions(parsedDiversions);
           return;
        }
      } catch (e) {
        console.error("Error parsing diversions from localStorage", e);
        localStorage.removeItem('saetaDiversions'); // Clear corrupted data
      }
    }
    // Fallback to initial data if localStorage is empty or corrupted
    setDiversions(INITIAL_DIVERSIONS_DATA as Diversion[]);
  }, []);

  const saveDiversions = useCallback((currentDiversions: Diversion[]) => {
    // For simplicity, images (rawImageFile) are not persisted in localStorage.
    // In a real app, images would be uploaded to a server and their URLs stored.
    const diversionsToStore = currentDiversions.map(d => ({ ...d, rawImageFile: undefined }));
    localStorage.setItem('saetaDiversions', JSON.stringify(diversionsToStore));
  }, []);

  useEffect(() => {
    loadDiversions();
  }, [loadDiversions]);
  
  useEffect(() => {
    saveDiversions(diversions);
  }, [diversions, saveDiversions]);


  const handleAddDiversion = useCallback((newDiversion: Diversion) => {
    setDiversions(prevDiversions => {
      const updatedDiversions = [newDiversion, ...prevDiversions];
      return updatedDiversions;
    });
    setIsAdminView(false); 
  }, []);
  
  // Conceptual handler for mass upload.
  // In a real app, this would need robust validation and error handling.
  const handleAddMultipleDiversions = useCallback((newDiversions: Diversion[]) => {
    // Add IDs and publication dates if missing (simplification for now)
    const processedNewDiversions = newDiversions.map(d => ({
      ...d,
      id: d.id || Math.random().toString(36).substring(2, 15),
      publicationDate: d.publicationDate || new Date().toISOString().split('T')[0],
    }));

    setDiversions(prevDiversions => {
      const updatedDiversions = [...processedNewDiversions, ...prevDiversions];
      return updatedDiversions;
    });
    alert(`${newDiversions.length} desvíos agregados desde archivo. (Revisar y persistir)`);
    setIsAdminView(false);
  }, []);


  const toggleAdminView = useCallback(() => {
    setIsAdminView(prev => !prev);
  }, []);

  const filteredDiversions = diversions.filter(diversion => {
    const corridorMatch = selectedCorridor ? diversion.corridor === selectedCorridor : true;
    const lineMatch = filterLine 
      ? diversion.lines.some(line => line.toLowerCase().includes(filterLine.toLowerCase())) 
      : true;
    return corridorMatch && lineMatch;
  }).sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
  
   return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header onToggleAdmin={toggleAdminView} isAdminView={isAdminView} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow w-full">
        {isAdminView ? (
          <AdminForm 
            onAddDiversion={handleAddDiversion} 
            onAddMultipleDiversions={handleAddMultipleDiversions} // Pass the new handler
          />
        ) : (
          <>
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary mb-4">Filtrar Desvíos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="corridorFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    Corredor
                  </label>
                  <select
                    id="corridorFilter"
                    value={selectedCorridor}
                    onChange={(e) => setSelectedCorridor(e.target.value as Corridor | '')}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white"
                  >
                    <option value="">Todos los Corredores</option>
                    {CORRIDOR_DETAILS.map(cDetail => (
                      <option key={cDetail.id} value={cDetail.id}>{cDetail.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="lineFilter" className="block text-sm font-medium text-gray-700 mb-1">
                    Línea (ej: 1A, 5B)
                  </label>
                  <input
                    type="text"
                    id="lineFilter"
                    placeholder="Buscar por línea..."
                    value={filterLine}
                    onChange={(e) => setFilterLine(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white"
                  />
                </div>
              </div>
            </div>

            {filteredDiversions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDiversions.map(diversion => (
                  <DiversionCard key={diversion.id} diversion={diversion} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow p-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zM7 16l2.5-2.5M14.5 9.5L17 12" />
                </svg>
                <p className="mt-4 text-lg font-semibold text-gray-700">
                  No se encontraron desvíos con los filtros seleccionados.
                </p>
                <p className="text-sm text-gray-500 mt-1">Intenta ajustar tus criterios de búsqueda o revisa más tarde.</p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;