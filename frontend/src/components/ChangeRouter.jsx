import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';

const ChangeRouter = () => {
  const brands = ['GL.iNet'];
  const models = ['Mango', 'BerylAX'];
  const { addRouter } = useRouter();

  const [brand, setBrand] = useState(brands[0]);
  const [model, setModel] = useState(models[0]);
  const [ip, setIp] = useState('');

  const handleAdd = () => {
    if (!ip.trim()) return;
    addRouter({
      brand,
      model: model.toLowerCase(),
      ip,
      username: '',
      password: ''
    });
    setIp('');
  };

  return (
    <div className="card mb-3" style={{ maxWidth: '100%', width: '90%' }}>
      <div
        className="card-body"
        style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <strong>Add Router</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label className="fw-bold">Router Brand</label>
          <select
            className="custom-input"
            value={brand}
            onChange={e => setBrand(e.target.value)}
          >
            {brands.map((b, i) => <option key={i} value={b}>{b}</option>)}
          </select>

          <label className="fw-bold">Router Model</label>
          <select
            className="custom-input"
            value={model}
            onChange={e => setModel(e.target.value)}
          >
            {models.map((m, i) => <option key={i} value={m}>{m}</option>)}
          </select>

          <label className="fw-bold">IP Address</label>
          <input
            type="text"
            className="custom-input"
            placeholder="e.g. 192.168.8.1"
            value={ip}
            onChange={e => setIp(e.target.value)}
          />

          <div
            className="button"
            style={{ alignSelf: 'flex-start' }}
            onClick={handleAdd}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeRouter;
