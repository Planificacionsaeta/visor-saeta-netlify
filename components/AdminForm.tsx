
import React, { useState, useEffect, useCallback } from 'react';
import { Diversion, Corridor, DiversionType } from '../types';
import { CORRIDOR_DETAILS, DIVERSION_TYPE_DETAILS } from '../constants';

const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

interface AdminFormProps {
  onAddDiversion: (diversion: Diversion) => void;
  onAddMultipleDiversions?: (diversions: Diversion[]) => void; // For future mass upload
}

const AdminForm: React.FC<AdminFormProps> = ({ onAddDiversion, onAddMultipleDiversions }) => {
  const [linesInput, setLinesInput] = useState('');
  const [description, setDescription] = useState('');
  const [corridor, setCorridor] = useState<Corridor>(CORRIDOR_DETAILS[0].id);
  const [diversionType, setDiversionType] = useState<DiversionType>(DIVERSION_TYPE_DETAILS[0].id);
  const [estimatedDuration, setEstimatedDuration] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("La imagen es demasiado grande. Máximo 5MB.");
        setImageFile(null);
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setImageFile(null);
    }
  };

  const resetForm = (formElement?: HTMLFormElement) => {
    setLinesInput('');
    setDescription('');
    setCorridor(CORRIDOR_DETAILS[0].id);
    setDiversionType(DIVERSION_TYPE_DETAILS[0].id);
    setEstimatedDuration('');
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (formElement) {
      const fileInput = formElement.elements.namedItem('imageUpload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      const massUploadInput = formElement.elements.namedItem('massUpload') as HTMLInputElement;
      if (massUploadInput) massUploadInput.value = '';
    }
    setError(null);
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!linesInput.trim() || !description.trim() || !estimatedDuration.trim()) {
      setError("Líneas, descripción y duración estimada son obligatorios.");
      return;
    }

    const linesArray = linesInput.split(',').map(line => line.trim()).filter(line => line !== '');
    if (linesArray.length === 0) {
      setError("Debe ingresar al menos una línea afectada.");
      return;
    }

    const newDiversion: Diversion = {
      id: generateId(),
      description,
      corridor,
      lines: linesArray,
      publicationDate: new Date().toISOString().split('T')[0],
      type: diversionType,
      estimatedDuration,
      rawImageFile: imageFile || undefined,
    };

    onAddDiversion(newDiversion);
    resetForm(event.currentTarget);
  };

  const handleMassUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        console.log("Contenido del archivo para carga masiva:", content);
        try {
          // Attempt to parse as JSON array of Diversion objects
          // This is a simplified example; robust parsing and validation are needed.
          const parsedData = JSON.parse(content);
          if (Array.isArray(parsedData) && onAddMultipleDiversions) {
            // Here, you would validate each object in parsedData against the Diversion structure
            // For now, we assume it's correct for demonstration
            // onAddMultipleDiversions(parsedData as Diversion[]); 
            alert(`Archivo "${file.name}" leído. Contenido en consola. Implementar lógica de validación y guardado masivo.`);
          } else {
            alert(`Archivo "${file.name}" no es un JSON array válido para carga masiva.`);
          }
        } catch (parseError) {
          console.error("Error parseando archivo de carga masiva:", parseError);
          alert(`Error al procesar el archivo "${file.name}". Asegúrese de que sea un JSON válido.`);
        }
      };
      reader.onerror = () => {
        alert(`Error al leer el archivo "${file.name}".`);
      };
      reader.readAsText(file);
    }
  }, [onAddMultipleDiversions]);


  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Cargar Nuevo Desvío</h2>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Order: Lines, Description, Corridor, Type, Duration, Image */}
        <div>
          <label htmlFor="lines" className="block text-sm font-medium text-gray-700 mb-1">
            Línea(s) Afectada(s) <span className="text-xs text-gray-500">(separadas por coma, ej: 1A, 5B)</span>
          </label>
          <input
            type="text"
            id="lines"
            value={linesInput}
            onChange={(e) => setLinesInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción del Desvío
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Puedes usar Markdown para formato (ej: **negrita**, *cursiva*, - listas, [enlace](url)).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="corridor" className="block text-sm font-medium text-gray-700 mb-1">
              Corredor
            </label>
            <select
              id="corridor"
              value={corridor}
              onChange={(e) => setCorridor(e.target.value as Corridor)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white"
            >
              {CORRIDOR_DETAILS.map((cDetail) => (
                <option key={cDetail.id} value={cDetail.id}>{cDetail.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="diversionType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Desvío
            </label>
            <select
              id="diversionType"
              value={diversionType}
              onChange={(e) => setDiversionType(e.target.value as DiversionType)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white"
            >
              {DIVERSION_TYPE_DETAILS.map((dType) => (
                <option key={dType.id} value={dType.id}>{dType.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="estimatedDuration" className="block text-sm font-medium text-gray-700 mb-1">
            Tiempo Estimado <span className="text-xs text-gray-500">(ej: 2 hs, Hasta el DD/MM, Indefinido)</span>
          </label>
          <input
            type="text"
            id="estimatedDuration"
            value={estimatedDuration}
            onChange={(e) => setEstimatedDuration(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white"
            required
          />
        </div>
        
        <div>
          <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">
            Imagen Opcional (Mapa, Aviso, etc.)
          </label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept="image/png, image/jpeg, image/gif, image/webp"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
          {imagePreview && (
            <div className="mt-4 border border-gray-200 p-2 rounded-md inline-block">
              <img src={imagePreview} alt="Vista previa" className="max-h-48 rounded" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors text-base font-medium"
        >
          Agregar Desvío
        </button>
      </form>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-primary mb-4">Carga Masiva de Desvíos</h3>
        <p className="text-sm text-gray-600 mb-3">
          Sube un archivo JSON con un array de objetos de desvío para agregarlos todos a la vez. 
          Asegúrate de que cada objeto en el array siga la estructura de datos de un desvío.
          (Funcionalidad en desarrollo: por ahora solo lee el archivo).
        </p>
        <div>
          <label htmlFor="massUpload" className="block text-sm font-medium text-gray-700 mb-1">
            Archivo de Desvíos (.json)
          </label>
          <input
            type="file"
            id="massUpload"
            name="massUpload"
            accept=".json"
            onChange={handleMassUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 border border-gray-300"
          />
        </div>
      </div>

    </div>
  );
};

export default AdminForm;