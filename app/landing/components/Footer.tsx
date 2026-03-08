import Link from "next/link";
import { Send, Instagram } from "lucide-react";
import Reddit from "@/app/icons/Reddit";
import X from "@/app/icons/X";
import { link } from "fs";
const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Demo", href: "#demo" },
      { name: "Who is it for?", href: "#build-for-everyone" },
      { name: "testimonials", href: "#testimonials" },
    ],

    Legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      {
        name: "Terms of Service",
        href: "/terms-and-conditions",
      },
    ],
  };

  const SOCIAL_LINKS = [
    {
      icon: <Instagram className="w-5 h-5" />,
      link: "https://www.instagram.com/justdmhub/",
    },
    {
      icon: (
        <div className="w-5 h-5 text-white">
          <X />
        </div>
      ),
      link: "https://x.com/shyamsharm8511",
    },
    {
      icon: (
        <div className="w-5 h-5">
          <Reddit />
        </div>
      ),
      link: "https://www.reddit.com/user/Broad_Loan2883/",
    },
  ];
  return (
    <footer className="relative border-t border-[#23232E] bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Send className="w-5 h-5 text-[#6C5CE7]" />
              <span className="text-xl font-bold text-white">
                Just
                <span className="bg-gradient-to-r from-[#6C5CE7] to-[#FF4D8D] bg-clip-text text-transparent">
                  DM
                </span>
              </span>
            </Link>
            <p className="text-[#A1A1AA] mb-6 max-w-sm">
              Save Instagram reels via DM, organize them with tags, and find
              them instantly. Built for creators.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((social, index) => (
                <a
                  href={social.link}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[#16161F] border border-[#23232E] flex items-center justify-center text-[#A1A1AA] hover:text-white hover:border-[#6C5CE7]/50 transition-colors"
                  aria-label="Instagram"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#A1A1AA] hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#23232E] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#A1A1AA] text-sm">
            © {new Date().getFullYear()} JustDM. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-[#A1A1AA]">
            <Link
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
