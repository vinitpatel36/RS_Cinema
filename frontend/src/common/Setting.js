import { useEffect, useState } from 'react'
import userService from '../services/userService';

export default function Setting() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const preferTheme = userService.getUserPreferTheme();
    if (preferTheme == "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark')
    }
  }, []);

  const handleThemeChanged = (event) => {
    console.log("handleThemeChanged mode : ", isDarkMode);
    const { checked } = event.target;
    if (checked) {
      console.log("changed id add dark");
      document.documentElement.classList.add('dark');
      userService.saveUserPreferTheme("dark");
    }
    else {
      console.log("changed id remove dark");
      document.documentElement.classList.remove('dark')
      userService.saveUserPreferTheme("");
    }
    setIsDarkMode(!isDarkMode);

  }

  return (
    <div className='flex justify-center'>
      <label className="relative inline-flex items-center m-4 cursor-pointer">
        <input type="checkbox" onChange={handleThemeChanged} className="sr-only peer" checked={isDarkMode} />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark mode</span>
      </label>
    </div>
  );
}
