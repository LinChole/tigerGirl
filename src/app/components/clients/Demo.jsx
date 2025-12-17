import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, ChevronLeft, ChevronRight, CheckCircle, Loader } from 'lucide-react';

const BookingSystem = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '' });
  const [bookingComplete, setBookingComplete] = useState(false);

  // 模擬服務項目資料
  const services = [
    {
      id: 1,
      name: '剪髮服務',
      duration: 60,
      price: 800,
      description: '專業剪髮造型',
      color: 'blue'
    },
    {
      id: 2,
      name: '染髮服務',
      duration: 120,
      price: 2000,
      description: '時尚染髮設計',
      color: 'purple'
    },
    {
      id: 3,
      name: '燙髮服務',
      duration: 180,
      price: 2500,
      description: '專業燙髮造型',
      color: 'pink'
    },
    {
      id: 4,
      name: '洗剪吹',
      duration: 45,
      price: 500,
      description: '基礎護理服務',
      color: 'green'
    }
  ];

  // 模擬從資料庫獲取可預約時段
  const fetchAvailableSlots = async (serviceId) => {
    setLoading(true);

    // 模擬 API 請求延遲
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 模擬資料庫回傳的可預約資料
    const today = new Date();
    const mockData = {};

    // 生成未來 30 天的可預約時段
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateKey = formatDate(date);

      // 跳過週日
      if (date.getDay() === 0) continue;

      // 根據服務時長生成時間段
      const service = services.find(s => s.id === serviceId);
      const slots = generateTimeSlots(service.duration);

      // 隨機移除一些時段來模擬已被預約的情況
      const availableSlots = slots.filter(() => Math.random() > 0.3);

      if (availableSlots.length > 0) {
        mockData[dateKey] = availableSlots;
      }
    }

    setAvailableSlots(mockData);
    setLoading(false);
  };

  // 根據服務時長生成合適的時間段
  const generateTimeSlots = (duration) => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    const intervalMinutes = 30;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const startTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

        // 計算結束時間
        const totalMinutes = hour * 60 + minute + duration;
        const endHour = Math.floor(totalMinutes / 60);
        const endMinute = totalMinutes % 60;

        // 確保不超過營業時間
        if (endHour <= 18) {
          const endTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
          slots.push({ start: startTime, end: endTime });
        }
      }
    }

    return slots;
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    fetchAvailableSlots(service.id);
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (timeSlot) => {
    setSelectedTime(timeSlot);
    setStep(3);
  };

  const handleBookingSubmit = async () => {
    if (!customerInfo.name || !customerInfo.phone) return;

    setLoading(true);

    // 模擬提交預約到資料庫
    await new Promise(resolve => setTimeout(resolve, 1500));

    setLoading(false);
    setBookingComplete(true);
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setAvailableSlots(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerInfo({ name: '', phone: '', email: '' });
    setBookingComplete(false);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isDateAvailable = (date) => {
    if (!availableSlots) return false;
    const dateKey = formatDate(date);
    return availableSlots[dateKey] && availableSlots[dateKey].length > 0;
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  const today = new Date();

  // 步驟 1: 選擇服務項目
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <h1 className="text-3xl font-bold">選擇服務項目</h1>
              <p className="mt-2 text-blue-100">請選擇您需要的服務</p>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="text-left p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group"
                  >
                    <div className={`inline-block p-3 bg-${service.color}-100 rounded-lg mb-3 group-hover:scale-110 transition`}>
                      <Calendar className={`w-6 h-6 text-${service.color}-600`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {service.duration} 分鐘
                      </span>
                      <span className="text-lg font-bold text-blue-600">NT$ {service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 步驟 2: 選擇日期和時間
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <button onClick={resetBooking} className="text-blue-100 hover:text-white mb-2">
                ← 返回選擇服務
              </button>
              <h1 className="text-3xl font-bold">選擇預約時間</h1>
              <p className="mt-2 text-blue-100">
                已選擇：{selectedService.name} ({selectedService.duration}分鐘)
              </p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-20">
                <Loader className="w-12 h-12 text-blue-600 animate-spin" />
                <span className="ml-3 text-lg text-gray-600">載入可預約時段中...</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* 日曆 */}
                <div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={prevMonth} className="p-2 hover:bg-white rounded-lg transition">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <h2 className="text-xl font-semibold">
                        {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
                      </h2>
                      <button onClick={nextMonth} className="p-2 hover:bg-white rounded-lg transition">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {[...Array(startingDayOfWeek)].map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {[...Array(daysInMonth)].map((_, i) => {
                        const day = i + 1;
                        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                        const isToday = date.toDateString() === today.toDateString();
                        const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                        const isPast = date < today && !isToday;
                        const isAvailable = isDateAvailable(date);

                        return (
                          <button
                            key={day}
                            onClick={() => isAvailable && handleDateSelect(date)}
                            disabled={isPast || !isAvailable}
                            className={`
                              aspect-square rounded-lg flex items-center justify-center text-sm transition
                              ${isPast || !isAvailable ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-blue-100 cursor-pointer'}
                              ${isToday ? 'ring-2 ring-blue-500' : ''}
                              ${isSelected ? 'bg-blue-500 text-white font-bold' : ''}
                              ${isAvailable && !isSelected ? 'bg-green-50 text-green-700 font-medium' : ''}
                            `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                        <span>可預約</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-gray-100 rounded"></div>
                        <span>不可預約</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 時間段 */}
                <div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      選擇時間段
                    </h3>
                    {selectedDate ? (
                      <div>
                        <p className="text-sm text-gray-600 mb-4">
                          已選日期：{selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
                        </p>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {availableSlots[formatDate(selectedDate)]?.map((slot, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleTimeSelect(slot)}
                              className="w-full p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition text-left"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-semibold text-lg">{slot.start} - {slot.end}</div>
                                  <div className="text-sm text-gray-500">時長：{selectedService.duration}分鐘</div>
                                </div>
                                <div className="text-blue-600 font-bold">
                                  NT$ {selectedService.price}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-400 py-12">
                        請先選擇日期
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 步驟 3: 填寫資料
  if (step === 3 && !bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <button onClick={() => setStep(2)} className="text-blue-100 hover:text-white mb-2">
                ← 返回選擇時間
              </button>
              <h1 className="text-3xl font-bold">填寫預約資料</h1>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold mb-2">預約摘要</h3>
                <div className="space-y-1 text-sm">
                  <p>服務項目：{selectedService.name}</p>
                  <p>預約日期：{selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日</p>
                  <p>預約時間：{selectedTime.start} - {selectedTime.end}</p>
                  <p>服務時長：{selectedService.duration}分鐘</p>
                  <p className="text-lg font-bold text-blue-600 pt-2">費用：NT$ {selectedService.price}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">姓名 *</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="請輸入您的姓名"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">聯絡電話 *</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="請輸入您的電話"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">電子郵件（選填）</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="請輸入您的電子郵件"
                  />
                </div>

                <button
                  onClick={handleBookingSubmit}
                  disabled={!customerInfo.name || !customerInfo.phone || loading}
                  className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      處理中...
                    </>
                  ) : (
                    '確認預約'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 完成預約
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">預約成功！</h2>
          <p className="text-gray-600 mb-6">我們已收到您的預約，稍後會有專人與您聯繫確認</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">預約詳情</h3>
            <div className="space-y-1 text-sm">
              <p>服務項目：{selectedService.name}</p>
              <p>預約日期：{selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日</p>
              <p>預約時間：{selectedTime.start} - {selectedTime.end}</p>
              <p>預約人：{customerInfo.name}</p>
              <p>聯絡電話：{customerInfo.phone}</p>
            </div>
          </div>

          <button
            onClick={resetBooking}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            返回首頁
          </button>
        </div>
      </div>
    );
  }
};

export default BookingSystem;