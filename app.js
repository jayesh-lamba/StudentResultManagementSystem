const STORAGE_KEY = 'srms_vit_students_v1';

const DEFAULT_STUDENTS = [
  {
    studentId: '22BCE11526',
    name: 'Jayesh Lamba',
    course: 'B.Tech CSE',
    mathMarks: 94,
    scienceMarks: 91,
    englishMarks: 92,
  },
  {
    studentId: '22BCE11408',
    name: 'Aarav Mehta',
    course: 'B.Tech IT',
    mathMarks: 88,
    scienceMarks: 84,
    englishMarks: 81,
  },
  {
    studentId: '22BDS10214',
    name: 'Ananya Verma',
    course: 'B.Tech Data Science',
    mathMarks: 76,
    scienceMarks: 79,
    englishMarks: 85,
  },
  {
    studentId: '22BCE11890',
    name: 'Rohan Kulkarni',
    course: 'B.Tech CSE',
    mathMarks: 68,
    scienceMarks: 72,
    englishMarks: 65,
  },
  {
    studentId: '22BAI10532',
    name: 'Sneha Nair',
    course: 'B.Tech IT',
    mathMarks: 34,
    scienceMarks: 62,
    englishMarks: 71,
  },
  {
    studentId: '22BDS10911',
    name: 'Kabir Sharma',
    course: 'B.Tech Data Science',
    mathMarks: -1,
    scienceMarks: -1,
    englishMarks: -1,
  },
];

// Exact port of Student.java business rules
function calculateAverage(s) {
  let count = 0;
  let sum = 0;
  if (s.mathMarks >= 0) { sum += s.mathMarks; count++; }
  if (s.scienceMarks >= 0) { sum += s.scienceMarks; count++; }
  if (s.englishMarks >= 0) { sum += s.englishMarks; count++; }
  return count === 0 ? 0 : sum / count;
}

function calculatePercentage(s) {
  return calculateAverage(s);
}

function getGrade(s) {
  const pct = calculatePercentage(s);
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B+';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C+';
  if (pct >= 40) return 'C';
  return 'F';
}

function isPassed(s) {
  if (s.mathMarks < 0 || s.scienceMarks < 0 || s.englishMarks < 0) return false;
  return s.mathMarks >= 40 && s.scienceMarks >= 40 && s.englishMarks >= 40;
}

function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return structuredClone(DEFAULT_STUDENTS);
}

let students = loadStudents();
let selectedReportId = students[0]?.studentId || '';
let activeTab = 'overview';

function saveStudents() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch {
    // ignore quota errors
  }
}

function findStudent(studentId) {
  const normalized = studentId.trim().toLowerCase();
  return students.find((s) => s.studentId.toLowerCase() === normalized) || null;
}

function addStudentRecord(studentId, name, course) {
  if (findStudent(studentId)) return false;
  students.push({
    studentId: studentId.trim(),
    name: name.trim(),
    course: course.trim(),
    mathMarks: -1,
    scienceMarks: -1,
    englishMarks: -1,
  });
  saveStudents();
  return true;
}

function updateStudentRecord(studentId, name, course) {
  const s = findStudent(studentId);
  if (!s) return false;
  if (name.trim()) s.name = name.trim();
  if (course.trim()) s.course = course.trim();
  saveStudents();
  return true;
}

function deleteStudentRecord(studentId) {
  const idx = students.findIndex((s) => s.studentId.toLowerCase() === studentId.trim().toLowerCase());
  if (idx === -1) return false;
  students.splice(idx, 1);
  if (selectedReportId === studentId) {
    selectedReportId = students[0]?.studentId || '';
  }
  saveStudents();
  return true;
}

function addSubjectMark(studentId, subject, marks) {
  const s = findStudent(studentId);
  if (!s || Number.isNaN(marks) || marks < 0 || marks > 100) return false;
  const sub = subject.trim().toLowerCase();
  if (sub === 'math') { s.mathMarks = marks; saveStudents(); return true; }
  if (sub === 'science') { s.scienceMarks = marks; saveStudents(); return true; }
  if (sub === 'english') { s.englishMarks = marks; saveStudents(); return true; }
  return false;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.hidden = true;
  }, 3200);
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));
}

