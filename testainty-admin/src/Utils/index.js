export const formatedDate = (date) => {
    const y = new Date(date).getFullYear();
    const m = new Date(date).toLocaleString('en-US', { month: 'short' });
    const d = new Date(date).getDate();
    const formatedDate = `${d} ${m} ${y}`;

    if (isNaN(y) || isNaN(d) || !date) {
        return 'NA';
    } else {
        return formatedDate;
    }
};


export const formattedDateTime = (date) => {
    const y = new Date(date).getFullYear()
    const m = new Date(date).toLocaleString('en-US', { month: 'short' })
    const d = new Date(date).getDate()
    const formatedDate = `${d} ${m} ${y}`;
    const da = new Date(date);

    const optionsTime = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    };

    const formattedTime = da.toLocaleString('en-US', optionsTime);
    return `${formatedDate} ${formattedTime}`;
}


export const calculateTimeAgo = (date) => {
    const currentDate = new Date();
    const providedDate = new Date(date);
    const timeDifference = currentDate - providedDate;
  
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;
  
    if (timeDifference < minute) {
      return 'just now';
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      return `${minutes}m ago`;
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      return `${hours}h ago`;
    } else if (timeDifference < month) {
      const days = Math.floor(timeDifference / day);
      return `${days}d ago`;
    } else if (timeDifference < year) {
      const months = Math.floor(timeDifference / month);
      return `${months}mo ago`;
    } else {
      const years = Math.floor(timeDifference / year);
      return `${years}y ago`;
    }
  };