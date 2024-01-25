import React from "react";
import { useState } from "react";

function Demandes() {
  // TODO :   Quand le role est student => fetch data
  const demandesList = [
    { id: 1, nom: "Malo Le Corvec", type: "Stage M1", status: "Information du stage" },
    { id: 2, nom: "Benjamin Liszewski", type: "Stage M1", status: "Information du stage" },
    { id: 3, nom: "Victor Tran", type: "Stage M1", status: "Information du stage" },
    { id: 4, nom: "Pape Mouhamadou Mamoune Sock", type: "Stage M1", status: "Information du stage" },
    { id: 1, nom: "Malo Le Corvec", type: "Stage M1", status: "Information du stage" },
    { id: 2, nom: "Benjamin Liszewski", type: "Stage M1", status: "Information du stage" },
    { id: 3, nom: "Victor Tran", type: "Stage M1", status: "Information du stage" },
    { id: 4, nom: "Pape Mouhamadou Mamoune Sock", type: "Stage M1", status: "Information du stage" },
    { id: 1, nom: "Malo Le Corvec", type: "Stage M1", status: "Information du stage" },
  ];
  const [showAll, setShowAll] = useState(false);

  const displayedDemandes = showAll ? demandesList : demandesList.slice(0, 7);
  return (
    <div>
      <div className="p-10 ml-24 responsive-padding responsive-margin">
        <h1 className="font-bold text-3xl text-[#163767] mb-4 ml-6">Mes Demandes ({displayedDemandes.length})</h1>
        <div className="bg-white rounded-lg p-5 responsive-width">
          {displayedDemandes.map((demande) => (
            <div
              key={demande.id}
              className="flex items-center justify-between mb-2 p-2 bg-[#F5F8FB] mr-20 w-11/12 rounded-md responsive-margin responsive-width"
            >
              <div className="w-4/12 flex flex-col">
                <p className="font-bold ml-24">{demande.nom}</p>
                <p className="ml-24 text-gray-800">{demande.type}</p>
              </div>
              <div className="w-2/12 mr-48">
                <a href={demande.url} className="text-[#163767] underline">
                  {demande.status}
                </a>
              </div>
              <div className="mr-8 w-3/12">
                <button className="px-3 py-2 border-2 border-green-300 text-green-300 rounded-md mr-3 hover:bg-green-300 hover:text-white">
                  Accepter
                </button>
                <button className="px-3 py-2 border-2 border-red-300 text-red-300 rounded-md hover:bg-red-300 hover:text-white">Refuser</button>
              </div>
            </div>
          ))}
        </div>
        {demandesList.length > 7 && !showAll && (
          <div className="flex justify-center w-full mt-4">
            <button className="bg-[#163767] text-white py-2 px-4  rounded hover:bg-white hover:text-[#163767]" onClick={() => setShowAll(true)}>
              Voir autres demandes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Demandes;
