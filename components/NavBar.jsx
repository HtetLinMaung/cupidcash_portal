"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { dashboardContext } from "@/providers/DashboardProvider";
import { useContext, useEffect, useRef, useState } from "react";



export default function NavBar() {
  const searchInputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([
    "user",
    "setup",
    "home",
    "payment",
    "report",
  ]);
  const { selectedTable } = useContext(dashboardContext);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // const [showModal, setShowModal] = useState(false);

  const handleSearchModal = () => {
    setShowModal(true);
    my_modal_1.showModal();
  }

  const keyDownSearchModal = (event) => {
    event.preventDefault();
    if ((event.ctrlKey || event.metaKey) && event.key == "k") {
      event.preventDefault();
      setShowModal(true);
      my_modal_1.showModal();
    }
  }

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
    <div
      className="navbar hidden-print"
      style={{
        paddingLeft: "2%",
      }}
    >
      <div className="flex-1">
        <Breadcrumb />
      </div>

      <div className="dropdown dropdown-end">
        {/* <input
          type="input"
          placeholder="Search Ctrl+K"
          className="input bg-gray-100 rounded-full p-4 w-72"
          ref={searchInputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        /> */}

        <input
          type="input"
          placeholder="Search Ctrl+K"
          className="input bg-gray-100 rounded-full p-4 w-72"
          id="modalOne"
          // onClick={handleSearchModal}
          // onKeyDown={keyDownSearchModal}
        />
        {
          showModal && (
              <dialog id="my_modal_1" className="modal">
                  <div className="modal-box p-0 rounded" style={{ maxWidth: "50%"}}>
                    <input 
                      type="text" 
                      placeholder="Type to search..." 
                      class="w-full py-4 px-10 rounded text-lg border-0 transition focus"
                      ref={searchInputRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />

                    {inputValue && filteredSuggestions.length > 0 && (
                        <ul className="suggestion-list h-fit">
                          {filteredSuggestions.map((suggestion, index) => (
                            <li
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              // className={highlightedIndex === index ? "selected" : ""}
                              className="text-lg px-10 py-4 hover:rounded cursor-pointer hover:bg-slate-100"
                              onMouseEnter={() => handleMouseEnter(index)}
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
              </dialog>
          )
        }
      </div>
    </div>
  );
}
