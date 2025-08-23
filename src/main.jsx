import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { store } from './store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Base tokens
          colorPrimary: '#336C79',
          colorPrimaryBg: '#e6f7ff',
          colorPrimaryBgHover: '#d0e8ed',
          colorPrimaryBorder: '#a3d1dc',
          colorPrimaryBorderHover: '#7ab8c7',
          colorPrimaryHover: '#3D8795',
          colorPrimaryActive: '#336C79',
          colorPrimaryTextHover: '#3D8795',
          colorPrimaryText: '#336C79',
          colorPrimaryTextActive: '#336C79',

          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
          colorInfo: '#336C79',

          colorBgContainer: '#ffffff',
          colorBorder: '#d9d9d9',
          colorText: 'rgba(0, 0, 0, 0.88)',
          colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
          colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
          colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
        },
        components: {
          // Button component
          Button: {
            // colorPrimary: 'linear-gradient(135deg, #4E9DAB, #336C79)',
            // colorPrimaryHover: 'linear-gradient(135deg, #3D8795, #2A5B66)',
            colorPrimaryActive: '#336C79',
            controlHeight: 42,
            borderRadius: 6,
            fontWeight: 500,
          },

          // Input components
          Input: {
            colorPrimary: '#336C79',
            activeBorderColor: '#336C79',
            hoverBorderColor: '#336C79',
            activeShadow: '0 0 0 2px rgba(78, 157, 171, 0.2)',
            borderRadius: 6,
            paddingBlock: 10,
            paddingInline: 10,
          },

          // Select component
          Select: {
            colorPrimary: '#336C79',
            optionSelectedBg: 'rgba(78, 157, 171, 0.08)',
            optionActiveBg: 'rgba(78, 157, 171, 0.16)',
            controlHeight: 44,
          },

          // Checkbox component
          Checkbox: {
            colorPrimary: '#336C79',
          },

          // Radio component
          Radio: {
            colorPrimary: '#336C79',
            dotSize: 10,
          },

          // Switch component
          Switch: {
            colorPrimary: '#336C79',
            handleSize: 16,
          },

          // Slider component
          Slider: {
            colorPrimary: '#336C79',
            colorPrimaryBorder: '#336C79',
            handleSize: 16,
            handleSizeHover: 18,
          },

          // Menu component
          Menu: {
            colorItemBgSelected: 'rgba(78, 157, 171, 0.08)',
            colorItemTextSelected: '#336C79',
            colorItemTextHover: '#3D8795',
            colorActiveBarBorderSize: 0,
            paddingBlock: 10,
            paddingInline: 10,
          },

          // Table component
          Table: {
            headerBg: '#fafafa',
            headerColor: 'rgba(0, 0, 0, 0.88)',
            rowHoverBg: 'rgba(78, 157, 171, 0.04)',
            borderColor: '#f0f0f0',
          },

          // Tabs component
          Tabs: {
            colorPrimary: '#336C79',
            inkBarColor: '#336C79',
            itemSelectedColor: '#336C79',
            itemHoverColor: '#3D8795',
            itemActiveColor: '#336C79',
          },

          // Progress component
          Progress: {
            colorInfo: '#336C79',
          },

          // Tag component
          Tag: {
            colorPrimary: 'rgba(78, 157, 171, 0.1)',
            colorPrimaryBorder: 'rgba(78, 157, 171, 0.3)',
            colorPrimaryHover: 'rgba(78, 157, 171, 0.2)',
          },

          // Notification component
          Notification: {
            colorBgElevated: '#ffffff',
            colorInfo: '#336C79',
            colorInfoBg: 'rgba(78, 157, 171, 0.1)',
            colorInfoBorder: 'rgba(78, 157, 171, 0.2)',
          },

          // Alert component
          Alert: {
            colorInfo: '#336C79',
            colorInfoBorder: 'rgba(78, 157, 171, 0.3)',
            colorInfoBg: 'rgba(78, 157, 171, 0.1)',
          },

          // Badge component
          Badge: {
            colorPrimary: '#336C79',
          },

          // Card component
          Card: {
            colorBorderSecondary: '#f0f0f0',
          },

          // Tooltip component
          Tooltip: {
            colorBgDefault: '#336C79',
          },

          // Dropdown component
          Dropdown: {
            colorPrimary: '#336C79',
            paddingBlock: 10,
            paddingInline: 10,
          },

          // Steps component
          Steps: {
            colorPrimary: '#336C79',
            colorText: 'rgba(0, 0, 0, 0.88)',
          },

          // DatePicker component
          DatePicker: {
            colorPrimary: '#336C79',
            activeBorderColor: '#336C79',
          },

          // Modal component
          Modal: {
            colorPrimary: '#336C79',
          },

          // Drawer component
          Drawer: {
            colorPrimary: '#336C79',
          },

          // Upload component
          Upload: {
            colorPrimary: '#336C79',
          },
        }
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
)