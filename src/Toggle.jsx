import React, { useState } from 'react'

function Toggle({ forId, title, toggleLog }) {

  const [isChecked, setIsChecked] = useState(false);


  const handleChange = () => {
    setIsChecked(!isChecked);
    if (toggleLog) {
      toggleLog(!isChecked);
    }
  };
  return (
    <>
      <h5>{title}</h5>
      <label htmlFor={forId} className='bg-gray-100 w-20 h-10 cursor-pointer relative rounded-full'>
        <input type="checkbox" id={forId} className='sr-only peer' checked={isChecked} 
          onChange={handleChange}  />
        <span className='w-2/5 h-4/5 bg-rose-300 absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-11 transition-all duration-500'></span>
      </label>
    </>
  );

}

export default Toggle
