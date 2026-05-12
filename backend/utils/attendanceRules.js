const getMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

exports.calculateAttendance = ({
  requiredTimeIn,
  timeIn,
  timeOut,
  hourlyRate,
}) => {
  const requiredMinutes = getMinutes(requiredTimeIn);
  const inMinutes = getMinutes(timeIn);
  const outMinutes = getMinutes(timeOut);

  const lateMinutes = Math.max(0, inMinutes - requiredMinutes);

  if (lateMinutes >= 90) {
    return {
      totalHours: 0,
      grossPay: 0,
      lateMinutes,
      lateDeduction: 0,
      remarks: "Absent",
    };
  }

  const totalHours = Math.max(0, (outMinutes - inMinutes) / 60);
  const grossPay = totalHours * hourlyRate;
  const lateDeduction = (lateMinutes / 60) * hourlyRate;

  return {
    totalHours: Number(totalHours.toFixed(2)),
    grossPay: Number(grossPay.toFixed(2)),
    lateMinutes,
    lateDeduction: Number(lateDeduction.toFixed(2)),
    remarks: lateMinutes > 0 ? "Late" : "Present",
  };
};