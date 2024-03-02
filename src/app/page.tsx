'use client'
import React from 'react';
import "react-toastify/dist/ReactToastify.css";


export default function Home() {
    return (
      <div className="spinner" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>

<nav className="items-center space-x-4 justify-center" style={{ marginTop: 20, marginBottom: 20 }}>
          {[
            ["Create Apartment", "/addApartment"],
            ["Apartments", "/apartments"],
          ].map(([title, url]) => (
            <a
              key={url}
              href={url}
              className="bg-gray-500 rounded-lg px-3 py-2 text-white-700 font-medium hover:bg-slate-100 hover:text-slate-900"
            >
              {title}
            </a>
          ))}
        </nav>
          
      </div>
  )
}
