import { useState, useEffect } from 'react';

function ItemForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        quantity: initialData.quantity,
        price: initialData.price
      });
    } else {
      setFormData({ name: '', quantity: '', price: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    if (!initialData) {
      setFormData({ name: '', quantity: '', price: '' });
    }
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Item Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter item name"
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="0"
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>
      </div>
      
      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn-submit">
          {initialData ? 'Update Item' : 'Add Item'}
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
