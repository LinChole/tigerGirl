import React, { useState, useEffect } from 'react';

const Bookings = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const serviceTypes = [
    '美睫',
    '霧眉',
    '洗卸',
    '體驗班'
  ];

  useEffect(() => {
    loadMyBookings();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadAvailableSlots(selectedDate);
    }
  }, [selectedDate]);

  const loadMyBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings();
      setMyBookings(response.data.bookings);
    } catch (err) {
      console.error('載入預約失敗:', err);
    }
  };

  const loadAvailableSlots = async (date) => {
    try {
      const response = await bookingAPI.getAvailableTimes(date);
      setAvailableSlots(response.data.availableSlots);
    } catch (err) {
      console.error('載入可用時段失敗:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedDate || !selectedTime || !serviceType) {
      setError('請填寫所有必填欄位');
      return;
    }

    try {
      await bookingAPI.createBooking({
        booking_date: selectedDate,
        booking_time: selectedTime,
        service_type: serviceType,
        notes: notes,
      });

      setSuccess('預約成功!');
      setSelectedDate('');
      setSelectedTime('');
      setServiceType('');
      setNotes('');
      loadMyBookings();
    } catch (err) {
      setError(err.response?.data?.error || '預約失敗,請重試');
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('確定要取消此預約嗎?')) {
      return;
    }

    try {
      await bookingAPI.cancelBooking(bookingId);
      setSuccess('預約已取消');
      loadMyBookings();
    } catch (err) {
      setError('取消預約失敗');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };
  return (
    <div className="bookings-container">
      <h2>預約系統</h2>

      <div className="booking-form-section">
        <h3>建立新預約</h3>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>服務類型:</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              required
            >
              <option value="">請選擇服務類型</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {!!serviceType && (<>
            <div className="form-group">
              <label>選擇日期:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getMinDate()}
                required
              />
            </div>
            {serviceType === '美睫' && (
              <div className="form-group">
                <label>選擇項目:</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  <option value="">請選擇時段</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {availableSlots?.length === 0 && (
                  <p className="info-text">該日期沒有可用時段</p>
                )}
              </div>
            )}
            {selectedDate && (
              <div className="form-group">
                <label>選擇時段:</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  <option value="">請選擇時段</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {availableSlots?.length === 0 && (
                  <p className="info-text">該日期沒有可用時段</p>
                )}
              </div>
            )}



            <div className="form-group">
              <label>備註:</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows="3"
                placeholder="選填"
              />
            </div>

            <button type="submit" className="btn-primary">
              提交預約
            </button>
          </>)}
        </form>
      </div>

      <div className="my-bookings-section">
        <h3>我的預約</h3>
        {myBookings?.length === 0 ? (
          <p className="info-text">您還沒有任何預約</p>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>日期</th>
                <th>時間</th>
                <th>服務類型</th>
                <th>狀態</th>
                <th>備註</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {myBookings?.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.booking_date}</td>
                  <td>{booking.booking_time}</td>
                  <td>{booking.service_type}</td>
                  <td>
                    <span className={`status-${booking.status}`}>
                      {booking.status === 'pending' ? '待確認' :
                        booking.status === 'confirmed' ? '已確認' :
                          booking.status === 'cancelled' ? '已取消' : booking.status}
                    </span>
                  </td>
                  <td>{booking.notes || '-'}</td>
                  <td>
                    {booking.status !== 'cancelled' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="btn-cancel"
                      >
                        取消
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Bookings;
