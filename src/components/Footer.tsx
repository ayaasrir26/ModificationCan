import { FaFacebookF, FaInstagram, FaLinkedinIn, FaFutbol,FaGithub  } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

export function Footer() {
  return (
    <footer className="
  bg-gradient-to-r
  from-[#041915]
  via-[#062821]
  to-[#020D0B]
  text-white pt-14 px-6 md:px-20 rounded-t-3xl
">

      <div className="grid gap-10 md:grid-cols-4">

        {/* Logo & About */}
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-extrabold text-green-400">
            <img
                src="/logo-new.png"
                alt="CAN 2025"
                className="h-16 w-auto object-contain drop-shadow-md"
              /> CAN 2025
          </h2>
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
           Platform dedicated to the 2025 Africa Cup of Nations: live results, standings, statistics and official information.
          </p>

       <div className="flex gap-4 mt-5">
  {[
    { icon: FaGithub , link: "https://github.com/ayaasrir26/CanProjet" },
    { icon: FaInstagram,link: "https://www.instagram.com/cangoal25/?utm_source=qr&igsh=MTE1NXA4b3YzZWNjdQ%3D%3D#" },
  ].map(({ icon: Icon, link }, i) => (
    <a
      key={i}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-green-400 transition"
    >
      <Icon className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer" />
    </a>
  ))}
</div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-white">Navigation</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            {["MATCHES", "GROUPS", "TABLEAU", "CHAT"].map(
              (item) => (
                <li
                  key={item}
                  className="hover:text-green-400 cursor-pointer transition"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
  {/* team */}
  
   <div>
          <h3 className="font-semibold text-lg mb-4 text-white">Our Team</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li>AYA ASRIR</li>
            <li>RAWÂA M'CHAÂBAT</li>
            <li>HASSANIA EL-FALAH</li>
          </ul>
        </div>


        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-white">Contact</h3>

          <div className="space-y-3 text-gray-300 text-sm">
            <p className="flex items-center gap-2">
              <MdLocationOn className="text-green-400" />
              Casablanca, Maroc
            </p>
            <p className="flex items-center gap-2">
              <MdPhone className="text-green-400" />
              +212 6 00 00 00 00
            </p>
            <p className="flex items-center gap-2">
              <MdEmail className="text-green-400" />
              cangoal25@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-white/10 pt-6 pb-4 text-center text-xs text-gray-400">
        ©CAN 2025 — All rights reserved
        <span className="mx-2">•</span>
        Developed with ❤️ in Morocco 🇲🇦
      </div>
    </footer>
  );
}
