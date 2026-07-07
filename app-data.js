(function () {
  const STORAGE_KEY = 'dinesense_shared_state_v1';

  const DEFAULT_STATE = {
    restaurant: {
      name: 'Suraya Seafood',
      branch: 'Main Branch',
      isOpen: true,
      rating: 4.2,
      lastUpdated: new Date().toISOString()
    },
    tables: [
  { id: "T01", seats: 4, shape: "circle", top: 18, left: 10, status: "reserved" },
  { id: "T02", seats: 4, shape: "rect-small", top: 18, left: 18, status: "available" },
  { id: "T03", seats: 6, shape: "rect-wide", top: 12, left: 36, status: "available" },
  { id: "T04", seats: 4, shape: "rect-small", top: 12, left: 47, status: "reserved" },
  { id: "T05", seats: 4, shape: "rect-small", top: 12, left: 57, status: "reserved" },
  { id: "T06", seats: 4, shape: "rect-small", top: 18, left: 66, status: "available" },

  { id: "T07", seats: 4, shape: "circle", top: 28, left: 10, status: "reserved" },
  { id: "T08", seats: 4, shape: "rect-small", top: 28, left: 18, status: "available" },
  { id: "T09", seats: 8, shape: "rect-wide", top: 28, left: 36, status: "available" },
  { id: "T10", seats: 8, shape: "rect-wide", top: 28, left: 52, status: "reserved" },
  { id: "T11", seats: 4, shape: "rect-small", top: 28, left: 66, status: "available" },

  { id: "T12", seats: 4, shape: "circle", top: 38, left: 10, status: "available" },
  { id: "T13", seats: 4, shape: "rect-small", top: 38, left: 18, status: "available" },
  { id: "T14", seats: 8, shape: "rect-wide", top: 38, left: 36, status: "available" },
  { id: "T15", seats: 8, shape: "rect-wide", top: 38, left: 52, status: "available" },
  { id: "T16", seats: 4, shape: "rect-small", top: 38, left: 66, status: "available" },

  { id: "T17", seats: 4, shape: "circle", top: 50, left: 10, status: "available" },
  { id: "T18", seats: 4, shape: "rect-small", top: 50, left: 18, status: "available" },
  { id: "T19", seats: 8, shape: "rect-wide", top: 50, left: 36, status: "available" },
  { id: "T20", seats: 8, shape: "rect-wide", top: 50, left: 52, status: "available" },
  { id: "T21", seats: 4, shape: "rect-small", top: 50, left: 66, status: "available" },

  { id: "T22", seats: 4, shape: "circle", top: 62, left: 10, status: "available" },
  { id: "T23", seats: 4, shape: "rect-small", top: 62, left: 18, status: "available" },
  { id: "T24", seats: 8, shape: "rect-wide", top: 62, left: 36, status: "available" },
  { id: "T25", seats: 8, shape: "rect-wide", top: 62, left: 52, status: "available" },
  { id: "T26", seats: 4, shape: "rect-small", top: 62, left: 66, status: "available" },

  { id: "T27", seats: 4, shape: "circle", top: 74, left: 10, status: "available" },
  { id: "T28", seats: 4, shape: "rect-small", top: 74, left: 18, status: "available" },
  { id: "T29", seats: 8, shape: "rect-wide", top: 74, left: 36, status: "reserved" },
  { id: "T30", seats: 8, shape: "rect-wide", top: 74, left: 52, status: "available" },
  { id: "T31", seats: 4, shape: "rect-small", top: 74, left: 66, status: "available" },
  { id: "T32", seats: 4, shape: "circle", top: 86, left: 10, status: "available" },
  { id: "T33", seats: 4, shape: "rect-small", top: 86, left: 18, status: "available" },
  { id: "T34", seats: 8, shape: "rect-wide", top: 86, left: 36, status: "available" },
  { id: "T35", seats: 8, shape: "rect-wide", top: 86, left: 52, status: "available" },
  { id: "T36", seats: 4, shape: "rect-small", top: 86, left: 66, status: "available" },

// Bottom section (separate area based on layout)
{ id: "T37", seats: 8, shape: "rect-wide", top: 30, left: 82, status: "available" },
{ id: "T38", seats: 8, shape: "rect-wide", top: 38, left: 82, status: "available" },
{ id: "T39", seats: 8, shape: "rect-wide", top: 46, left: 82, status: "available" },
{ id: "T40", seats: 8, shape: "rect-wide", top: 54, left: 82, status: "available" },

{ id: "T41", seats: 6, shape: "circle", top: 30, left: 92, status: "available" },

{ id: "T42", seats: 8, shape: "rect-wide", top: 62, left: 82, status: "available" },
{ id: "T43", seats: 8, shape: "rect-wide", top: 70, left: 82, status: "available" },
{ id: "T44", seats: 8, shape: "rect-wide", top: 78, left: 82, status: "available" }
  ],
    reservations: [
      { id: 'RSV-1001', customer: 'Aina', phone: '012-3456789', pax: 4, time: '6:30 PM', tableId: 'T05', status: 'Confirmed', source: 'mobile-app', notes: 'Window side', aiSuggested: 'T05' },
      { id: 'RSV-1002', customer: 'Haziq', phone: '012-9988776', pax: 2, time: '7:00 PM', tableId: 'T02', status: 'Confirmed', source: 'mobile-app', notes: 'Birthday cake', aiSuggested: 'T02' },
      { id: 'RSV-1003', customer: 'Jason', phone: '017-4562190', pax: 3, time: '8:00 PM', tableId: 'T04', status: 'Pending', source: 'mobile-app', notes: 'Needs child seat', aiSuggested: 'T04' },
      { id: 'RSV-1004', customer: 'Nurin', phone: '011-1234432', pax: 8, time: '8:30 PM', tableId: 'T18', status: 'Confirmed', source: 'admin-web', notes: 'Family dinner', aiSuggested: 'T18' },
      { id: 'RSV-1005', customer: 'Faris', phone: '018-5656565', pax: 8, time: '9:00 PM', tableId: 'T28', status: 'Pending', source: 'mobile-app', notes: 'Requested quiet area', aiSuggested: 'T28' }
    ],
    aiLogs: [
      { id: 'AI-301', time: '5:55 PM', type: 'Recommendation', message: 'Suggested T05 for RSV-1001 based on pax and availability.' },
      { id: 'AI-302', time: '6:12 PM', type: 'Recommendation', message: 'Suggested T02 for RSV-1002 with shortest walking path.' },
      { id: 'AI-303', time: '6:40 PM', type: 'Pending', message: 'Waiting for admin to overview your booking.' },
      { id: 'AI-304', time: '7:05 PM', type: 'Pending', message: 'Waiting for admin to overview your booking.' }
    ]
  };

  function clone(data) { return JSON.parse(JSON.stringify(data)); }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        saveState(DEFAULT_STATE);
        return clone(DEFAULT_STATE);
      }
      return Object.assign(clone(DEFAULT_STATE), JSON.parse(raw));
    } catch (error) {
      console.warn('Failed to load DineSense state:', error);
      return clone(DEFAULT_STATE);
    }
  }

  function saveState(state) {
    const next = clone(state);
    next.restaurant.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  }

  function getTableMap(state) {
    return new Map(state.tables.map((table) => [table.id, table]));
  }

  function getStats(state) {
    const occupied = state.tables.filter((table) => table.status === 'occupied').length;
    const reserved = state.tables.filter((table) => table.status === 'reserved').length;
    const available = state.tables.filter((table) => table.status === 'available').length;
    const total = state.tables.length;
    const occupancy = Math.round(((occupied + reserved) / total) * 100);
    const pendingReservations = state.reservations.filter((reservation) => reservation.status === 'Pending').length;
    const activeTables = occupied + reserved;
    const conflicts = state.reservations.filter((reservation) => reservation.status === 'Conflict').length;
    const overrides = state.aiLogs.filter((log) => log.type === 'Override').length;
    return { occupied, reserved, available, total, occupancy, pendingReservations, activeTables, conflicts, overrides };
  }

  function setRestaurantOpen(isOpen) {
    const state = loadState();
    state.restaurant.isOpen = Boolean(isOpen);
    return saveState(state);
  }

  function updateReservation(reservationId, updates) {
    const state = loadState();
    const reservation = state.reservations.find((item) => item.id === reservationId);
    if (!reservation) return state;

    const previousTableId = reservation.tableId;
    Object.assign(reservation, updates);

    if (updates.tableId && updates.tableId !== previousTableId) {
      const tableMap = getTableMap(state);
      if (tableMap.has(previousTableId)) {
        const oldTable = tableMap.get(previousTableId);
        oldTable.status = 'available';
      }
      if (tableMap.has(updates.tableId)) {
        const newTable = tableMap.get(updates.tableId);
        newTable.status = reservation.status === 'confirmed' ? 'occupied' : 'reserved';
      }
      state.aiLogs.unshift({
        id: `AI-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        type: 'Override',
        message: `Reservation ${reservationId} moved from ${previousTableId} to ${updates.tableId}.`
      });
    }

    return saveState(state);
  }

  function updateReservationStatus(reservationId, status) {
    const state = loadState();
    const reservation = state.reservations.find((item) => item.id === reservationId);
    if (!reservation) return state;

    reservation.status = status;
    const table = state.tables.find((item) => item.id === reservation.tableId);
    if (table) {
      table.status = status === 'Confirmed' ? 'Pending' : status === 'Pending' ? 'Available' : 'Reserved';
    }
    return saveState(state);
  }
  window.DineSenseStore = {
    storageKey: STORAGE_KEY,
    loadState,
    saveState,
    getStats,
    setRestaurantOpen,
    updateReservation,
    updateReservationStatus
  };
})();
