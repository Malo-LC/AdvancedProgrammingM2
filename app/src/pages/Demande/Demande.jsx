import React from 'react';
import Navbar from "../../components/Navbar/Navbar";

function Demandes() {

    // TODO :   Quand le role est student => fetch data  
    const demandesList = [
        { id: 1, nom: 'Malo Le Corvec', type: 'Stage M1', status: 'Information du stage' },
        { id: 2, nom: 'Benjamin Liszewski', type: 'Stage M1', status: 'Information du stage' },
        { id: 3, nom: 'Victor Tran', type: 'Stage M1', status: 'Information du stage' },
        { id: 4, nom: 'Pape Mouhamadou Mamoune Sock', type: 'Stage M1', status: 'Information du stage' },
    ];

    return (
        <div>
            <Navbar />
            <div className="p-5 ml-24">
                <h1 className="font-bold text-lg text-blue-800 mb-5 ml-6">Mes Demandes ({demandesList.length})</h1>
                <div className="bg-white rounded-lg p-5">
                    {demandesList.map((demande) => (
                        <div key={demande.id} className="flex items-center justify-between mb-2 p-2 bg-[#F5F8FB] rounded-md">
                            <div className="w-1/3 flex flex-col">
                                <p className="font-bold ml-24">{demande.nom}</p>
                                <p className="ml-24 text-gray-800">{demande.type}</p>
                            </div>
                            <div className="w-1/3 mr-48">
                            <a href={demande.url} className="text-blue-800 underline">{demande.status}</a>                            </div>
                            <div className="mr-48">
                                <button className="px-3 py-2 border-2 border-green-300 text-green-300 rounded-md mr-2 hover:bg-green-300 hover:text-white">Accepter</button>
                                <button className="px-3 py-2 border-2 border-red-300 text-red-300 rounded-md hover:bg-red-300 hover:text-white">Refuser</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <button className="bg-blue-500 text-white w-full text-center py-2 rounded-md font-bold">Voir les ... stages restants</button> */}
            </div>
        </div>
    );
}


export default Demandes;
