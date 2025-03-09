import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure global styles are imported

const CLOUDINARY_CLOUD_NAME = 'demo';
const BASE_TSHIRT_IMAGE = 'shirt-06';
const COLORS = [
  'blue',
  'maroon',
  'lightblue',
  'purple',
  'green',
  'black',
  'white',
  'orange',
  'red',
  'beige',
];

function MonogramTshirtApp() {
  const [name, setName] = useState('John');
  const [number, setNumber] = useState('10');
  const [color, setColor] = useState('blue');
  const [errors, setErrors] = useState({ name: '', number: '' });

  const textColor = ['black', 'maroon'].includes(color) ? 'white' : 'black';

  const validateFields = (newName, newNumber) => {
    const newErrors = {
      name: newName.trim().length > 0 ? '' : 'Name cannot be empty.',
      number: newNumber.trim().length > 0 ? '' : 'Number cannot be empty.',
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.number;
  };

  const handleNameChange = (e) => {
    const newName = e.target.value.slice(0, 35);
    setName(newName);
    validateFields(newName, number);
  };

  const handleNumberChange = (e) => {
    const newNumber = e.target.value;
    setNumber(newNumber);
    validateFields(name, newNumber);
  };

  const tshirtUrl = useMemo(() => {
    if (errors.name || errors.number) return '';
    const recolorEffect =
      color === 'blue' ? '' : `/e_gen_recolor:prompt_shirt;to-color_${color}`;
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/w_500,h_500,c_pad,b_white${recolorEffect}/l_text:Arial_60_bold:${number},co_${textColor}/fl_layer_apply,g_north,y_140/c_fit,h_220,l_text:Arial_40_bold_center:${name},w_180,co_${textColor}/fl_layer_apply,g_north,y_200/${BASE_TSHIRT_IMAGE}`;
  }, [name, number, color, errors]);

  return (
    <div className="main flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Customize Your T-Shirt</h1>
      {tshirtUrl ? (
        <img src={tshirtUrl} alt="Monogrammed T-Shirt" className="w-64 h-64" />
      ) : (
        <p className="text-gray-500">Please enter valid details to generate T-shirt preview.</p>
      )}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-4">
          <label className="font-semibold text-black text-lg">
            Name (Max 35 characters):
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="p-3 border border-gray-400 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          />
        </div>
        {errors.name && <p className="error text-red-500 text-sm">{errors.name}</p>}
        <div className="flex items-center gap-4">
          <label className="font-semibold text-black text-lg">Number:</label>
          <input
            type="number"
            value={number}
            onChange={handleNumberChange}
            className="p-3 border border-gray-400 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          />
        </div>
        {errors.number && <p className="error text-red-500 text-sm">{errors.number}</p>}
        <div className="flex items-center gap-4">
          <label className="font-semibold text-black text-lg">Color:</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="p-3 border border-gray-400 rounded-lg w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          >
            {COLORS.map((col) => (
              <option key={col} value={col}>
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <MonogramTshirtApp />
    </React.StrictMode>
  );
}
