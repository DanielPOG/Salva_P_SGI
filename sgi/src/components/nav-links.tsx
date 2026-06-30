'use client'

import Link from 'next/link';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

import { usePathname } from 'next/dist/client/components/navigation';
const links = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Sedes', href: '/sedes', icon: DocumentDuplicateIcon },
  { name: 'Compañias', href: '/companies', icon: UserGroupIcon },
  { name: 'Dispositivos', href: '/devices', icon: PhoneIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className=
            {   ` flex h-12 grow items-center justify-center gap-2 rounded-md 
                bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none 
                md:justify-start md:p-2 md:px-3  border-b-2 border-pink-300
                ${pathname === link.href ? 'bg-sky-300': ''}
                `}
          
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
            
          </Link>
        );   
      })}
    </>
  );
}