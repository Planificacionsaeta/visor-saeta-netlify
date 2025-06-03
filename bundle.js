// index.tsx
import React4 from "react";
import ReactDOM from "react-dom/client";

// App.tsx
import { useState as useState2, useEffect as useEffect2, useCallback as useCallback2 } from "react";

// constants.ts
var APP_TITLE = "Desv\xEDos de L\xEDneas SAETA";
var EXTERNAL_LINK_URL = "https://www.saetasalta.com.ar";
var EXTERNAL_LINK_TEXT = "Sitio Oficial de SAETA";
var ClockIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clip-rule="evenodd" /></svg>`;
var CheckCircleIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`;
var InformationCircleIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>`;
var TRASH_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>`;
var DIVERSION_TYPE_DETAILS = [
  { id: "Moment\xE1neo" /* MOMENTARY */, name: "Moment\xE1neo", iconSvg: ClockIcon },
  { id: "Permanente" /* PERMANENT */, name: "Permanente", iconSvg: CheckCircleIcon },
  { id: "Otro" /* OTHER */, name: "Otro", iconSvg: InformationCircleIcon }
];
var darkText = "#333333";
var lightText = "#FFFFFF";
var CORRIDOR_DETAILS = [
  { id: "Corredor 1" /* CORREDOR_1 */, name: "Corredor 1 (Azul)", bgColor: "#007BFF", contentColor: lightText },
  { id: "Corredor 2" /* CORREDOR_2 */, name: "Corredor 2 (Rojo)", bgColor: "#DC3545", contentColor: lightText },
  { id: "Corredor 3" /* CORREDOR_3 */, name: "Corredor 3 (Marr\xF3n Claro)", bgColor: "#D2B48C", contentColor: darkText },
  { id: "Corredor 4" /* CORREDOR_4 */, name: "Corredor 4 (Gris)", bgColor: "#6C757D", contentColor: lightText },
  { id: "Corredor 5" /* CORREDOR_5 */, name: "Corredor 5 (Naranja)", bgColor: "#FD7E14", contentColor: lightText },
  { id: "Corredor 6" /* CORREDOR_6 */, name: "Corredor 6 (Celeste)", bgColor: "#0DCAF0", contentColor: darkText },
  { id: "Corredor 7" /* CORREDOR_7 */, name: "Corredor 7 (Amarillo)", bgColor: "#FFC107", contentColor: darkText },
  { id: "Corredor 8" /* CORREDOR_8 */, name: "Corredor 8 (Verde)", bgColor: "#198754", contentColor: lightText },
  { id: "Troncales" /* TRONCALES */, name: "Troncales (Lila)", bgColor: "#C8A2C8", contentColor: darkText },
  { id: "Metropolitano" /* METROPOLITANO */, name: "Metropolitano (Menta)", bgColor: "#98FB98", contentColor: darkText },
  { id: "Otro Corredor/Zona" /* OTRO */, name: "Otro Corredor/Zona (Gris Claro)", bgColor: "#E9ECEF", contentColor: darkText }
];
var CORREDORES_DISPONIBLES = CORRIDOR_DETAILS.map((c) => c.id);
var getCorridorDetail = (corridorId) => {
  return CORRIDOR_DETAILS.find((c) => c.id === corridorId);
};
var getDiversionTypeDetail = (typeId) => {
  return DIVERSION_TYPE_DETAILS.find((dt) => dt.id === typeId);
};
var INITIAL_DIVERSIONS_DATA = [
  {
    id: "1",
    description: "**Atenci\xF3n:** Desv\xEDo en _Av. Principal_ por obras en el carril derecho.\n\nTomar rutas alternas indicadas:\n- Calle A\n- Calle B\n\nConsultar mapa para m\xE1s detalles.",
    corridor: "Corredor 1" /* CORREDOR_1 */,
    lines: ["1A", "1B"],
    publicationDate: "2024-07-27",
    type: "Moment\xE1neo" /* MOMENTARY */,
    estimatedDuration: "Hasta el 30/07/2024"
  },
  {
    id: "2",
    description: "Cierre total de Calle Secundaria debido a evento deportivo.\n*Vigencia hasta las 18:00 hrs del d\xEDa de hoy.*",
    corridor: "Corredor 2" /* CORREDOR_2 */,
    lines: ["2F", "2G"],
    publicationDate: "2024-07-28",
    type: "Moment\xE1neo" /* MOMENTARY */,
    estimatedDuration: "Solo por hoy, hasta 18:00hs"
  },
  {
    id: "3",
    description: "La parada de la *L\xEDnea 7A* en Plaza Flores se mueve permanentemente a la esquina de Rivadavia y Artigas debido a la peatonalizaci\xF3n.",
    corridor: "Corredor 7" /* CORREDOR_7 */,
    // Uses darkText
    lines: ["7A", "7B", "7CD"],
    publicationDate: "2024-07-25",
    imageUrl: "https://picsum.photos/400/200?random=3",
    type: "Permanente" /* PERMANENT */,
    estimatedDuration: "Permanente"
  },
  {
    id: "4",
    description: "Servicio Troncal Norte-Sur con modificaci\xF3n de parada en Plaza Central.\n\n- **Parada anterior:** Frente al Banco Naci\xF3n\n- **Nueva parada:** Esquina Correo Argentino",
    corridor: "Troncales" /* TRONCALES */,
    // Uses darkText
    lines: ["Troncal NS"],
    publicationDate: "2024-07-29",
    type: "Otro" /* OTHER */,
    estimatedDuration: "Indefinido"
  }
];

