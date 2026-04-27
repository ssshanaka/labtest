import { useState, useEffect } from 'react';
import api from './api';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await api.get('/');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSaveItem = async (itemData) => {
    try {
      if (editingItem) {
        await api.put(`/${editingItem._id}`, itemData);
      } else {
        await api.post('/', itemData);
      }
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item');
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/${id}`);
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item');
      }
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Inventory Manager</h1>
        <p>Lab Test Starter Project</p>
      </header>
      
      <main className="app-main">
        <section className="form-section">
          <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
          <ItemForm 
            initialData={editingItem} 
            onSave={handleSaveItem} 
            onCancel={editingItem ? handleCancelEdit : null} 
          />
        </section>

        <section className="list-section">
          <h2>Current Inventory</h2>
          {loading ? (
            <div className="loading">Loading items...</div>
          ) : (
            <ItemList 
              items={items} 
              onEdit={handleEditItem} 
              onDelete={handleDeleteItem} 
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
