const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

exports.calculateAttendance = ({
  requiredTimeIn,
  timeIn,
  timeOut,
  hourlyRate,
}) => {
  const requiredMinutes = timeToMinutes(requiredTimeIn);
  const inMinutes = timeToMinutes(timeIn);
  const outMinutes = timeToMinutes(timeOut);

  const lateMinutes = Math.max(inMinutes - requiredMinutes, 0);

  if (lateMinutes >= 90) {
    return {
      totalHours: 0,
      lateMinutes,
      lateHours: 0,
      grossPay: 0,
      lateDeduction: 0,
      remarks: "Absent",
    };
  }

  const workedMinutes = Math.max(outMinutes - inMinutes, 0);
  const totalHours = Number((workedMinutes / 60).toFixed(2));
  const lateHours = Number((lateMinutes / 60).toFixed(2));
  const grossPay = Number((totalHours * hourlyRate).toFixed(2));
  const lateDeduction = Number((lateHours * hourlyRate).toFixed(2));

  return {
    totalHours,
    lateMinutes,
    lateHours,
    grossPay,
    lateDeduction,
    remarks: lateMinutes > 0 ? "Late" : "Present",
  };
};