// components/Header.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Header = ({ onToggleAdmin, isAdminView }) => {
  return /* @__PURE__ */ jsx("header", { className: "bg-primary text-white p-4 shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex justify-between items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: APP_TITLE }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onToggleAdmin,
        className: "bg-white text-primary px-4 py-2 rounded hover:bg-gray-200 transition-colors",
        children: isAdminView ? "Ver Desv\xEDos" : "Administrar Desv\xEDos"
      }
    )
  ] }) });
};
var Header_default = Header;

// components/Footer.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Footer = () => {
  return /* @__PURE__ */ jsx2("footer", { className: "bg-dark text-white p-6 mt-auto", children: /* @__PURE__ */ jsxs2("div", { className: "container mx-auto text-center", children: [
    /* @__PURE__ */ jsx2("p", { className: "mb-2", children: /* @__PURE__ */ jsx2(
      "a",
      {
        href: EXTERNAL_LINK_URL,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "hover:text-primary underline",
        children: EXTERNAL_LINK_TEXT
      }
    ) }),
    /* @__PURE__ */ jsxs2("p", { children: [
      "\xA9 ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      APP_TITLE,
      " - SAETA S.A. Todos los derechos reservados."
    ] })
  ] }) });
};
var Footer_default = Footer;

// components/DiversionCard.tsx
import React from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var DiversionCard = ({ diversion, isAdminView, onDelete }) => {
  const [imageSrc, setImageSrc] = React.useState(diversion.imageUrl);
  const corridorDetail = getCorridorDetail(diversion.corridor);
  const typeDetail = getDiversionTypeDetail(diversion.type);
  React.useEffect(() => {
    let objectUrl;
    if (diversion.rawImageFile) {
      objectUrl = URL.createObjectURL(diversion.rawImageFile);
      setImageSrc(objectUrl);
    } else if (diversion.imageUrl) {
      setImageSrc(diversion.imageUrl);
    } else {
      setImageSrc(void 0);
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [diversion.rawImageFile, diversion.imageUrl]);
  const cardStyle = {
    backgroundColor: corridorDetail?.bgColor || "#FFFFFF",
    // Default to white if no color defined
    color: corridorDetail?.contentColor || "#333333"
    // Default to dark text
  };
  const htmlDescription = React.useMemo(() => {
    if (typeof marked !== "undefined" && diversion.description) {
      return marked.parse(diversion.description);
    }
    return diversion.description;
  }, [diversion.description]);
  const handleDelete = () => {
    if (window.confirm("\xBFEst\xE1s seguro de que deseas eliminar este desv\xEDo? Esta acci\xF3n no se puede deshacer.")) {
      onDelete(diversion.id);
    }
  };
  const proseClasses = [
    "text-sm leading-relaxed prose prose-sm max-w-none flex-grow",
    corridorDetail && corridorDetail.contentColor === "#FFFFFF" ? "prose-invert" : ""
  ].join(" ").trim();
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      className: "rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col relative",
      style: cardStyle,
      children: [
        isAdminView && /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: handleDelete,
            "aria-label": "Eliminar desv\xEDo",
            className: "absolute top-2 right-2 p-2 rounded-full hover:bg-black/20 transition-colors z-10",
            style: { color: cardStyle.color },
            children: /* @__PURE__ */ jsx3("span", { dangerouslySetInnerHTML: { __html: TRASH_ICON_SVG }, className: "h-5 w-5" })
          }
        ),
        imageSrc && /* @__PURE__ */ jsx3(
          "img",
          {
            src: imageSrc,
            alt: `Desv\xEDo ${diversion.lines.join(", ")}`,
            className: "w-full h-48 object-cover"
          }
        ),
        /* @__PURE__ */ jsxs3("div", { className: "p-6 flex-grow flex flex-col", children: [
          /* @__PURE__ */ jsxs3("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx3(
              "h3",
              {
                className: "text-xl font-semibold",
                children: corridorDetail?.name || diversion.corridor
              }
            ),
            /* @__PURE__ */ jsxs3("p", { className: "text-sm opacity-80", children: [
              "L\xEDnea(s): ",
              /* @__PURE__ */ jsx3("span", { className: "font-medium", children: diversion.lines.join(", ") })
            ] })
          ] }),
          typeDetail && /* @__PURE__ */ jsxs3("div", { className: "flex items-center text-sm opacity-90 mb-2", children: [
            /* @__PURE__ */ jsx3("span", { dangerouslySetInnerHTML: { __html: typeDetail.iconSvg }, className: "mr-1 h-5 w-5 flex-shrink-0" }),
            /* @__PURE__ */ jsx3("span", { children: typeDetail.name })
          ] }),
          /* @__PURE__ */ jsx3(
            "div",
            {
              className: proseClasses,
              dangerouslySetInnerHTML: { __html: htmlDescription },
              style: { "--tw-prose-body": cardStyle.color, "--tw-prose-headings": cardStyle.color, "--tw-prose-links": cardStyle.color, "--tw-prose-bold": cardStyle.color, "--tw-prose-counters": cardStyle.color, "--tw-prose-bullets": cardStyle.color, "--tw-prose-hr": cardStyle.color, "--tw-prose-quotes": cardStyle.color, "--tw-prose-quote-borders": cardStyle.color, "--tw-prose-captions": cardStyle.color, "--tw-prose-code": cardStyle.color, "--tw-prose-pre-code": cardStyle.color, "--tw-prose-pre-bg": "rgba(0,0,0,0.1)", "--tw-prose-th-borders": cardStyle.color, "--tw-prose-td-borders": cardStyle.color }
            }
          ),
          /* @__PURE__ */ jsxs3("div", { className: "mt-auto pt-3 border-t", style: {
            borderColor: `${cardStyle.color}33`
            /* Lighter border based on content color */
          }, children: [
            diversion.estimatedDuration && /* @__PURE__ */ jsxs3("p", { className: "text-xs opacity-80 mb-1", children: [
              /* @__PURE__ */ jsx3("span", { className: "font-semibold", children: "Duraci\xF3n:" }),
              " ",
              diversion.estimatedDuration
            ] }),
            /* @__PURE__ */ jsxs3("p", { className: "text-xs opacity-70", children: [
              "Publicado: ",
              new Date(diversion.publicationDate).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
            ] })
          ] })
        ] })
      ]
    }
  );
};
var DiversionCard_default = DiversionCard;

