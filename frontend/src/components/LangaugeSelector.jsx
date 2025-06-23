import React, { useState } from "react";
import axios from "axios";
import { countries } from "../lib/countries"; // Array of { flag, language, lang }
import { useChatStore } from "../store/useChatStore.js";

export default function LanguageSelector() {
  const { selectedUser , chatPreferences , selectedLanguage } = useChatStore(); // Reciever
  const [isOpen, setIsOpen] = useState(false);

  const defaultLang = countries.find((c) => c.flag === "us") || countries[0];
  const [currLang, setCurrLang] = useState(defaultLang);

  const handleSelect = async (langObj) => {
    setCurrLang(langObj);
    setIsOpen(false);
    try {
      chatPreferences(selectedUser._id , langObj.language , langObj.flag , langObj.isoCode)
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
          {selectedLanguage ? 
          <img
            src={`https://flagcdn.com/16x12/${selectedLanguage.flag}.png`}
            alt={selectedLanguage.language}
            className="w-5 h-4 object-cover rounded-sm"
          />: ""}
          <span>{selectedLanguage ? selectedLanguage.language:"Select Language"}</span>
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