function formatMarkCell(val) {
  if (val < 0) return '<span style="color:#64748b">—</span>';
  const low = val < 40;
  return `<span style="color:${low ? '#fda4af' : '#e2e8f0'};font-weight:600">${val.toFixed(1)}</span>`;
}

function renderKPIs() {
  const total = students.length;
  const passed = students.filter(isPassed).length;
  const failed = total - passed;
  const passRate = total ? ((passed / total) * 100).toFixed(1) : '0.0';
  const graded = students.filter((s) => s.mathMarks >= 0 || s.scienceMarks >= 0 || s.englishMarks >= 0);
  const cohortAvg = graded.length
    ? (graded.reduce((acc, s) => acc + calculateAverage(s), 0) / graded.length).toFixed(2)
    : '0.00';
  const honors = students.filter((s) => ['A+', 'A'].includes(getGrade(s)) && isPassed(s)).length;

  document.getElementById('kpi-total').textContent = String(total);
  document.getElementById('kpi-total-sub').textContent = `${graded.length} evaluated · ${total - graded.length} pending marks`;
  document.getElementById('kpi-pass-rate').textContent = `${passRate}%`;
  document.getElementById('kpi-pass-sub').textContent = `${passed} passed · ${failed} failed`;
  document.getElementById('kpi-avg').textContent = `${cohortAvg}%`;
  document.getElementById('kpi-distinction').textContent = String(honors);
}

function renderCharts() {
  const subjects = [
    { key: 'mathMarks', label: 'Mathematics' },
    { key: 'scienceMarks', label: 'Science' },
    { key: 'englishMarks', label: 'English' },
  ];

  const subjectContainer = document.getElementById('subject-bars');
  subjectContainer.innerHTML = subjects.map((sub) => {
    const entries = students.filter((s) => s[sub.key] >= 0).map((s) => s[sub.key]);
    const avg = entries.length ? entries.reduce((a, b) => a + b, 0) / entries.length : 0;
    return `
      <div>
        <div class="bar-row-meta">
          <span>${sub.label}</span>
          <strong>${avg.toFixed(1)}% <span style="color:#64748b;font-weight:400">(${entries.length} graded)</span></strong>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width:${Math.min(100, avg).toFixed(1)}%"></div>
        </div>
      </div>
    `;
  }).join('');

  const gradeOrder = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'F'];
  const counts = Object.fromEntries(gradeOrder.map((g) => [g, 0]));
  students.forEach((s) => {
    const g = getGrade(s);
    counts[g] = (counts[g] || 0) + 1;
  });
  const maxCount = Math.max(1, ...Object.values(counts));

  document.getElementById('grade-bars').innerHTML = gradeOrder.map((g) => {
    const cnt = counts[g] || 0;
    const hPct = Math.round((cnt / maxCount) * 100);
    return `
      <div class="grade-col">
        <span class="grade-col-count">${cnt}</span>
        <div class="grade-col-track">
          <div class="grade-col-fill ${g === 'F' ? 'grade-col-fill--fail' : ''}" style="height:${hPct}%"></div>
        </div>
        <span class="grade-col-label">${g}</span>
      </div>
    `;
  }).join('');
}

