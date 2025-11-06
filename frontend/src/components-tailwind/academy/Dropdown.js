import React, { useEffect, useState } from 'react';

function Dropdown({ label, endpoint, valueKey = 'id', labelKey = 'name', value, onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch(endpoint);
        if (!res.ok) {throw new Error(`Error ${res.status}`);}
        const data = await res.json();
        setOptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions().then(r => {});
  }, [endpoint]);

  if (loading) return <p>Loading {label}...</p>;
  if (error) return <p>Error loading {label}: {error}</p>;

  return (
    <div style={{ margin: '10px 0' }}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select {label}</option>
        {options.map(opt => (
          <option key={opt[valueKey]} value={opt[valueKey]}>
            {opt[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
