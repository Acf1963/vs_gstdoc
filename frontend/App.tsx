import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../src/router";

import Header from "./components/Header";
import EntityModal from "./components/EntityModal";
import { Entity, EntityType } from "./components/EntityModal.types";

export default function App() {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [showEntityModal, setShowEntityModal] = useState(false);
  const [activeType, setActiveType] = useState<EntityType>("caixas");

  const openModalFor = (type: EntityType) => {
    setActiveType(type);
    setShowEntityModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Header openModalFor={openModalFor} />

      <RouterProvider router={router} />

      {showEntityModal && (
        <EntityModal
          open={showEntityModal}
          onClose={() => setShowEntityModal(false)}
          activeType={activeType}
          entities={entities}
          setEntities={setEntities}
        />
      )}
    </div>
  );
}