function renderFiltersAndTable() {
  const courseSelect = document.getElementById('course-filter');
  const prevCourse = courseSelect.value || 'ALL';
  const uniqueCourses = Array.from(new Set(students.map((s) => s.course))).sort();
  courseSelect.innerHTML = `<option value="ALL">All Courses</option>` +
    uniqueCourses.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  courseSelect.value = uniqueCourses.includes(prevCourse) ? prevCourse : 'ALL';

  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const courseFilter = courseSelect.value;
  const statusFilter = document.getElementById('status-filter').value;

  const filtered = students.filter((s) => {
    const matchesQuery =
      !query ||
      s.studentId.toLowerCase().includes(query) ||
      s.name.toLowerCase().includes(query) ||
      s.course.toLowerCase().includes(query);
    const matchesCourse = courseFilter === 'ALL' || s.course === courseFilter;
    const passed = isPassed(s);
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'PASSED' && passed) ||
      (statusFilter === 'FAILED' && !passed);
    return matchesQuery && matchesCourse && matchesStatus;
  });

  document.getElementById('table-count-label').textContent = `Showing ${filtered.length} of ${students.length} students`;

  const tbody = document.getElementById('student-table-body');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center;padding:34px;color:#64748b;">No matching student records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((s) => {
    const avg = calculateAverage(s);
    const grade = getGrade(s);
    const passed = isPassed(s);
    return `
      <tr>
        <td class="mono">${escapeHtml(s.studentId)}</td>
        <td><strong>${escapeHtml(s.name)}</strong></td>
        <td style="color:#cbd5e1">${escapeHtml(s.course)}</td>
        <td>${formatMarkCell(s.mathMarks)}</td>
        <td>${formatMarkCell(s.scienceMarks)}</td>
        <td>${formatMarkCell(s.englishMarks)}</td>
        <td class="mono"><strong>${avg.toFixed(2)}%</strong></td>
        <td><span class="grade-badge">${grade}</span></td>
        <td><span class="status-pill ${passed ? 'status-pill--pass' : 'status-pill--fail'}">${passed ? 'PASSED' : 'FAILED'}</span></td>
        <td class="text-right">
          <div class="row-actions">
            <button type="button" class="action-btn" data-action="report" data-id="${escapeHtml(s.studentId)}">Report</button>
            <button type="button" class="action-btn" data-action="marks" data-id="${escapeHtml(s.studentId)}">Marks</button>
            <button type="button" class="action-btn" data-action="edit" data-id="${escapeHtml(s.studentId)}">Edit</button>
            <button type="button" class="action-btn action-btn--danger" data-action="delete" data-id="${escapeHtml(s.studentId)}">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderReportCard() {
  const select = document.getElementById('report-student-select');
  select.innerHTML = students.map((s) =>
    `<option value="${escapeHtml(s.studentId)}">${escapeHtml(s.studentId)} — ${escapeHtml(s.name)}</option>`
  ).join('');

  if (!findStudent(selectedReportId) && students.length > 0) {
    selectedReportId = students[0].studentId;
  }

  const s = findStudent(selectedReportId);
  if (!s) {
    document.getElementById('rc-name').textContent = 'No Student Selected';
    document.getElementById('rc-course-id').textContent = 'Add a student record to inspect report card';
    document.getElementById('rc-subjects').innerHTML = '';
    return;
  }

  select.value = s.studentId;
  const avg = calculateAverage(s);
  const grade = getGrade(s);
  const passed = isPassed(s);

  document.getElementById('rc-name').textContent = s.name;
  document.getElementById('rc-course-id').textContent = `Student ID: ${s.studentId} · ${s.course}`;
  document.getElementById('rc-grade').textContent = grade;

  const statusEl = document.getElementById('rc-status');
  statusEl.textContent = passed ? 'PASSED' : 'FAILED';
  statusEl.className = `status-pill ${passed ? 'status-pill--pass' : 'status-pill--fail'}`;

  const subjectDefs = [
    { name: 'Mathematics', mark: s.mathMarks },
    { name: 'Science', mark: s.scienceMarks },
    { name: 'English', mark: s.englishMarks },
  ];

  document.getElementById('rc-subjects').innerHTML = subjectDefs.map((sub) => {
    const entered = sub.mark >= 0;
    const subPass = entered && sub.mark >= 40;
    const barW = entered ? Math.min(100, sub.mark) : 0;
    const tagClass = !entered ? 'status-pill--fail' : (subPass ? 'status-pill--pass' : 'status-pill--fail');
    const tagText = !entered ? 'PENDING' : (subPass ? 'PASS' : 'FAIL');
    return `
      <div class="subject-card">
        <div class="subject-card-head">
          <strong>${sub.name}</strong>
          <span class="status-pill ${tagClass}">${tagText}</span>
        </div>
        <div class="subject-score">${entered ? sub.mark.toFixed(1) : '—'} <small>/ 100</small></div>
        <div class="bar-track" style="margin-top:12px;">
          <div class="bar-fill" style="width:${barW}%;${entered && !subPass ? 'background:#f43f5e' : ''}"></div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('rc-average').textContent = avg.toFixed(2);
  document.getElementById('rc-percentage').textContent = `${avg.toFixed(2)}%`;
  document.getElementById('rc-grade-label').textContent = grade;
  document.getElementById('rc-rule-note').textContent =
    s.mathMarks < 0 || s.scienceMarks < 0 || s.englishMarks < 0
      ? 'Pending all 3 subject marks'
      : (passed ? 'All 3 subjects ≥ 40' : 'One or more subjects < 40');
}