// components/AdminForm.tsx
import { useState, useEffect, useCallback } from "react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
var AdminForm = ({ onAddDiversion, onAddMultipleDiversions }) => {
  const [linesInput, setLinesInput] = useState("");
  const [description, setDescription] = useState("");
  const [corridor, setCorridor] = useState(CORRIDOR_DETAILS[0].id);
  const [diversionType, setDiversionType] = useState(DIVERSION_TYPE_DETAILS[0].id);
  const [estimatedDuration, setEstimatedDuration] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  const handleImageChange = (event) => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen es demasiado grande. M\xE1ximo 5MB.");
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
  const resetForm = (formElement) => {
    setLinesInput("");
    setDescription("");
    setCorridor(CORRIDOR_DETAILS[0].id);
    setDiversionType(DIVERSION_TYPE_DETAILS[0].id);
    setEstimatedDuration("");
    setImageFile(null);
    if (imagePreview)
      URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    if (formElement) {
      const fileInput = formElement.elements.namedItem("imageUpload");
      if (fileInput)
        fileInput.value = "";
      const massUploadInput = formElement.elements.namedItem("massUpload");
      if (massUploadInput)
        massUploadInput.value = "";
    }
    setError(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    if (!linesInput.trim() || !description.trim() || !estimatedDuration.trim()) {
      setError("L\xEDneas, descripci\xF3n y duraci\xF3n estimada son obligatorios.");
      return;
    }
    const linesArray = linesInput.split(",").map((line) => line.trim()).filter((line) => line !== "");
    if (linesArray.length === 0) {
      setError("Debe ingresar al menos una l\xEDnea afectada.");
      return;
    }
    const newDiversion = {
      id: generateId(),
      description,
      corridor,
      lines: linesArray,
      publicationDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      type: diversionType,
      estimatedDuration,
      rawImageFile: imageFile || void 0
    };
    onAddDiversion(newDiversion);
    resetForm(event.currentTarget);
  };
  const handleMassUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        console.log("Contenido del archivo para carga masiva:", content);
        try {
          const parsedData = JSON.parse(content);
          if (Array.isArray(parsedData) && onAddMultipleDiversions) {
            alert(`Archivo "${file.name}" le\xEDdo. Contenido en consola. Implementar l\xF3gica de validaci\xF3n y guardado masivo.`);
          } else {
            alert(`Archivo "${file.name}" no es un JSON array v\xE1lido para carga masiva.`);
          }
        } catch (parseError) {
          console.error("Error parseando archivo de carga masiva:", parseError);
          alert(`Error al procesar el archivo "${file.name}". Aseg\xFArese de que sea un JSON v\xE1lido.`);
        }
      };
      reader.onerror = () => {
        alert(`Error al leer el archivo "${file.name}".`);
      };
      reader.readAsText(file);
    }
  }, [onAddMultipleDiversions]);
  return /* @__PURE__ */ jsxs4("div", { className: "bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-2xl mx-auto my-8", children: [
    /* @__PURE__ */ jsx4("h2", { className: "text-2xl font-bold text-primary mb-6", children: "Cargar Nuevo Desv\xEDo" }),
    error && /* @__PURE__ */ jsx4("p", { className: "bg-red-100 text-red-700 p-3 rounded mb-4 text-sm", children: error }),
    /* @__PURE__ */ jsxs4("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsxs4("label", { htmlFor: "lines", className: "block text-sm font-medium text-gray-700 mb-1", children: [
          "L\xEDnea(s) Afectada(s) ",
          /* @__PURE__ */ jsx4("span", { className: "text-xs text-gray-500", children: "(separadas por coma, ej: 1A, 5B)" })
        ] }),
        /* @__PURE__ */ jsx4(
          "input",
          {
            type: "text",
            id: "lines",
            value: linesInput,
            onChange: (e) => setLinesInput(e.target.value),
            className: "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx4("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-700 mb-1", children: "Descripci\xF3n del Desv\xEDo" }),
        /* @__PURE__ */ jsx4(
          "textarea",
          {
            id: "description",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            rows: 5,
            className: "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white",
            required: true
          }
        ),
        /* @__PURE__ */ jsx4("p", { className: "text-xs text-gray-500 mt-1", children: "Puedes usar Markdown para formato (ej: **negrita**, *cursiva*, - listas, [enlace](url))." })
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx4("label", { htmlFor: "corridor", className: "block text-sm font-medium text-gray-700 mb-1", children: "Corredor" }),
          /* @__PURE__ */ jsx4(
            "select",
            {
              id: "corridor",
              value: corridor,
              onChange: (e) => setCorridor(e.target.value),
              className: "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white",
              children: CORRIDOR_DETAILS.map((cDetail) => /* @__PURE__ */ jsx4("option", { value: cDetail.id, children: cDetail.name }, cDetail.id))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx4("label", { htmlFor: "diversionType", className: "block text-sm font-medium text-gray-700 mb-1", children: "Tipo de Desv\xEDo" }),
          /* @__PURE__ */ jsx4(
            "select",
            {
              id: "diversionType",
              value: diversionType,
              onChange: (e) => setDiversionType(e.target.value),
              className: "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white",
              children: DIVERSION_TYPE_DETAILS.map((dType) => /* @__PURE__ */ jsx4("option", { value: dType.id, children: dType.name }, dType.id))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsxs4("label", { htmlFor: "estimatedDuration", className: "block text-sm font-medium text-gray-700 mb-1", children: [
          "Tiempo Estimado ",
          /* @__PURE__ */ jsx4("span", { className: "text-xs text-gray-500", children: "(ej: 2 hs, Hasta el DD/MM, Indefinido)" })
        ] }),
        /* @__PURE__ */ jsx4(
          "input",
          {
            type: "text",
            id: "estimatedDuration",
            value: estimatedDuration,
            onChange: (e) => setEstimatedDuration(e.target.value),
            className: "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx4("label", { htmlFor: "imageUpload", className: "block text-sm font-medium text-gray-700 mb-1", children: "Imagen Opcional (Mapa, Aviso, etc.)" }),
        /* @__PURE__ */ jsx4(
          "input",
          {
            type: "file",
            id: "imageUpload",
            name: "imageUpload",
            accept: "image/png, image/jpeg, image/gif, image/webp",
            onChange: handleImageChange,
            className: "w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          }
        ),
        imagePreview && /* @__PURE__ */ jsx4("div", { className: "mt-4 border border-gray-200 p-2 rounded-md inline-block", children: /* @__PURE__ */ jsx4("img", { src: imagePreview, alt: "Vista previa", className: "max-h-48 rounded" }) })
      ] }),
      /* @__PURE__ */ jsx4(
        "button",
        {
          type: "submit",
          className: "w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors text-base font-medium",
          children: "Agregar Desv\xEDo"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "mt-10 pt-6 border-t border-gray-200", children: [
      /* @__PURE__ */ jsx4("h3", { className: "text-xl font-semibold text-primary mb-4", children: "Carga Masiva de Desv\xEDos" }),
      /* @__PURE__ */ jsx4("p", { className: "text-sm text-gray-600 mb-3", children: "Sube un archivo JSON con un array de objetos de desv\xEDo para agregarlos todos a la vez. Aseg\xFArate de que cada objeto en el array siga la estructura de datos de un desv\xEDo. (Funcionalidad en desarrollo: por ahora solo lee el archivo)." }),
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx4("label", { htmlFor: "massUpload", className: "block text-sm font-medium text-gray-700 mb-1", children: "Archivo de Desv\xEDos (.json)" }),
        /* @__PURE__ */ jsx4(
          "input",
          {
            type: "file",
            id: "massUpload",
            name: "massUpload",
            accept: ".json",
            onChange: handleMassUpload,
            className: "w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 border border-gray-300"
          }
        )
      ] })
    ] })
  ] });
};
var AdminForm_default = AdminForm;

