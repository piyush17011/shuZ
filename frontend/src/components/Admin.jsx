import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import { AuthContext } from '../auth/AuthContext';
import '../styles/Admin.css';

const API = process.env.REACT_APP_API_URL;
const CATEGORIES = ['men', 'women', 'kids'];

const emptyProduct = { title: '', imageURL: '', price: '', category: 'men', ts: false, details: '' };

export default function Admin() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') navigate('/');
  }, [user, navigate]);

  const [tab, setTab] = useState('products');

  const token =
    localStorage.getItem('token') ||
    user?.token ||
    (() => { try { return JSON.parse(localStorage.getItem('user'))?.token; } catch { return null; } })();

  // PRODUCTS
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productModal, setProductModal] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  const fetchProducts = useCallback(async () => {
    try { const { data } = await axios.get(`${API}/api/products/get`); setProducts(data); } catch {}
  }, []);
  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const openAddProduct = () => { setProductForm(emptyProduct); setEditingProduct(null); setProductModal(true); };
  const openEditProduct = (p) => {
    setProductForm({ title: p.title, imageURL: p.imageURL, price: p.price, category: p.category, ts: p.ts || false, details: p.details });
    setEditingProduct(p._id);
    setProductModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`${API}/api/products/update/${editingProduct}`, productForm, { headers: { Authorization: `Bearer ${token}` } });
      } else {
        await axios.post(`${API}/api/products/add`, productForm, { headers: { Authorization: `Bearer ${token}` } });
      }
      setProductModal(false);
      fetchProducts();
    } catch (err) {
      console.error('Save failed:', err.response?.status, err.response?.data);
      alert(err.response?.data?.message || `Failed to save product (status: ${err.response?.status})`);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`${API}/api/products/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete');
    }
  };

  const filteredProducts = products.filter(p =>
    p.title?.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category?.toLowerCase().includes(productSearch.toLowerCase())
  );

  // USERS
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [roleLoading, setRoleLoading] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}/api/users/allUser`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(data.users || []);
    } catch {}
  }, [token]);
  useEffect(() => { if (tab === 'users') fetchUsers(); }, [tab, fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    setRoleLoading(userId);
    try {
      await axios.patch(`${API}/api/users/role`, { userId, role: newRole }, { headers: { Authorization: `Bearer ${token}` } });
      fetchUsers();
    } catch (err) { alert(err.response?.data?.message || 'Failed to update role'); }
    finally { setRoleLoading(null); }
  };

  const filteredUsers = users.filter(u =>
    u.username?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  // ORDERS
  const [orders, setOrders] = useState([]);
  const [orderSearch, setOrderSearch] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    try { const { data } = await axios.get(`${API}/api/orders/allorder`); setOrders(data); } catch {}
  }, []);
  useEffect(() => { if (tab === 'orders') fetchOrders(); }, [tab, fetchOrders]);

  const filteredOrders = orders.filter(o => {
    const name = o.userId?.[0]?.username || o.userId?.username || '';
    const email = o.userId?.[0]?.email || o.userId?.email || '';
    return name.toLowerCase().includes(orderSearch.toLowerCase()) ||
      email.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o._id?.toLowerCase().includes(orderSearch.toLowerCase());
  });

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="adm-root">
      <NavBar />
      <div className="adm-wrap">

        <div className="adm-header">
          <div>
            <p className="adm-label">dashboard</p>
            <h1 className="adm-title">admin panel</h1>
          </div>
          <div className="adm-stats-row">
            <div className="adm-stat"><span className="adm-stat-num">{products.length}</span><span className="adm-stat-lbl">products</span></div>
            <div className="adm-stat"><span className="adm-stat-num">{users.length || '—'}</span><span className="adm-stat-lbl">users</span></div>
            <div className="adm-stat"><span className="adm-stat-num">{orders.length || '—'}</span><span className="adm-stat-lbl">orders</span></div>
          </div>
        </div>

        <div className="adm-tabs">
          {['products', 'users', 'orders'].map(t => (
            <button key={t} className={`adm-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        {tab === 'products' && (
          <div className="adm-section">
            <div className="adm-section-top">
              <input className="adm-search" placeholder="search products…" value={productSearch} onChange={e => setProductSearch(e.target.value)} />
              <button className="adm-btn-primary" onClick={openAddProduct}>+ add product</button>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>image</th>
                    <th>title</th>
                    <th>category</th>
                    <th>top selling</th>
                    <th>price</th>
                    <th>actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p._id}>
                      <td><img src={p.imageURL} alt={p.title} className="adm-product-thumb" /></td>
                      <td><span className="adm-product-title">{p.title}</span></td>
                      <td><span className="adm-badge">{p.category}</span></td>
                      <td>
                        {p.ts
                          ? <span className="adm-badge admin">✓ ts</span>
                          : <span className="adm-muted" style={{ fontSize: '0.75rem' }}>—</span>}
                      </td>
                      <td>₹{p.price}</td>
                      <td>
                        <div className="adm-action-row">
                          <button className="adm-btn-sm" onClick={() => openEditProduct(p)}>edit</button>
                          <button className="adm-btn-sm danger" onClick={() => handleDeleteProduct(p._id)}>delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr><td colSpan={6} className="adm-empty">no products found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'users' && (
          <div className="adm-section">
            <div className="adm-section-top">
              <input className="adm-search" placeholder="search users…" value={userSearch} onChange={e => setUserSearch(e.target.value)} />
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr><th>username</th><th>email</th><th>role</th><th>joined</th><th>change role</th></tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => (
                    <tr key={u._id}>
                      <td><span className="adm-product-title">{u.username}</span></td>
                      <td className="adm-muted">{u.email}</td>
                      <td><span className={`adm-badge ${u.role === 'admin' ? 'admin' : ''}`}>{u.role}</span></td>
                      <td className="adm-muted">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>
                        {u._id === user._id ? (
                          <span className="adm-muted" style={{ fontSize: '0.75rem' }}>you</span>
                        ) : (
                          <div className="adm-action-row">
                            <button
                              className={`adm-btn-sm ${u.role === 'admin' ? 'danger' : ''}`}
                              disabled={roleLoading === u._id}
                              onClick={() => handleRoleChange(u._id, u.role === 'admin' ? 'user' : 'admin')}
                            >
                              {roleLoading === u._id ? '…' : u.role === 'admin' ? 'demote' : 'make admin'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr><td colSpan={5} className="adm-empty">no users found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="adm-section">
            <div className="adm-section-top">
              <input className="adm-search" placeholder="search by user or order id…" value={orderSearch} onChange={e => setOrderSearch(e.target.value)} />
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr><th>order id</th><th>user</th><th>amount</th><th>date</th><th>items</th></tr>
                </thead>
                <tbody>
                  {filteredOrders.map(o => {
                    const u = Array.isArray(o.userId) ? o.userId[0] : o.userId;
                    const isOpen = expandedOrder === o._id;
                    return (
                      <React.Fragment key={o._id}>
                        <tr>
                          <td className="adm-muted" style={{ fontSize: '0.72rem', fontFamily: 'monospace' }}>{o._id?.slice(-8)}</td>
                          <td>
                            <div><span className="adm-product-title">{u?.username || 'unknown'}</span></div>
                            <div className="adm-muted" style={{ fontSize: '0.75rem' }}>{u?.email || ''}</div>
                          </td>
                          <td>₹{o.amount}</td>
                          <td className="adm-muted">{new Date(o.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button className="adm-btn-sm" onClick={() => setExpandedOrder(isOpen ? null : o._id)}>
                              {isOpen ? 'hide' : `${o.orderItems?.length || 0} items`}
                            </button>
                          </td>
                        </tr>
                        {isOpen && (
                          <tr className="adm-expanded-row">
                            <td colSpan={5}>
                              <div className="adm-order-items">
                                {o.orderItems?.map((item, i) => (
                                  <div key={i} className="adm-order-item">
                                    {item.product?.imageURL && (
                                      <img
                                        src={item.product.imageURL}
                                        alt={item.product?.title || ''}
                                        className="adm-product-thumb"
                                        style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', flexShrink: 0 }}
                                      />
                                    )}
                                    <span className="adm-product-title">{item.product?.title || item.product}</span>
                                    <span className="adm-badge">×{item.quantity}</span>
                                    {item.product?.price && <span className="adm-muted">₹{item.product.price}</span>}
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {filteredOrders.length === 0 && (
                    <tr><td colSpan={5} className="adm-empty">no orders found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {productModal && (
        <div className="adm-modal-overlay" onClick={() => setProductModal(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h2 className="adm-modal-title">{editingProduct ? 'edit product' : 'add product'}</h2>
              <button className="adm-modal-close" onClick={() => setProductModal(false)}>✕</button>
            </div>
            <form onSubmit={handleProductSubmit} className="adm-form">
              <div className="adm-field">
                <label>title</label>
                <input required value={productForm.title} onChange={e => setProductForm({ ...productForm, title: e.target.value })} placeholder="Nike Air Max…" />
              </div>
              <div className="adm-field">
                <label>image url</label>
                <input required value={productForm.imageURL} onChange={e => setProductForm({ ...productForm, imageURL: e.target.value })} placeholder="https://…" />
              </div>
              <div className="adm-field-row">
                <div className="adm-field">
                  <label>price (₹)</label>
                  <input required type="number" min="0" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} placeholder="2999" />
                </div>
                <div className="adm-field">
                  <label>category</label>
                  <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="adm-field">
                <label>details</label>
                <textarea required rows={3} value={productForm.details} onChange={e => setProductForm({ ...productForm, details: e.target.value })} placeholder="Product description…" />
              </div>

              {/* TOP SELLING CHECKBOX */}
              <div className="adm-field" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="ts-toggle"
                  checked={productForm.ts}
                  onChange={e => setProductForm({ ...productForm, ts: e.target.checked })}
                  style={{ width: '16px', height: '16px', accentColor: '#fff', cursor: 'pointer' }}
                />
                <label htmlFor="ts-toggle" style={{ marginBottom: 0, cursor: 'pointer' }}>
                  mark as top selling <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>(shows on home page)</span>
                </label>
              </div>

              {productForm.imageURL && (
                <div className="adm-preview">
                  <img src={productForm.imageURL} alt="preview" />
                </div>
              )}
              <div className="adm-modal-footer">
                <button type="button" className="adm-btn-ghost" onClick={() => setProductModal(false)}>cancel</button>
                <button type="submit" className="adm-btn-primary">{editingProduct ? 'save changes' : 'add product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}