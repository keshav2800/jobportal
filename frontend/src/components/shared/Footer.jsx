import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t-2 border-[#108a00] bg-white py-10 mt-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-2xl font-extrabold text-[#108a00]">Job Work</h2>
          <p className="text-sm text-gray-600">All rights reserved.</p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#108a00] hover:text-[#14a800] transition-colors"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-[#108a00] hover:text-[#14a800] transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#108a00] hover:text-[#14a800] transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
