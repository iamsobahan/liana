import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // For the X (Twitter) icon
import Link from 'next/link';

export default function SocialBar() {
  const socials = [
    {
      icon: <FaFacebookF size={10} />,
      bg: '#1877F2',
      url: 'https://facebook.com',
    },
    {
      icon: <FaInstagram size={10} />,
      bg: '#E4405F',
      url: 'https://instagram.com',
    },
    {
      icon: <FaXTwitter size={10} />,
      bg: '#000000',
      url: 'https://twitter.com',
    },
    {
      icon: <FaYoutube size={10} />,
      bg: '#FF0000',
      url: 'https://youtube.com',
    },
    {
      icon: <FaWhatsapp size={10} />,
      bg: '#25D366',
      url: 'https://wa.me/1234567890',
    },
  ];

  return (
    <div className="fixed top-1/3 left-0 z-50 flex flex-col">
      {socials.map((item, i) => (
        <Link
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 text-white"
          style={{ backgroundColor: item.bg }}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
