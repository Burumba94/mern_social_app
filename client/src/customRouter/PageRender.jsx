import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
//import NotFound from "../components/NotFound"; // Votre composant 404 ou page non trouvée
//import Loading from "../components/Loading"; // Votre composant de chargement, peut-être un spinner ou autre
import Home from '../pages/home.jsx';
import Profile from '../pages/profile/[id].jsx';

const PageRender = (page, id) => {
  switch (page) {
    case 'home':
      return Home;
    case 'profile':
      return Profile;
    // Ajoutez des cas pour d'autres pages
    default:
      throw new Error('Page not found');
  }
};

// Configuration des routes avec `react-router-dom`
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  // Page d'accueil
        <Route path="/about" element={<About />} />  // Page À propos
        <Route path="/:page/:id?" element={<DynamicPage />} />  // Route dynamique
        <Route path="*" element={<NotFound />} />  // Pour les routes non trouvées
      </Routes>
    </Router>
  );
};

export default AppRouter;
