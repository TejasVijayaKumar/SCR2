// Elements
const calendar1Title = document.getElementById('calendar1-title');
const calendar2Title = document.getElementById('calendar2-title');
const calendar1Grid = document.getElementById('calendar1-grid');
const calendar2Grid = document.getElementById('calendar2-grid');
const currentMonthYear = document.getElementById('currentMonthYear');

const prevYearBtn = document.getElementById('prevYearBtn');
const nextYearBtn = document.getElementById('nextYearBtn');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const nextBtn = document.getElementById('nextBtn');
const output = document.getElementById('output');

// State Variables
let selectedDates = [];
let currentDate = new Date();
let displayYear = currentDate.getFullYear();
let displayMonth = currentDate.getMonth();

// Month Names
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Day Names
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Function to generate calendar grid
const generateCalendar = (year, month, calendarGrid, calendarTitle) => {
  // Clear previous cells
  calendarGrid.innerHTML = '';

  // Set calendar title
  calendarTitle.textContent = `${monthNames[month]} ${year}`;

  // Add day names
  dayNames.forEach(day => {
    const dayNameDiv = document.createElement('div');
    dayNameDiv.classList.add('day-name');
    dayNameDiv.textContent = day;
    calendarGrid.appendChild(dayNameDiv);
  });

  // First day of the month
  const firstDay = new Date(year, month, 1).getDay();

  // Number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add blank cells for days before the first day
  for (let i = 0; i < firstDay; i++) {
    const blankDiv = document.createElement('div');
    calendarGrid.appendChild(blankDiv);
  }

  // Add day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.textContent = day;

    // Format date as YYYY-M-D
    const dateStr = `${year}-${month + 1}-${day}`;
    dayDiv.dataset.date = dateStr;

    // Highlight if selected
    if (selectedDates.includes(dateStr)) {
      dayDiv.classList.add('selected');
    }

    // Click event to toggle selection
    dayDiv.addEventListener('click', () => toggleDateSelection(dateStr, dayDiv));

    calendarGrid.appendChild(dayDiv);
  }
};

// Function to toggle date selection
const toggleDateSelection = (dateStr, dayDiv) => {
  if (selectedDates.includes(dateStr)) {
    // Deselect
    selectedDates = selectedDates.filter(date => date !== dateStr);
    dayDiv.classList.remove('selected');
  } else {
    // Select
    selectedDates.push(dateStr);
    dayDiv.classList.add('selected');
  }
};

// Function to update both calendars
const updateCalendars = () => {
  // Current Calendar
  generateCalendar(displayYear, displayMonth, calendar1Grid, calendar1Title);

  // Next Calendar
  let nextMonth = displayMonth + 1;
  let nextYear = displayYear;
  if (nextMonth > 11) {
    nextMonth = 0;
    nextYear += 1;
  }
  generateCalendar(nextYear, nextMonth, calendar2Grid, calendar2Title);

  // Update currentMonthYear display
  currentMonthYear.textContent = `${monthNames[displayMonth]} ${displayYear} & ${monthNames[nextMonth]} ${nextYear}`;
};

// Navigation Functions
const goToPreviousMonth = () => {
  displayMonth--;
  if (displayMonth < 0) {
    displayMonth = 11;
    displayYear--;
  }
  updateCalendars();
};

const goToNextMonth = () => {
  displayMonth++;
  if (displayMonth > 11) {
    displayMonth = 0;
    displayYear++;
  }
  updateCalendars();
};

const goToPreviousYear = () => {
  displayYear--;
  updateCalendars();
};

const goToNextYear = () => {
  displayYear++;
  updateCalendars();
};

// Event Listeners for Navigation
prevMonthBtn.addEventListener('click', goToPreviousMonth);
nextMonthBtn.addEventListener('click', goToNextMonth);
prevYearBtn.addEventListener('click', goToPreviousYear);
nextYearBtn.addEventListener('click', goToNextYear);

// "Next" Button Click Handler
nextBtn.addEventListener('click', () => {
  if (selectedDates.length === 0) {
    alert('Please select at least one date.');
  } else {
    output.textContent = `You selected: ${selectedDates.join(', ')}`;
  }
});

// Initial Calendar Rendering
updateCalendars();
