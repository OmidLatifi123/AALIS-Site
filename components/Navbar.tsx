"use client";

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function AALISNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dronesDropdownOpen, setDronesDropdownOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/content/Logo.png"
              alt="AALIS Logo"
              className="h-12 w-12 object-contain"
            />
            <div>
              <div className="text-xl font-bold tracking-tight text-white">
                AALIS
              </div>
              <div className="text-xs text-gray-400">
                Autonomous Acoustic Lightweight Intelligent System
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-white hover:text-red-500 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="/case-study"
              className="text-gray-300 hover:text-red-500 transition-colors font-medium"
            >
              Case Study
            </a>

            {/* Drones Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDronesDropdownOpen(true)}
              onMouseLeave={() => setDronesDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-300 hover:text-red-500 transition-colors font-medium py-2">
                <span>Drones</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {dronesDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 w-48">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <a
                      href="/Shahed"
                      className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      Shahed
                    </a>
                    <a
                      href="/USNT-Hawk"
                      className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      USN T-Hawk
                    </a>
                    <a
                      href="/RQ-170"
                      className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      RQ-170
                    </a>
                    <a
                      href="/MQ-9"
                      className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      MQ-9
                    </a>
                  </div>
                </div>
              )}
            </div>

                        <a
              href="/map"
              className="text-gray-300 hover:text-red-500 transition-colors font-medium"
            >
              Map
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-red-500 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <a
              href="/"
              className="block text-white hover:text-red-500 transition-colors font-medium py-2"
            >
              Home
            </a>
            <a
              href="/case-study"
              className="block text-gray-300 hover:text-red-500 transition-colors font-medium py-2"
            >
              Case Study
            </a>
            <div>
              <div className="text-gray-300 font-medium mb-2 py-2">Drones</div>
              <div className="pl-4 space-y-2">
                <a
                  href="/Shahed"
                  className="block text-gray-400 hover:text-red-500 transition-colors py-2"
                >
                  Shahed
                </a>
                <a
                  href="/USNT-Hawk"
                  className="block text-gray-400 hover:text-red-500 transition-colors py-2"
                >
                  USN T-Hawk
                </a>
                <a
                  href="/RQ-170"
                  className="block text-gray-400 hover:text-red-500 transition-colors py-2"
                >
                  RQ-170
                </a>
                <a
                  href="/MQ-9"
                  className="block text-gray-400 hover:text-red-500 transition-colors py-2"
                >
                  MQ-9
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
