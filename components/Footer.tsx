import React from 'react';
import { EXTERNAL_LINK_URL, EXTERNAL_LINK_TEXT, APP_TITLE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white p-6 mt-auto">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          <a
            href={EXTERNAL_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline"
          >
            {EXTERNAL_LINK_TEXT}
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} {APP_TITLE} - SAETA S.A. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;