import React, { useState } from "react";
import axios from "axios";
import { countries } from "../lib/countries"; // Array of { flag, language, lang }
import { useChatStore } from "../store/useChatStore.js";

export default function LanguageSelector() {
  const { selectedUser } = useChatStore(); // Reciever
  const [isOpen, setIsOpen] = useState(false);

  const defaultLang = countries.find((c) => c.flag === "us") || countries[0];
  const [currLang, setCurrLang] = useState(defaultLang);

  const handleSelect = async (langObj) => {
    setCurrLang(langObj);
    setIsOpen(false);
    try {
      await axios.put("http://localhost:5001/api/chat-preferences", {
        partnerId: selectedUser._id,
        preferredLanguage: langObj.isoCode,
      },{
        withCredentials: true,
      });

      console.log("Language preference updated!");
    } catch (error) {
      console.error("Failed to update language", error);
    }
  };

  return (
    <div className="relative w-full max-w-sm pt-2">
      <label className="block mb-2 font-medium">Preferred Chat Language</label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border rounded flex items-center justify-between bg-base-100"
      >
        <div className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/16x12/${currLang.flag}.png`}
            alt={currLang.language}
            className="w-5 h-4 object-cover rounded-sm"
          />
          <span>{currLang.language}</span>
        </div>
        <span>▾</span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto">
          {countries.map((lang, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => handleSelect(lang)}
            >
              <img
                src={`https://flagcdn.com/16x12/${lang.flag}.png`}
                alt={lang.language}
                className="w-5 h-4 object-cover rounded-sm"
              />
              <span>{lang.language}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
