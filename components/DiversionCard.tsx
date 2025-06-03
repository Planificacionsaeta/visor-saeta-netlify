
import React from 'react';
import { Diversion, DiversionType } from '../types';
import { getCorridorDetail, getDiversionTypeDetail } from '../constants';

// Ensure marked is available (it's loaded from CDN in index.html)
declare var marked: { parse: (markdown: string) => string };

interface DiversionCardProps {
  diversion: Diversion;
}

const DiversionCard: React.FC<DiversionCardProps> = ({ diversion }) => {
  const [imageSrc, setImageSrc] = React.useState<string | undefined>(diversion.imageUrl);
  const corridorDetail = getCorridorDetail(diversion.corridor);
  const typeDetail = getDiversionTypeDetail(diversion.type);

  React.useEffect(() => {
    let objectUrl: string | undefined;
    if (diversion.rawImageFile) {
      objectUrl = URL.createObjectURL(diversion.rawImageFile);
      setImageSrc(objectUrl);
    } else if (diversion.imageUrl) {
      setImageSrc(diversion.imageUrl);
    } else {
      setImageSrc(undefined);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [diversion.rawImageFile, diversion.imageUrl]);

  const corridorStyle = {
    color: corridorDetail?.textColor || corridorDetail?.color || 'inherit',
  };

  const htmlDescription = React.useMemo(() => {
    if (typeof marked !== 'undefined' && diversion.description) {
      return marked.parse(diversion.description);
    }
    return diversion.description; // Fallback if marked is not loaded or no description
  }, [diversion.description]);


  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={`Desvío ${diversion.lines.join(', ')}`} 
          className="w-full h-48 object-cover" 
        />
      )}
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-3">
          <h3 
            className="text-xl font-semibold"
            style={corridorStyle}
          >
            {corridorDetail?.name || diversion.corridor}
          </h3>
          <p className="text-sm text-gray-500">
            Línea(s): <span className="font-medium text-dark">{diversion.lines.join(', ')}</span>
          </p>
        </div>

        {typeDetail && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span dangerouslySetInnerHTML={{ __html: typeDetail.iconSvg }} className="mr-1 h-5 w-5 flex-shrink-0"></span>
            <span>{typeDetail.name}</span>
          </div>
        )}
        
        <div 
            className="text-gray-700 mb-3 text-sm leading-relaxed prose prose-sm max-w-none flex-grow"
            dangerouslySetInnerHTML={{ __html: htmlDescription }} 
        />
        
        <div className="mt-auto pt-3 border-t border-gray-200">
          {diversion.estimatedDuration && (
            <p className="text-xs text-gray-500 mb-1">
              <span className="font-semibold">Duración:</span> {diversion.estimatedDuration}
            </p>
          )}
          <p className="text-xs text-gray-400">
            Publicado: {new Date(diversion.publicationDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiversionCard;