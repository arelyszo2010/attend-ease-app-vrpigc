
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatDisplayDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const formatWeekRange = (startDate: Date, endDate: Date): string => {
  const start = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const end = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  return `${start} - ${end}`;
};

export const getCurrentWeek = (): { startDate: Date; endDate: Date; days: Date[] } => {
  const today = new Date();
  const currentDay = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
  
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    days.push(day);
  }
  
  const endDate = new Date(monday);
  endDate.setDate(monday.getDate() + 6);
  
  return {
    startDate: monday,
    endDate,
    days,
  };
};

export const getWeekOffset = (offset: number): { startDate: Date; endDate: Date; days: Date[] } => {
  const currentWeek = getCurrentWeek();
  const startDate = new Date(currentWeek.startDate);
  startDate.setDate(startDate.getDate() + (offset * 7));
  
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    days.push(day);
  }
  
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  
  return {
    startDate,
    endDate,
    days,
  };
};

export const getDayName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};
