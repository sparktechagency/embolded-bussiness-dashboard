import React, { useState } from 'react';
import { Dropdown, Radio, Button } from 'antd';
import PropTypes from 'prop-types';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const StatusFilter = ({ 
  options = [
    { value: 'Active', color: '#E8505B' },
    { value: 'Block', color: '#E8505B' }
  ], 
  placeholder = 'Status Filter',
  status,
  style = {} 
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleOptionChange = (e) => {
    const newValue = e.target.value;
    setSelectedOption(newValue);
    setDropdownVisible(false);
  };

  const dropdownRender = () => (
    <div 
      className={`
        p-3 w-auto bg-white rounded-lg shadow-lg 
        ${options.length > 4 ? 'max-h-[250px] overflow-y-auto' : ''}
      `}
    >
      <Radio.Group 
        value={selectedOption} 
        onChange={handleOptionChange}
        className="w-full"
      >
        {options.map((option) => (
          <Radio 
            key={option.value} 
            value={option.value}
            className={`
              flex items-start gap-1 mb-2
              ${selectedOption === option.value 
                ? `text-[${option.color}]` 
                : 'text-black/85'}
              hover:bg-transparent hover:text-inherit
            `}
          >
            {option.value}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  );

  // Determine button text and color
  const buttonText = selectedOption || placeholder;
  const buttonColor = selectedOption 
    ? (options.find(option => option.value === selectedOption)?.color || '#E8505B')
    : '#E8505B';

  return (
    <Dropdown 
      dropdownRender={dropdownRender}
      trigger={['click']}
      placement="bottomRight"
      open={dropdownVisible}
      onOpenChange={(visible) => setDropdownVisible(visible)}
    >
      <Button 
        className="text-white flex items-center justify-between gap-3 text-[15px] py-5 hover:opacity-100 hover:text-white"
        style={{ 
          backgroundColor: buttonColor,
          minWidth: '120px',
          maxWidth: '100%',
          width: 'auto',
          paddingLeft: '12px',
          paddingRight: '12px',
          ...style
        }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {status && <img 
            src="/icons/filter.png" 
            alt="Filter" 
            className="w-4 h-4 flex-shrink-0" 
          />}
          <span className="truncate">{buttonText}</span>
        </div>
        {dropdownVisible ? (
          <UpOutlined className="text-xs transition-transform flex-shrink-0" />
        ) : (
          <DownOutlined className="text-xs transition-transform flex-shrink-0" />
        )}
      </Button>
    </Dropdown>
  );
};

StatusFilter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      color: PropTypes.string
    })
  ),
  placeholder: PropTypes.string,
  style: PropTypes.object
};

export default StatusFilter;