function renderAll() {
  renderKPIs();
  renderCharts();
  renderFiltersAndTable();
  renderReportCard();
}

// Modals & CRUD handlers
function openStudentModal(mode, studentId = '') {
  const modal = document.getElementById('modal-student');
  const title = document.getElementById('modal-student-title');
  const modeInput = document.getElementById('student-mode');
  const idInput = document.getElementById('field-student-id');
  const nameInput = document.getElementById('field-student-name');
  const courseInput = document.getElementById('field-student-course');
  const errEl = document.getElementById('student-form-error');

  errEl.hidden = true;
  modeInput.value = mode;
  if (mode === 'edit') {
    const s = findStudent(studentId);
    if (!s) return;
    title.textContent = `Update Student — ${s.studentId}`;
    idInput.value = s.studentId;
    idInput.readOnly = true;
    nameInput.value = s.name;
    courseInput.value = s.course;
  } else {
    title.textContent = 'Add New Student';
    idInput.readOnly = false;
    idInput.value = '';
    nameInput.value = '';
    courseInput.value = 'B.Tech CSE';
  }
  modal.hidden = false;
  (mode === 'edit' ? nameInput : idInput).focus();
}

function updateMarksPreview() {
  const m = parseFloat(document.getElementById('field-math').value);
  const sc = parseFloat(document.getElementById('field-science').value);
  const en = parseFloat(document.getElementById('field-english').value);
  const temp = {
    mathMarks: Number.isNaN(m) ? -1 : m,
    scienceMarks: Number.isNaN(sc) ? -1 : sc,
    englishMarks: Number.isNaN(en) ? -1 : en,
  };
  const avg = calculateAverage(temp);
  const grade = getGrade(temp);
  const passed = isPassed(temp);
  document.getElementById('marks-live-preview').innerHTML = `
    <span>Preview Average: <strong>${avg.toFixed(2)}%</strong> · Grade <strong>${grade}</strong></span>
    <span class="status-pill ${passed ? 'status-pill--pass' : 'status-pill--fail'}">${passed ? 'PASSED' : 'FAILED'}</span>
  `;
}

function fillMarksFieldsForStudent(studentId) {
  const s = findStudent(studentId);
  document.getElementById('field-math').value = s && s.mathMarks >= 0 ? String(s.mathMarks) : '';
  document.getElementById('field-science').value = s && s.scienceMarks >= 0 ? String(s.scienceMarks) : '';
  document.getElementById('field-english').value = s && s.englishMarks >= 0 ? String(s.englishMarks) : '';
  updateMarksPreview();
}

function openMarksModal(studentId = '') {
  if (students.length === 0) {
    showToast('Add a student first before entering marks.');
    return;
  }
  const select = document.getElementById('marks-student-select');
  select.innerHTML = students.map((s) =>
    `<option value="${escapeHtml(s.studentId)}">${escapeHtml(s.studentId)} — ${escapeHtml(s.name)}</option>`
  ).join('');
  select.value = findStudent(studentId) ? studentId : students[0].studentId;
  document.getElementById('marks-form-error').hidden = true;
  fillMarksFieldsForStudent(select.value);
  document.getElementById('modal-marks').hidden = false;
}

