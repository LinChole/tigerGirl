import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusForm, setStatusForm] = useState({
    status: '',
    admin_notes: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {

  }, []);


  // const getStatusBadge = (status) => {
  //   const badges = {
  //     pending: { text: '待確認', class: 'status-pending' },
  //     confirmed: { text: '已確認', class: 'status-confirmed' },
  //     cancelled: { text: '已取消', class: 'status-cancelled' },
  //     completed: { text: '已完成', class: 'status-completed' },
  //   };
  //   const badge = badges[status] || { text: status, class: '' };
  //   return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
  // };

  // if (loading) {
  //   return <div className="loading">載入中...</div>;
  // }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>預約管理</h1>
        <Link to="/admin/dashboard" className="btn-secondary">
          返回後台
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="filter-bar">
        <div className="filter-group">
          <label>狀態篩選:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">全部</option>
            <option value="pending">待確認</option>
            <option value="confirmed">已確認</option>
            <option value="cancelled">已取消</option>
            <option value="completed">已完成</option>
          </select>
        </div>

        <div className="filter-group">
          <label>日期篩選:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <button
          onClick={() => {
            setFilterStatus('');
            setFilterDate('');
          }}
          className="btn-secondary"
        >
          清除篩選
        </button>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>用戶</th>
              <th>聯絡方式</th>
              <th>日期</th>
              <th>時間</th>
              <th>服務類型</th>
              <th>狀態</th>
              <th>備註</th>
              <th>建立時間</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center">沒有預約資料</td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.username}</td>
                  <td>
                    <div>{booking.email}</div>
                    <div className="text-small">{booking.phone || '-'}</div>
                  </td>
                  <td>{booking.booking_date}</td>
                  <td>{booking.booking_time}</td>
                  <td>{booking.service_type}</td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>
                    <div className="notes-cell">
                      {booking.notes && (
                        <div>
                          <strong>客戶:</strong> {booking.notes}
                        </div>
                      )}
                      {booking.admin_notes && (
                        <div className="admin-note">
                          <strong>管理員:</strong> {booking.admin_notes}
                        </div>
                      )}
                      {!booking.notes && !booking.admin_notes && '-'}
                    </div>
                  </td>
                  <td>{new Date(booking.created_at).toLocaleString('zh-TW')}</td>
                  <td>
                    <button
                      onClick={() => handleEditStatus(booking)}
                      className="btn-sm btn-edit"
                    >
                      處理
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && selectedBooking && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>更新預約狀態</h2>

            <div className="booking-info">
              <p><strong>用戶:</strong> {selectedBooking.username}</p>
              <p><strong>日期:</strong> {selectedBooking.booking_date} {selectedBooking.booking_time}</p>
              <p><strong>服務:</strong> {selectedBooking.service_type}</p>
              {selectedBooking.notes && (
                <p><strong>客戶備註:</strong> {selectedBooking.notes}</p>
              )}
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleStatusUpdate}>
              <div className="form-group">
                <label>狀態:</label>
                <select
                  value={statusForm.status}
                  onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                  required
                >
                  <option value="">請選擇狀態</option>
                  <option value="pending">待確認</option>
                  <option value="confirmed">已確認</option>
                  <option value="cancelled">已取消</option>
                  <option value="completed">已完成</option>
                </select>
              </div>

              <div className="form-group">
                <label>管理員備註:</label>
                <textarea
                  value={statusForm.admin_notes}
                  onChange={(e) => setStatusForm({ ...statusForm, admin_notes: e.target.value })}
                  rows="3"
                  placeholder="輸入處理備註..."
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  更新
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
