import React from 'react';

import Select from 'react-select';

//import { colourOptions } from './docs/data';

export default function SSelect({ label, defaultValue, value, options, onChange, name }) {
  return (
    <Select
        placeholder = {label}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}            
        name={name}
        options={options}
        className="basic-search-select"
        classNamePrefix="select"
        isClearable
      />
    
  );

};