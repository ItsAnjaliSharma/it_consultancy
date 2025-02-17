import { useEffect, useState } from "react";
import axios from "axios";

const fetchGoogleSheetData = async () => {
  const url = `https://script.google.com/macros/s/AKfycbyi4e3OrMBFkFulfP9zkv3BkKlQHaG9In4VQdR_i9lKZRPCOlyOTiDOpRdnQdU1nmHE/exec`;

  try {
    const response = await axios.get(url);
    return response.data.values || [];
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return [];
  }
};

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchGoogleSheetData().then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 text-white text-center p-5 text-xl font-bold">
        IT Consulting Firm
      </header>
      
      <section className="p-5">
        <h2 className="text-2xl font-semibold">About Us</h2>
        <p className="mt-2">{data.length > 1 ? data[1][1] : "Loading..."}</p>
      </section>

      <section className="p-5">
        <h2 className="text-2xl font-semibold">Services</h2>
        <ul className="mt-2 list-disc list-inside">
          {data.length > 2 &&
            data.slice(2).map((row, index) => <li key={index}>{row[1]}</li>)}
        </ul>
      </section>

      <footer className="bg-gray-800 text-white text-center p-5 mt-5">
        Contact Us: contact@itfirm.com
      </footer>
    </div>
  );
}
