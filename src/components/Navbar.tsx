import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { SidebarData } from '../Data/SidebarData';
import '../index.css'; 
import { IconContext } from 'react-icons';

const Navbar = () => {
  const [sidebarItemVisible, setsidebarItemVisible] = useState(true);

  const toggleSidebar = () => {
    setsidebarItemVisible(!sidebarItemVisible);
  };

  return (
    <div className='flex'>
      <div className="fixed top-0 left-0 z-40 w-auto h-screen p-4 overflow-y-auto transition-transform bg-white shadow-lg">
        <button className="relative group" onClick={toggleSidebar}>
            <div className="rounded-lg p-1.5 group-hover:dark:hover:bg-gray-600">
                <FaIcons.FaBars
                className="text-gray-400 flex justify-center items-center transition ease-in-out dark:hover:bg-gray-600 dark:group-hover:text-white cursor-pointer"
                />
            </div>
        </button>
        

        <div className="py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
            {SidebarData.map((item, index) => (
              <li key={index} className=''>
                <Link to={item.path} className="flex items-center p-2 text-black rounded-lg hover:bg-gray-600 hover:text-white ">
                    <div className=' text-black transition duration-75'>
                        {item.icon}
                    </div>
                        <span className={`ml-2 ${sidebarItemVisible? ``: `hidden`}`}>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