function switchTab(tabName) {
  activeTab = tabName;
  document.querySelectorAll('.nav-tab').forEach((btn) => {
    const match = btn.dataset.tab === tabName;
    btn.classList.toggle('is-active', match);
    btn.setAttribute('aria-selected', match ? 'true' : 'false');
  });
  document.querySelectorAll('.tab-panel').forEach((panel) => {
    const match = panel.id === `tab-${tabName}`;
    panel.classList.toggle('is-active', match);
    panel.hidden = !match;
  });
}

function exportCsv() {
  const headers = ['Student ID', 'Name', 'Course', 'Math', 'Science', 'English', 'Average', 'Grade', 'Status'];
  const esc = (v) => {
    const str = String(v);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const rows = students.map((s) => [
    esc(s.studentId),
    esc(s.name),
    esc(s.course),
    esc(s.mathMarks >= 0 ? s.mathMarks : 'N/A'),
    esc(s.scienceMarks >= 0 ? s.scienceMarks : 'N/A'),
    esc(s.englishMarks >= 0 ? s.englishMarks : 'N/A'),
    esc(calculateAverage(s).toFixed(2)),
    esc(getGrade(s)),
    esc(isPassed(s) ? 'PASSED' : 'FAILED'),
  ].join(','));
  const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'vit-student-results.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exported vit-student-results.csv');
}

// Live Java CLI Console State Machine (faithful mirror of src/Main.java)
const MAIN_MENU_TEXT =
  '\n========================================\n' +
  '              MAIN MENU\n' +
  '========================================\n' +
  '1. Add Student\n' +
  '2. Update Student\n' +
  '3. Delete Student\n' +
  '4. Add Marks\n' +
  '5. View Student Report\n' +
  '6. View Pass/Fail Summary\n' +
  '7. View All Students\n' +
  '8. Exit\n' +
  '========================================\n' +
  'Enter your choice (1-8): ';

let cliState = { step: 'MENU', data: {} };

function appendCli(text) {
  const out = document.getElementById('cli-output');
  out.textContent += text;
  out.scrollTop = out.scrollHeight;
}

function resetCli() {
  const out = document.getElementById('cli-output');
  out.textContent =
    '========================================\n' +
    '  STUDENT RESULT MANAGEMENT SYSTEM\n' +
    '========================================\n' +
    'Compiled with OpenJDK 17 · Linked to live cohort\n' +
    MAIN_MENU_TEXT;
  cliState = { step: 'MENU', data: {} };
  document.getElementById('cli-prompt-label').textContent = 'choice>';
}