// App.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var App = () => {
  const [diversions, setDiversions] = useState2(INITIAL_DIVERSIONS_DATA);
  const [isAdminView, setIsAdminView] = useState2(false);
  const [selectedCorridor, setSelectedCorridor] = useState2("");
  const [filterLine, setFilterLine] = useState2("");
  const loadDiversions = useCallback2(() => {
    const storedDiversions = localStorage.getItem("saetaDiversions");
    if (storedDiversions) {
      try {
        const parsedDiversions = JSON.parse(storedDiversions);
        if (Array.isArray(parsedDiversions) && (parsedDiversions.length === 0 || parsedDiversions[0]?.id)) {
          setDiversions(parsedDiversions);
          return;
        }
      } catch (e) {
        console.error("Error parsing diversions from localStorage", e);
        localStorage.removeItem("saetaDiversions");
      }
    }
    setDiversions(INITIAL_DIVERSIONS_DATA);
  }, []);
  const saveDiversions = useCallback2((currentDiversions) => {
    const diversionsToStore = currentDiversions.map((d) => ({ ...d, rawImageFile: void 0 }));
    localStorage.setItem("saetaDiversions", JSON.stringify(diversionsToStore));
  }, []);
  useEffect2(() => {
    loadDiversions();
  }, [loadDiversions]);
  useEffect2(() => {
    saveDiversions(diversions);
  }, [diversions, saveDiversions]);
  const handleAddDiversion = useCallback2((newDiversion) => {
    setDiversions((prevDiversions) => {
      const updatedDiversions = [newDiversion, ...prevDiversions];
      return updatedDiversions;
    });
  }, []);
  const handleDeleteDiversion = useCallback2((idToDelete) => {
    setDiversions(
      (prevDiversions) => prevDiversions.filter((diversion) => diversion.id !== idToDelete)
    );
  }, []);
  const handleAddMultipleDiversions = useCallback2((newDiversions) => {
    const processedNewDiversions = newDiversions.map((d) => ({
      ...d,
      id: d.id || Math.random().toString(36).substring(2, 15),
      // Ensure ID
      publicationDate: d.publicationDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      // Ensure publication date
    }));
    setDiversions((prevDiversions) => {
      const updatedDiversions = [...processedNewDiversions, ...prevDiversions];
      return updatedDiversions;
    });
    alert(`${newDiversions.length} desv\xEDos agregados desde archivo. (Funcionalidad de guardado completo a\xFAn en desarrollo).`);
  }, []);
  const toggleAdminView = useCallback2(() => {
    setIsAdminView((prev) => !prev);
  }, []);
  const filteredDiversions = diversions.filter((diversion) => {
    const corridorMatch = selectedCorridor ? diversion.corridor === selectedCorridor : true;
    const lineMatch = filterLine ? diversion.lines.some((line) => line.toLowerCase().includes(filterLine.toLowerCase())) : true;
    return corridorMatch && lineMatch;
  }).sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
  useEffect2(() => {
    if (process.env.API_KEY) {
      console.log("API_KEY for Gemini is available (not used in this app version).");
    } else {
      console.warn("API_KEY for Gemini is NOT configured in environment variables.");
    }
  }, []);
  return /* @__PURE__ */ jsxs5("div", { className: "flex flex-col min-h-screen bg-gray-100", children: [
    /* @__PURE__ */ jsx5(Header_default, { onToggleAdmin: toggleAdminView, isAdminView }),
    /* @__PURE__ */ jsxs5("main", { className: "container mx-auto p-4 sm:p-6 lg:p-8 flex-grow w-full", children: [
      isAdminView && /* @__PURE__ */ jsx5(
        AdminForm_default,
        {
          onAddDiversion: handleAddDiversion,
          onAddMultipleDiversions: handleAddMultipleDiversions
        }
      ),
      /* @__PURE__ */ jsxs5("div", { className: `p-6 bg-white rounded-lg shadow-md ${isAdminView ? "mt-8" : "mb-8"}`, children: [
        /* @__PURE__ */ jsx5("h2", { className: "text-xl font-semibold text-primary mb-4", children: isAdminView ? "Gestionar / Filtrar Desv\xEDos Existentes" : "Filtrar Desv\xEDos" }),
        /* @__PURE__ */ jsxs5("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxs5("div", { children: [
            /* @__PURE__ */ jsx5("label", { htmlFor: "corridorFilter", className: "block text-sm font-medium text-gray-700 mb-1", children: "Corredor" }),
            /* @__PURE__ */ jsxs5(
              "select",
              {
                id: "corridorFilter",
                value: selectedCorridor,
                onChange: (e) => setSelectedCorridor(e.target.value),
                className: "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white",
                children: [
                  /* @__PURE__ */ jsx5("option", { value: "", children: "Todos los Corredores" }),
                  CORRIDOR_DETAILS.map((cDetail) => /* @__PURE__ */ jsx5("option", { value: cDetail.id, children: cDetail.name }, cDetail.id))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs5("div", { children: [
            /* @__PURE__ */ jsx5("label", { htmlFor: "lineFilter", className: "block text-sm font-medium text-gray-700 mb-1", children: "L\xEDnea (ej: 1A, 5B)" }),
            /* @__PURE__ */ jsx5(
              "input",
              {
                type: "text",
                id: "lineFilter",
                placeholder: "Buscar por l\xEDnea...",
                value: filterLine,
                onChange: (e) => setFilterLine(e.target.value),
                className: "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white"
              }
            )
          ] })
        ] })
      ] }),
      filteredDiversions.length > 0 ? /* @__PURE__ */ jsx5("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8", children: filteredDiversions.map((diversion) => /* @__PURE__ */ jsx5(
        DiversionCard_default,
        {
          diversion,
          isAdminView,
          onDelete: handleDeleteDiversion
        },
        diversion.id
      )) }) : /* @__PURE__ */ jsxs5("div", { className: "text-center py-12 bg-white rounded-lg shadow p-8 mt-8", children: [
        /* @__PURE__ */ jsx5("svg", { xmlns: "http://www.w3.org/2000/svg", className: "mx-auto h-16 w-16 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1, children: /* @__PURE__ */ jsx5("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0zM7 16l2.5-2.5M14.5 9.5L17 12" }) }),
        /* @__PURE__ */ jsx5("p", { className: "mt-4 text-lg font-semibold text-gray-700", children: "No se encontraron desv\xEDos con los filtros seleccionados." }),
        /* @__PURE__ */ jsx5("p", { className: "text-sm text-gray-500 mt-1", children: "Intenta ajustar tus criterios de b\xFAsqueda o revisa m\xE1s tarde." })
      ] })
    ] }),
    /* @__PURE__ */ jsx5(Footer_default, {})
  ] });
};
var App_default = App;

// index.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
var root = ReactDOM.createRoot(rootElement);
root.render(
  /* @__PURE__ */ jsx6(React4.StrictMode, { children: /* @__PURE__ */ jsx6(App_default, {}) })
);
