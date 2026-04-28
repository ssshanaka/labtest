import { Edit2, Trash2 } from "lucide-react";

function ItemList({ items, onEdit, onDelete }) {
  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <p>No items found in inventory.</p>
        <p className="subtitle">Add a new item to get started.</p>
      </div>
    );
  }

  return (
    <div className="items-grid">
      {items.map((item) => (
        <div key={item._id} className="item-card">
          <div className="item-header">
            <h3>{item.name}</h3>
            <div className="item-actions">
              <button
                className="icon-btn edit"
                onClick={() => onEdit(item)}
                aria-label="Edit item"
              >
                <Edit2 size={16} />
              </button>
              <button
                className="icon-btn delete"
                onClick={() => onDelete(item._id)}
                aria-label="Delete item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className="item-details">
            <div className="detail">
              <span className="label">Quantity</span>
              <span className="value">{item.quantity}</span>
            </div>
            <div className="detail">
              <span className="label">Price</span>
              <span className="value">${Number(item.price).toFixed(2)}</span>
            </div>
            <div className="detail">
              <span className="label">Category</span>
              <span className="value">{item.category}</span>
            </div>
            <div className="detail">
              <span className="label">Status</span>
              <span className="value">{item.status}</span>
            </div>
            <div className="detail highlight">
              <span className="label">Total Value</span>
              <span className="value">
                ${(item.quantity * item.price).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
