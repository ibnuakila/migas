import React from 'react';

import Select from 'react-select';
//import { colourOptions } from './docs/data';

export default function MSelect({defaultValue, value, options, onChange}){
    return (
        <Select
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            isClearable
          />
    )
  
  };