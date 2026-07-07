(function () {
  const store = window.DineSenseStore;

  function getStatusTag(status) {
    const safe = String(status || '').toLowerCase();
    const css = safe === 'confirmed' ? 'confirmed' : safe === 'arrived' ? 'arrived' : safe === 'conflict' ? 'decline' : safe === 'declined' ? 'decline' : 'pending';
    return `<span class="tag ${css}">${status}</span>`;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.add('hidden'), 1800);
  }

  function renderHeaderState(state) {
    const badge = document.getElementById('openStatus');
    if (!badge) return;
    badge.textContent = state.restaurant.isOpen ? '● Open' : '● Closed';
    badge.classList.toggle('open', state.restaurant.isOpen);
    badge.classList.toggle('closed', !state.restaurant.isOpen);
  }

  function bindGlobalButtons() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => { window.location.href = 'index.html'; });

    const toggleOpenBtn = document.getElementById('toggleOpenBtn');
    if (toggleOpenBtn) {
      toggleOpenBtn.addEventListener('click', () => {
        const state = store.loadState();
        const next = store.setRestaurantOpen(!state.restaurant.isOpen);
        renderHeaderState(next);
        renderDashboard();
        showToast(`Restaurant is now ${next.restaurant.isOpen ? 'open' : 'closed'}.`);
      });
    }
  }

  function renderMiniMap(state, suggestedTable) {
    const target = document.getElementById('miniMapGrid');
    if (!target) return;
    target.innerHTML = '';
    state.tables.slice(0, 12).forEach((table) => {
      const box = document.createElement('div');
      box.className = `table-box ${table.status === 'available' ? 'green' : table.status === 'reserved' ? 'yellow' : 'red'} ${table.id === suggestedTable ? 'highlight' : ''}`;
      box.textContent = table.id;
      target.appendChild(box);
    });
  }

  function renderDashboardRows(state, query) {
    const body = document.getElementById('dashboardReservationRows');
    if (!body) return;
    const normalized = String(query || '').trim().toLowerCase();
    const filtered = state.reservations.filter((item) => {
      const haystack = `${item.id} ${item.customer} ${item.tableId} ${item.status} ${item.source}`.toLowerCase();
      return haystack.includes(normalized);
    });
    body.innerHTML = filtered.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.time}</td>
        <td>${item.customer}</td>
        <td>${item.pax}</td>
        <td>${item.source}</td>
        <td class="center-col"><span class="chip">${item.tableId}</span></td>
        <td>${getStatusTag(item.status)}</td>
      </tr>
    `).join('');
  }

  function renderDashboard() {
    const state = store.loadState();
    const stats = store.getStats(state);
    renderHeaderState(state);

    const occupancyValue = document.getElementById('occupancyValue');
    const waitTimeValue = document.getElementById('waitTimeValue');
    const activeTablesValue = document.getElementById('activeTablesValue');
    const pendingReservationsValue = document.getElementById('pendingReservationsValue');
    const recommendationCount = document.getElementById('recommendationCount');
    const conflictCount = document.getElementById('conflictCount');
    const availableCount = document.getElementById('availableCount');
    const overrideCount = document.getElementById('overrideCount');
    const metaRating = document.getElementById('metaRating');
    const lastUpdatedLabel = document.getElementById('lastUpdatedLabel');

    if (occupancyValue) occupancyValue.textContent = `${stats.occupancy}% Full`;
    if (waitTimeValue) waitTimeValue.textContent = `${Math.max(5, stats.pendingReservations * 5)} minutes`;
    if (activeTablesValue) activeTablesValue.textContent = `${stats.activeTables} / ${stats.total}`;
    if (pendingReservationsValue) pendingReservationsValue.textContent = String(stats.pendingReservations);
    if (recommendationCount) recommendationCount.textContent = String(state.reservations.length);
    if (conflictCount) conflictCount.textContent = String(stats.conflicts);
    if (availableCount) availableCount.textContent = String(stats.available);
    if (overrideCount) overrideCount.textContent = String(stats.overrides);
    if (metaRating) metaRating.textContent = `⭐ ${state.restaurant.rating} Rating`;
    if (lastUpdatedLabel) lastUpdatedLabel.textContent = `Last sync: ${new Date(state.restaurant.lastUpdated).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;

    const previewSelect = document.getElementById('previewSelect');
    if (previewSelect) {
      previewSelect.innerHTML = state.reservations.map((reservation) => `<option value="${reservation.id}">${reservation.id} • ${reservation.customer} • ${reservation.time}</option>`).join('');
      const setPreview = () => {
        const reservation = state.reservations.find((item) => item.id === previewSelect.value) || state.reservations[0];
        document.getElementById('pvCustomer').textContent = reservation.customer;
        document.getElementById('pvPax').textContent = String(reservation.pax);
        document.getElementById('pvTime').textContent = reservation.time;
        document.getElementById('pvTable').textContent = reservation.aiSuggested || reservation.tableId;
        renderMiniMap(state, reservation.aiSuggested || reservation.tableId);
      };
      previewSelect.value = state.reservations[0]?.id || '';
      setPreview();
      previewSelect.addEventListener('change', setPreview);
    }

    const search = document.getElementById('reservationSearch');
    renderDashboardRows(state, search ? search.value : '');
    if (search && !search.dataset.bound) {
      search.dataset.bound = '1';
      search.addEventListener('input', () => renderDashboardRows(store.loadState(), search.value));
    }
  }

  function renderReservations() {
    const state = store.loadState();
    renderHeaderState(state);
    const body = document.getElementById('reservationRows');
    if (!body) return;

    const draw = (query = '') => {
      const normalized = query.trim().toLowerCase();
      body.innerHTML = state.reservations.filter((item) => {
        const haystack = `${item.id} ${item.customer} ${item.phone} ${item.tableId} ${item.status} ${item.source}`.toLowerCase();
        return haystack.includes(normalized);
      }).map((item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.customer}</td>
          <td>${item.phone}</td>
          <td>${item.time}</td>
          <td>${item.pax}</td>
          <td><span class="chip">${item.tableId}</span></td>
          <td>${item.source}</td>
          <td>${getStatusTag(item.status)}</td>
          <td class="right action-col">
            <div class="row-actions">
              <button class="btn primary small js-status" data-id="${item.id}" data-status="Confirmed" type="button">Confirmed</button>
              <button class="btn outline small js-status" data-id="${item.id}" data-status="Declined" type="button">Declined</button>
            </div>
          </td>
        </tr>
      `).join('');
    };

    draw();
    const search = document.getElementById('reservationSearch');
    if (search) search.addEventListener('input', () => draw(search.value));

    body.addEventListener('click', (event) => {
      const button = event.target.closest('.js-status');
      if (!button) return;
      store.updateReservationStatus(button.dataset.id, button.dataset.status);
      showToast(`Reservation ${button.dataset.id} marked as ${button.dataset.status}.`);
      renderReservations();
    });
  }

  function renderAiLogs() {
    const state = store.loadState();
    renderHeaderState(state);
    const list = document.getElementById('aiLogList');
    if (!list) return;
    list.innerHTML = state.aiLogs.map((log) => `
      <article class="log-item">
        <div class="log-top"><span class="chip">${log.id}</span><span class="tag ${log.type === 'Conflict' ? 'decline' : log.type === 'Override' ? 'pending' : 'confirmed'}">${log.type}</span></div>
        <h4>${log.time}</h4>
        <p>${log.message}</p>
      </article>
    `).join('');
  }

    function statusClass(status){
  if(status === "reserved") return "status-reserved";
  if(status === "occupied") return "status-occupied";
  return "status-available";
}

function renderTableMap(){
  const overlay = document.getElementById("tableOverlay");
  if(!overlay) return;

  overlay.innerHTML = tablePositions.map(table => `
    <button
      class="map-table ${table.shape} ${statusClass(table.status)}"
      style="top:${table.top}%; left:${table.left}%"
      title="${table.id}"
      type="button"
    >
      ${table.seats}
    </button>
  `).join("");
  console.log("TABLE MAP SCRIPT RUNNING");
}

  bindGlobalButtons();
  if (store)  {
   if (document.getElementById('dashboardReservationRows')) renderDashboard();
   if (document.getElementById('reservationRows')) renderReservations();
   if (document.getElementById('aiLogList')) renderAiLogs();
  }
  if (document.getElementById('tableOverlay')) {
  window.addEventListener("load", () => {
    renderTableMap();
  });
}
})();

