import React from 'react';

import Select from 'react-select';
//import { colourOptions } from './docs/data';

export default function MSelect({label, defaultValue, value, options, onChange, name}){
    return (
        <Select
            defaultValue={defaultValue}
            placeholder={label}
            value={value}
            onChange={onChange}
            isMulti
            name= {name}
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            isClearable
          />
    )
  
  };