function handleCliCommand(raw) {
  const input = raw.trim();
  appendCli(input + '\n');

  if (input.toLowerCase() === 'menu') {
    appendCli(MAIN_MENU_TEXT);
    cliState = { step: 'MENU', data: {} };
    document.getElementById('cli-prompt-label').textContent = 'choice>';
    return;
  }

  switch (cliState.step) {
    case 'MENU': {
      const choice = Number.parseInt(input, 10);
      if (choice === 1) {
        cliState = { step: 'ADD_ID', data: {} };
        appendCli('\n--- Add Student ---\nEnter Student ID: ');
        document.getElementById('cli-prompt-label').textContent = 'id>';
      } else if (choice === 2) {
        cliState = { step: 'UPD_ID', data: {} };
        appendCli('\n--- Update Student ---\nEnter Student ID: ');
        document.getElementById('cli-prompt-label').textContent = 'id>';
      } else if (choice === 3) {
        cliState = { step: 'DEL_ID', data: {} };
        appendCli('\n--- Delete Student ---\nEnter Student ID: ');
        document.getElementById('cli-prompt-label').textContent = 'id>';
      } else if (choice === 4) {
        cliState = { step: 'MARKS_ID', data: {} };
        appendCli('\n--- Add Marks ---\nEnter Student ID: ');
        document.getElementById('cli-prompt-label').textContent = 'id>';
      } else if (choice === 5) {
        cliState = { step: 'REPORT_ID', data: {} };
        appendCli('\n--- Student Report ---\nEnter Student ID: ');
        document.getElementById('cli-prompt-label').textContent = 'id>';
      } else if (choice === 6) {
        let lines = '\n========================================\n         PASS/FAIL SUMMARY\n========================================\n';
        lines += 'Student ID   Name                 Course           Average    Grade   Status\n';
        lines += '------------------------------------------------------------------------------\n';
        let p = 0; let f = 0;
        students.forEach((s) => {
          const avg = calculateAverage(s);
          const g = getGrade(s);
          const ok = isPassed(s);
          if (ok) p++; else f++;
          lines += `${s.studentId.padEnd(12)} ${s.name.padEnd(20)} ${s.course.padEnd(16)} ${avg.toFixed(2).padStart(7)}    ${g.padEnd(5)}   ${ok ? 'PASS' : 'FAIL'}\n`;
        });
        lines += '------------------------------------------------------------------------------\n';
        lines += `Total Students: ${students.length}\nPassed: ${p}\nFailed: ${f}\n========================================\n`;
        appendCli(lines + MAIN_MENU_TEXT);
      } else if (choice === 7) {
        let lines = '\n--- All Students ---\n================================================\n';
        lines += 'Student ID   Name                 Course\n------------------------------------------------\n';
        students.forEach((s) => {
          lines += `${s.studentId.padEnd(12)} ${s.name.padEnd(20)} ${s.course}\n`;
        });
        lines += `================================================\nTotal: ${students.length} students\n`;
        appendCli(lines + MAIN_MENU_TEXT);
      } else if (choice === 8) {
        appendCli('\nThank you for using Student Result Management System!\nGoodbye!\n(Type "menu" to restart session)\n');
        cliState = { step: 'EXITED', data: {} };
        document.getElementById('cli-prompt-label').textContent = '$';
      } else {
        appendCli('Invalid choice! Please enter 1-8.' + MAIN_MENU_TEXT);
      }
      break;
    }

    case 'ADD_ID':
      cliState.data.id = input;
      cliState.step = 'ADD_NAME';
      appendCli('Enter Student Name: ');
      document.getElementById('cli-prompt-label').textContent = 'name>';
      break;

    case 'ADD_NAME':
      cliState.data.name = input;
      cliState.step = 'ADD_COURSE';
      appendCli('Enter Course: ');
      document.getElementById('cli-prompt-label').textContent = 'course>';
      break;

    case 'ADD_COURSE':
      if (addStudentRecord(cliState.data.id, cliState.data.name, input)) {
        appendCli('Student added successfully!\n' + MAIN_MENU_TEXT);
        renderAll();
      } else {
        appendCli('Error: Student ID already exists!\n' + MAIN_MENU_TEXT);
      }
      cliState = { step: 'MENU', data: {} };
      document.getElementById('cli-prompt-label').textContent = 'choice>';
      break;

    case 'UPD_ID': {
      const found = findStudent(input);
      if (!found) {
        appendCli('Error: Student not found!\n' + MAIN_MENU_TEXT);
        cliState = { step: 'MENU', data: {} };
        document.getElementById('cli-prompt-label').textContent = 'choice>';
      } else {
        cliState = { step: 'UPD_CHOICE', data: { id: found.studentId } };
        appendCli('1. Update Name\n2. Update Course\nEnter choice: ');
        document.getElementById('cli-prompt-label').textContent = 'upd>';
      }
      break;
    }

    case 'UPD_CHOICE':
      if (input === '1' || input === '2') {
        cliState.data.mode = input;
        cliState.step = 'UPD_VAL';
        appendCli(input === '1' ? 'Enter new Name: ' : 'Enter new Course: ');
        document.getElementById('cli-prompt-label').textContent = 'val>';
      } else {
        appendCli('Invalid choice!\n' + MAIN_MENU_TEXT);
        cliState = { step: 'MENU', data: {} };
        document.getElementById('cli-prompt-label').textContent = 'choice>';
      }
      break;

    case 'UPD_VAL':
      if (cliState.data.mode === '1') updateStudentRecord(cliState.data.id, input, '');
      else updateStudentRecord(cliState.data.id, '', input);
      appendCli('Updated successfully!\n' + MAIN_MENU_TEXT);
      renderAll();
      cliState = { step: 'MENU', data: {} };
      document.getElementById('cli-prompt-label').textContent = 'choice>';
      break;

    case 'DEL_ID': {
      const found = findStudent(input);
      if (!found) {
        appendCli('Error: Student not found!\n' + MAIN_MENU_TEXT);
        cliState = { step: 'MENU', data: {} };
        document.getElementById('cli-prompt-label').textContent = 'choice>';
      } else {
        cliState = { step: 'DEL_CONFIRM', data: { id: found.studentId } };
        appendCli(`Student: ${found.studentId} (${found.name})\nAre you sure? (yes/no): `);
        document.getElementById('cli-prompt-label').textContent = 'confirm>';
      }
      break;
    }

    case 'DEL_CONFIRM':
      if (input.toLowerCase() === 'yes') {
        deleteStudentRecord(cliState.data.id);
        appendCli('Student deleted successfully!\n' + MAIN_MENU_TEXT);
        renderAll();
      } else {
        appendCli('Deletion cancelled.\n' + MAIN_MENU_TEXT);
      }
      cliState = { step: 'MENU', data: {} };
      document.getElementById('cli-prompt-label').textContent = 'choice>';
      break;

    case 'MARKS_ID': {
      const found = findStudent(input);
      if (!found) {
        appendCli('Error: Student not found!\n' + MAIN_MENU_TEXT);
        cliState = { step: 'MENU', data: {} };
        document.getElementById('cli-prompt-label').textContent = 'choice>';
      } else {
        cliState = { step: 'MARKS_SUBJ', data: { id: found.studentId } };
        appendCli('Subjects: Math, Science, English\nEnter Subject: ');
        document.getElementById('cli-prompt-label').textContent = 'subject>';
      }
      break;
    }

    case 'MARKS_SUBJ':
      cliState.data.subject = input;
      cliState.step = 'MARKS_VAL';
      appendCli('Enter Marks (0-100): ');
      document.getElementById('cli-prompt-label').textContent = 'marks>';
      break;

    case 'MARKS_VAL': {
      const val = Number.parseFloat(input);
      if (addSubjectMark(cliState.data.id, cliState.data.subject, val)) {
        appendCli('Marks added successfully!\n' + MAIN_MENU_TEXT);
        renderAll();
      } else {
        appendCli('Error: Invalid marks or subject!\n' + MAIN_MENU_TEXT);
      }
      cliState = { step: 'MENU', data: {} };
      document.getElementById('cli-prompt-label').textContent = 'choice>';
      break;
    }

    case 'REPORT_ID': {
      const s = findStudent(input);
      if (!s) {
        appendCli('Error: Student not found!\n' + MAIN_MENU_TEXT);
      } else {
        const avg = calculateAverage(s);
        let out = '\n========================================\n        STUDENT RESULT REPORT\n========================================\n';
        out += `Student ID: ${s.studentId}\nName: ${s.name}\nCourse: ${s.course}\n----------------------------------------\n`;
        if (s.mathMarks >= 0) out += `Math: ${s.mathMarks}\n`;
        if (s.scienceMarks >= 0) out += `Science: ${s.scienceMarks}\n`;
        if (s.englishMarks >= 0) out += `English: ${s.englishMarks}\n`;
        out += `----------------------------------------\nAverage: ${avg.toFixed(2)}\nGrade: ${getGrade(s)}\nStatus: ${isPassed(s) ? 'PASSED' : 'FAILED'}\n========================================\n`;
        appendCli(out + MAIN_MENU_TEXT);
      }
      cliState = { step: 'MENU', data: {} };
      document.getElementById('cli-prompt-label').textContent = 'choice>';
      break;
    }

    case 'EXITED':
      appendCli('Session ended. Type "menu" to restart.\n');
      break;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  resetCli();

  // Tabs
  document.querySelectorAll('.nav-tab').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Filters
  document.getElementById('search-input').addEventListener('input', renderFiltersAndTable);
  document.getElementById('course-filter').addEventListener('change', renderFiltersAndTable);
  document.getElementById('status-filter').addEventListener('change', renderFiltersAndTable);

  // Header buttons
  document.getElementById('btn-open-add').addEventListener('click', () => openStudentModal('add'));
  document.getElementById('btn-open-marks').addEventListener('click', () => openMarksModal(selectedReportId));
  document.getElementById('btn-export-csv').addEventListener('click', exportCsv);
  document.getElementById('btn-reset-demo').addEventListener('click', () => {
    students = structuredClone(DEFAULT_STUDENTS);
    selectedReportId = students[0].studentId;
    saveStudents();
    renderAll();
    showToast('Restored default 6 VIT student records.');
  });

  // Table row actions
  document.getElementById('student-table-body').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === 'report') {
      selectedReportId = id;
      renderReportCard();
      switchTab('report');
    } else if (action === 'marks') {
      openMarksModal(id);
    } else if (action === 'edit') {
      openStudentModal('edit', id);
    } else if (action === 'delete') {
      if (deleteStudentRecord(id)) {
        renderAll();
        showToast(`Deleted student ${id}`);
      }
    }
  });

  // Report selector & buttons
  document.getElementById('report-student-select').addEventListener('change', (e) => {
    selectedReportId = e.target.value;
    renderReportCard();
  });
  document.getElementById('btn-report-edit-marks').addEventListener('click', () => openMarksModal(selectedReportId));
  document.getElementById('btn-print-report').addEventListener('click', () => window.print());

  // Modal close buttons
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.closeModal).hidden = true;
    });
  });

  // Student add/edit form
  document.getElementById('form-student').addEventListener('submit', (e) => {
    e.preventDefault();
    const mode = document.getElementById('student-mode').value;
    const id = document.getElementById('field-student-id').value.trim();
    const name = document.getElementById('field-student-name').value.trim();
    const course = document.getElementById('field-student-course').value.trim();
    const errEl = document.getElementById('student-form-error');

    if (!id || !name || !course) {
      errEl.textContent = 'All fields are required.';
      errEl.hidden = false;
      return;
    }

    if (mode === 'add') {
      if (!addStudentRecord(id, name, course)) {
        errEl.textContent = `Student ID "${id}" already exists.`;
        errEl.hidden = false;
        return;
      }
      selectedReportId = id;
      showToast(`Added student ${id} (${name})`);
    } else {
      updateStudentRecord(id, name, course);
      showToast(`Updated student ${id}`);
    }

    document.getElementById('modal-student').hidden = true;
    renderAll();
  });

  // Marks modal
  document.getElementById('marks-student-select').addEventListener('change', (e) => {
    fillMarksFieldsForStudent(e.target.value);
  });
  ['field-math', 'field-science', 'field-english'].forEach((id) => {
    document.getElementById(id).addEventListener('input', updateMarksPreview);
  });
  document.getElementById('form-marks').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('marks-student-select').value;
    const s = findStudent(id);
    const errEl = document.getElementById('marks-form-error');
    if (!s) return;

    const parseOpt = (elId) => {
      const raw = document.getElementById(elId).value.trim();
      if (raw === '') return -1;
      const num = Number.parseFloat(raw);
      return num;
    };

    const m = parseOpt('field-math');
    const sc = parseOpt('field-science');
    const en = parseOpt('field-english');

    const bad = [m, sc, en].some((v) => v !== -1 && (Number.isNaN(v) || v < 0 || v > 100));
    if (bad) {
      errEl.textContent = 'Marks must be between 0 and 100 (or left blank if pending).';
      errEl.hidden = false;
      return;
    }

    s.mathMarks = m;
    s.scienceMarks = sc;
    s.englishMarks = en;
    saveStudents();
    selectedReportId = s.studentId;
    document.getElementById('modal-marks').hidden = true;
    renderAll();
    showToast(`Updated marks for ${s.name} (${s.studentId})`);
  });

  // CLI form & quick chips
  document.getElementById('cli-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const inputEl = document.getElementById('cli-input');
    const val = inputEl.value;
    inputEl.value = '';
    handleCliCommand(val);
  });

  document.querySelectorAll('[data-cli-cmd]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cliCmd;
      if (cmd === 'menu') {
        resetCli();
      } else {
        handleCliCommand(cmd);
      }
    });
  });
});
