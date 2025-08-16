import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Radio, Space } from 'antd';
import { useState } from 'react';

// Main Dropdown component
export default function CustomFilterDropdown({
  options = [],
  defaultValue = null,
  onChange,
  width = '100%',
  borderRadius = '8px',
  placeholder = 'Select an option',
  // New props for handling different data structures
  labelKey = 'label', // key to display (e.g., 'institutionName')
  valueKey = 'value', // key to return (e.g., '_id')
  showAllOption = false, // whether to show "All" option at top
  allOptionLabel = 'All',
  allOptionValue = 'all'
}) {





  // Transform options to standard format if needed
  const transformedOptions = options?.map(option => {
    // If option is already in correct format, use it
    if (option.label && option.value) {
      return option;
    }
    // Otherwise transform it
    return {
      label: option[labelKey] || option.label || 'Unknown',
      value: option[valueKey] || option.value || option._id,
      originalData: option // Keep original data for reference
    };
  }) || [];

  // Add "All" option if requested
  const finalOptions = showAllOption
    ? [{ label: allOptionLabel, value: allOptionValue }, ...transformedOptions]
    : transformedOptions;

  const [selectedOption, setSelectedOption] = useState(() => {
    if (defaultValue) {
      return finalOptions.find(opt => opt.value === defaultValue) || null;
    }
    return showAllOption ? finalOptions[0] : null;
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Colors configuration
  const colors = {
    border: '#d9e1e6',
    text: '#000000',
    background: '#ffffff',
    selectedBackground: '#f0f7fa',
    selectedDot: '#3ca9c0',
    hoverBackground: '#f5f5f5'
  };

  // Handle option selection
  const handleSelect = ({ key }) => {
    const option = finalOptions.find(opt => opt.value === key);
    setSelectedOption(option);
    setDropdownVisible(false);
    if (onChange) {
      onChange(option, option.originalData || option);
    }
  };

  // Create menu items
  const menu = (
    <Menu
      onClick={handleSelect}
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius,
        maxHeight: '300px',
        overflowY: 'auto',
        padding: '4px 0',
      }}
    >
      {finalOptions.map((option) => (
        <Menu.Item
          className='flex justify-between items-center'
          key={option.value}
          style={{
            padding: '8px 16px',
            margin: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: selectedOption?.value === option.value ? colors.selectedBackground : colors.background,
            color: colors.text,
          }}
        >
          <div className='flex items-center justify-between w-full'>
            <Space>
              {option.icon && option.icon}
              {option.label}
            </Space>
            <Radio
              checked={selectedOption?.value === option.value}
              style={{ marginLeft: '16px' }}
            />
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      visible={dropdownVisible}
      onVisibleChange={(visible) => setDropdownVisible(visible)}
      style={{ width }}
    >
      <button
        className="flex items-center justify-between px-4 py-2 text-left border rounded-md focus:outline-none"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.background,
          color: colors.text,
          borderRadius,
          width: '100%'
        }}
      >
        <div className="flex items-center">
          {selectedOption?.icon && (
            <span className="mr-2">{selectedOption.icon}</span>
          )}
          <div className='flex items-center gap-3'>
            <img src="/icons/dropdown.png" className='w-5 h-5' alt="" />
            <h3>{selectedOption?.label || placeholder}</h3>
          </div>
        </div>

        <DownOutlined
          style={{
            color: '#f5a623',
            transition: 'transform 0.3s',
            transform: dropdownVisible ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </button>
    </Dropdown>
  );
}