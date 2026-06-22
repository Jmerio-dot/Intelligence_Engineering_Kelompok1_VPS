(async () => {
      if (!requireAuth()) return;
      await renderSidebar('laporan');

      function parseProjectMeta(raw) {
        try { return JSON.parse(raw); } catch { return null; }
      }

      function renderProjectCard(p) {
        const isDone = p.status === 'done';
        const meta = parseProjectMeta(p.description);
        const desc = meta ? (meta.description || 'Tidak ada deskripsi.') : (p.description || 'Tidak ada deskripsi.');
        const keyInitial = p.key.substring(0, 2);
        const avatarClass = isDone ? 'proj-avatar done' : 'proj-avatar';
        const badgeClass = isDone ? 'status-badge done' : 'status-badge active';
        const badgeText = isDone ? 'Selesai' : 'Aktif';
        const progressIcon = isDone ? '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>' : '<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

        return `
        <a href="board.html?pid=${p.id}" style="text-decoration:none; color:inherit; display:block;">
          <div class="card proj-card" style="padding:0;display:flex;flex-direction:column;height:100%;transition:transform 0.2s, box-shadow 0.2s;">
            <div style="padding:1.1rem 1.25rem;border-bottom:1px solid var(--border);flex:1;">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:0.75rem;">
                <div style="display:flex;align-items:center;gap:0.75rem;">
                  <div class="${avatarClass}">${keyInitial}</div>
                  <div>
                    <div style="font-weight:800;font-size:1rem;color:var(--ocean);line-height:1.2;margin-bottom:0.1rem;">${p.name}</div>
                    <div style="font-size:0.72rem;color:var(--muted);display:flex;align-items:center;gap:0.4rem;">
                      <span style="font-weight:600;color:var(--text2);">${p.key}</span> &bull; ${p.type}
                    </div>
                  </div>
                </div>
                <div class="${badgeClass}">${badgeText}</div>
              </div>
              <div class="proj-desc">${desc}</div>
            </div>
            <div style="background:#f8fafc;padding:0.75rem 1.25rem;font-size:0.78rem;color:var(--muted);display:flex;justify-content:space-between;align-items:center;border-bottom-left-radius:12px;border-bottom-right-radius:12px;">
              <div style="display:flex;align-items:center;gap:0.4rem;">
                <span style="color:${isDone ? '#10b981' : '#f59e0b'};font-size:0.9rem;display:flex;align-items:center;">${progressIcon}</span>
                <span>${p.open_issues} issue tertunda</span>
              </div>
              <div style="font-weight:600;color:var(--text2);">
                ${p.issue_count} total
              </div>
            </div>
          </div>
        </a>`;
      }

      try {
        const projects = await apiFetch('/projects');
        const activeProjects = projects.filter(p => p.status !== 'done');
        const doneProjects = projects.filter(p => p.status === 'done');

        document.getElementById('count-active').textContent = activeProjects.length;
        document.getElementById('count-done').textContent = doneProjects.length;

        const gridActive = document.getElementById('grid-active');
        const gridDone = document.getElementById('grid-done');

        if (activeProjects.length > 0) {
          gridActive.innerHTML = activeProjects.map(renderProjectCard).join('');
        } else {
          gridActive.innerHTML = `<div class="empty-state" style="grid-column:1/-1;padding:2rem;text-align:center;background:#fff;border-radius:12px;border:1px dashed #cbd5e1;"><div style="margin-bottom:0.5rem;"><svg width="32" height="32" fill="none" stroke="#0284c7" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><p style="color:var(--muted);font-size:0.9rem;margin:0;">Tidak ada proyek yang sedang dikerjakan.</p></div>`;
        }

        if (doneProjects.length > 0) {
          gridDone.innerHTML = doneProjects.map(renderProjectCard).join('');
        } else {
          gridDone.innerHTML = `<div class="empty-state" style="grid-column:1/-1;padding:2rem;text-align:center;background:#fff;border-radius:12px;border:1px dashed #cbd5e1;"><div style="margin-bottom:0.5rem;"><svg width="32" height="32" fill="none" stroke="#10b981" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><p style="color:var(--muted);font-size:0.9rem;margin:0;">Belum ada proyek yang diselesaikan.</p></div>`;
        }
      } catch(e) {
        showToast(e.message, 'error');
      }
    })();
