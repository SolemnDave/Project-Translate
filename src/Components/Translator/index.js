import React, { useState } from "react";
import "./index.scss";
//import speechImage from "../../221739.png"; // Import your icon image

function Translator() {
  const headerText = "Language Translator";

  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState(""); // State to handle error message
  const [selectedSourceLanguage, setSelectedSourceLanguage] =
    useState("English");
  const [selectedTargetLanguage, setSelectedTargetLanguage] =
    useState("Spanish");

  const API_GATEWAY_URL = process.env.REACT_APP_API_GATEWAY_URL;

  // "https://rfacy77hf0.execute-api.us-east-1.amazonaws.com/prod/translate"

  const handleInput = (event) => {
    const text = event.currentTarget.textContent; // Get the text from the contentEditable div
    setInputText(text); // Update the state
    console.log("Input Text:", text); // Log the captured input
  };

  const handleSourceLanguageChange = (event) => {
    setSelectedSourceLanguage(event.target.value);
  };

  const handleTargetLanguageChange = (event) => {
    setSelectedTargetLanguage(event.target.value);
  };

  const handleTranslate = async () => {
    setError(""); // Clear previous errors
    console.log("Translating:", inputText);
    try {
      console.log(
        "Sending request with:",
        inputText,
        selectedSourceLanguage,
        selectedTargetLanguage
      );
      const response = await fetch(API_GATEWAY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          sourceLanguage: selectedSourceLanguage,
          targetLanguage: selectedTargetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Translation response:", data); // Inspect the full response
      setTranslatedText(data.translatedText); // Make sure the property matches the API's response
    } catch (error) {
      console.error("There was a problem with the translation request:", error);
      setError(`Translation error: ${error.message || "Unknown error"}`); // Display the actual error message
    }
  };

  return (
    <div className="translation-page">
      <h1 className="page-header">
        {headerText.split("").map((char, index) =>
          char === " " ? (
            <span key={index} className="letter space">
              &nbsp;
            </span>
          ) : (
            <span key={index} className={`letter letter-${index}`}>
              {char}
            </span>
          )
        )}
      </h1>
      <div className="translation-wrapper">
        <div className="translator-selector-wrapper">
          <select
            className="translator-selector"
            value={selectedSourceLanguage}
            onChange={handleSourceLanguageChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Afrikaans">Afrikaans</option>
            <option value="Albanian">Albanian</option>
            <option value="Amharic">Amharic</option>
            <option value="Arabic">Arabic</option>
            <option value="Armenian">Armenian</option>
            <option value="Azerbaijani">Azerbaijani</option>
            <option value="Azerbaijani">Azerbaijani</option>
            <option value="Bengali">Bengali</option>
            <option value="Bulgarian">Bulgarian</option>
            <option value="Catalan">Catalan</option>
            <option value="Chinese">Chinese</option>
            <option value="Chinese Traditional">Chinese Traditional</option>
            <option value="Croation">Croation</option>
            <option value="Czesh">Czesh</option>
            <option value="Danish">Danish</option>
            <option value="Dari">Dari</option>
            <option value="Dutch">Dutch</option>
            <option value="Estonian">Estonian</option>
            <option value="Finnish">Finnish</option>
            <option value="French">French</option>
            <option value="Georgian">Georgian</option>
            <option value="German">German</option>
            <option value="Greek">Greek</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Haitian Creole">Haitian Creole</option>
            <option value="Hausa">Hausa</option>
            <option value="Hebrew">Hebrew</option>
            <option value="Hindi">Hindi</option>
            <option value="Hungarian">Hungarian</option>
            <option value="Icelandic">Icelandic</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Irish">Irish</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Kannada">Kannada</option>
            <option value="Kazakh">Kazakh</option>
            <option value="Korean">Korean</option>
            <option value="Latvian">Latvian</option>
            <option value="Lithuanian">Lithuanian</option>
            <option value="Macedonian">Macedonian</option>
            <option value="Malay">Malay</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Maltese">Maltese</option>
            <option value="Marathi">Marathi</option>
            <option value="Mandarin">Mandarin</option>
            <option value="Mexican Spanish">Mexican Spanish</option>
            <option value="Mongolian">Mongolian</option>
            <option value="Norwegian">Norwegian</option>
            <option value="Pashto">Pashto</option>
            <option value="Persian">Persian</option>
            <option value="Polish">Polish</option>
            <option value="Portugal Portuguese">Portugal Portuguese</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Romanian"></option>
            <option value="Russian">Russian</option>
            <option value="Serbian">Serbian</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Slovak">Slovak</option>
            <option value="Slovenian">Slovenian</option>
            <option value="Somali">Somali</option>
            <option value="Swahili">Swahili</option>
            <option value="Swedish">Swedish</option>
            <option value="Tagalog">Tagalog</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Thai">Thai</option>
            <option value="Turkish">Turkish</option>
            <option value="Ukrainian">Ukrainian</option>
            <option value="Urdu">Urdu</option>
            <option value="Uzbek">Uzbek</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Welsh">Welsh</option>

            {/* Add more source language options here */}
          </select>
        </div>

        <div
          className="translator-container"
          contentEditable
          onInput={handleInput}
          suppressContentEditableWarning={true}
          data-placeholder="Enter text to translate..."
        >
          {/* User will input text here */}
        </div>
        <div className="translation-container">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            translatedText
          )}
        </div>

        <div className="translation-selector-wrapper">
          <select
            className="translation-selector"
            value={selectedTargetLanguage}
            onChange={handleTargetLanguageChange}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Afrikaans">Afrikaans</option>
            <option value="Albanian">Albanian</option>
            <option value="Amharic">Amharic</option>
            <option value="Arabic">Arabic</option>
            <option value="Armenian">Armenian</option>
            <option value="Azerbaijani">Azerbaijani</option>
            <option value="Bengali">Bengali</option>
            <option value="Bulgarian">Bulgarian</option>
            <option value="Catalan">Catalan</option>
            <option value="Chinese">Chinese</option>
            <option value="Chinese Traditional">Chinese Traditional</option>
            <option value="Croation">Croation</option>
            <option value="Czesh">Czesh</option>
            <option value="Danish">Danish</option>
            <option value="Dari">Dari</option>
            <option value="Dutch">Dutch</option>
            <option value="Estonian">Estonian</option>
            <option value="Finnish">Finnish</option>
            <option value="French">French</option>
            <option value="Georgian">Georgian</option>
            <option value="German">German</option>
            <option value="Greek">Greek</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Haitian Creole">Haitian Creole</option>
            <option value="Hausa">Hausa</option>
            <option value="Hebrew">Hebrew</option>
            <option value="Hindi">Hindi</option>
            <option value="Hungarian">Hungarian</option>
            <option value="Icelandic">Icelandic</option>
            <option value="Indonesian">Indonesian</option>
            <option value="Irish">Irish</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Kannada">Kannada</option>
            <option value="Kazakh">Kazakh</option>
            <option value="Korean">Korean</option>
            <option value="Latvian">Latvian</option>
            <option value="Lithuanian">Lithuanian</option>
            <option value="Macedonian">Macedonian</option>
            <option value="Malay">Malay</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Maltese">Maltese</option>
            <option value="Mandarin">Mandarin</option>
            <option value="Marathi">Marathi</option>
            <option value="Mexican Spanish">Mexican Spanish</option>
            <option value="Mongolian">Mongolian</option>
            <option value="Norwegian">Norwegian</option>
            <option value="Pashto">Pashto</option>
            <option value="Persian">Persian</option>
            <option value="Polish">Polish</option>
            <option value="Portugal Portuguese">Portugal Portuguese</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Romanian">Romanian</option>
            <option value="Russian">Russian</option>
            <option value="Serbian">Serbian</option>
            <option value="Sinhala">Sinhala</option>
            <option value="Slovak">Slovak</option>
            <option value="Slovenian">Slovenian</option>
            <option value="Somali">Somali</option>
            <option value="Swahili">Swahili</option>
            <option value="Swedish">Swedish</option>
            <option value="Tagalog">Tagalog</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Thai">Thai</option>
            <option value="Turkish">Turkish</option>
            <option value="Ukrainian">Ukrainian</option>
            <option value="Urdu">Urdu</option>
            <option value="Uzbek">Uzbek</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Welsh">Welsh</option>

            {/* Add more target language options here */}
          </select>
        </div>
      </div>
      <button className="translate-button" onClick={handleTranslate}>
        Translate
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Translator;
