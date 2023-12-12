"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const searchInputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([
    "user",
    "setup",
    "home",
    "payment",
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleKeyPress = (event) => {
    // Check if Ctrl (or Command on Mac) + K is pressed
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      // Prevent the default browser behavior for this key combination
      event.preventDefault();

      // Focus on the search input
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setInputValue(value);

    // Update filtered suggestions based on the input value
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value)
    );
    setFilteredSuggestions(filtered);
    setSelectedSuggestion(null); // Reset selected suggestion when input value changes
    setHighlightedIndex(filtered.length > 0 ? 0 : -1); // Reset highlighted index when input value changes
  };

  const handleSuggestionClick = (suggestion) => {
    const index = filteredSuggestions.indexOf(suggestion);
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    setSelectedSuggestion(suggestion);
    setHighlightedIndex(index);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Tab" || event.key === "Enter") {
      if (highlightedIndex !== -1) {
        event.preventDefault();
        setInputValue(filteredSuggestions[highlightedIndex]);
        setFilteredSuggestions([]);
        setHighlightedIndex(-1);
      } else if (filteredSuggestions.length > 0) {
        event.preventDefault();
        setInputValue(filteredSuggestions[0]);
        setFilteredSuggestions([]);
        setHighlightedIndex(0);
      }
    } else if (event.key === "ArrowUp" && filteredSuggestions.length > 0) {
      event.preventDefault();
      const newIndex =
        highlightedIndex > 0
          ? highlightedIndex - 1
          : filteredSuggestions.length - 1;
      setHighlightedIndex(newIndex);
    } else if (event.key === "ArrowDown" && filteredSuggestions.length > 0) {
      event.preventDefault();
      const newIndex = (highlightedIndex + 1) % filteredSuggestions.length;
      setHighlightedIndex(newIndex);
    }
  };
  const handleMouseEnter = (index) => {
    setHighlightedIndex(index);
  };

  useEffect(() => {
    // Add event listener for keypress
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Empty dependency array since we are not using any variables from the component scope

  return (
    <div className="navbar hidden-print" style={{ paddingLeft: "2%" }}>
      <div className="flex-1">
        <Breadcrumb />
      </div>

      <div className="dropdown dropdown-end">
        <input
          type="text"
          placeholder="Search Ctrl+K"
          className="input bg-gray-100 rounded-full p-4 w-72"
          ref={searchInputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {inputValue && filteredSuggestions.length > 0 && (
          <ul className="suggestion-list">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={highlightedIndex === index ? "selected" : ""}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
