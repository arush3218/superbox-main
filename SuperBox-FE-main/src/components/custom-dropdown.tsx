"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  label,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative">
      {label && (
        <label className="block text-sm font-medium text-white mb-2">
          {label}{" "}
          {required && <span className="text-[var(--brand-red)]">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 bg-white/5 border rounded-xl text-sm text-left transition-all duration-200 flex items-center justify-between ${
          isOpen
            ? "border-[var(--brand-red)]/50 bg-white/[0.07]"
            : "border-white/10 hover:border-white/20"
        }`}
      >
        <span className={value ? "text-white" : "text-gray-500"}>
          {selectedOption ? (
            <>
              {selectedOption.icon && (
                <span className="mr-2">{selectedOption.icon}</span>
              )}
              {selectedOption.label}
            </>
          ) : (
            placeholder
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--brand-red)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-black/95 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-sm text-left transition-all duration-150 flex items-center justify-between group ${
                    value === option.value
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center">
                    {option.icon && <span className="mr-2">{option.icon}</span>}
                    {option.label}
                  </span>
                  {value === option.value && (
                    <Check className="w-4 h-4 text-[var(--brand-red)]" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
