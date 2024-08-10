const questionFourInputPrompt = require("prompt-sync")();

type questionFourProps = {
  joinDate: string;
  plannedLeaveDate: string;
  leaveDuration: number;
  publicHolidays: number;
};

function canTakeLeave({
  joinDate,
  plannedLeaveDate,
  leaveDuration,
  publicHolidays,
}: questionFourProps): { canTake: boolean; reason: string } {
  const totalAnnualLeave = 14;
  const probationPeriodDays = 180;
  const maxConsecutiveLeaveDays = 3;

  const joinDateObj = new Date(joinDate);
  const plannedLeaveDateObj = new Date(plannedLeaveDate);

  const probationEndDate = new Date(joinDateObj);
  probationEndDate.setDate(probationEndDate.getDate() + probationPeriodDays);

  if (plannedLeaveDateObj < probationEndDate) {
    return {
      canTake: false,
      reason: "Belum 180 hari sejak tanggal join karyawan",
    };
  }

  const endOfYear = new Date(joinDateObj.getFullYear(), 11, 31);
  const daysAfterProbation = Math.floor(
    (endOfYear.getTime() - probationEndDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const personalLeaveDays = Math.floor(
    (daysAfterProbation / 365) * (totalAnnualLeave - publicHolidays)
  );

  if (leaveDuration > maxConsecutiveLeaveDays) {
    return {
      canTake: false,
      reason: "Durasi cuti pribadi melebihi 3 hari berturutan",
    };
  }

  if (leaveDuration > personalLeaveDays) {
    return {
      canTake: false,
      reason: `Jumlah cuti pribadi yang tersedia hanya ${personalLeaveDays} hari`,
    };
  }

  return {
    canTake: true,
    reason: "Karyawan boleh mengambil cuti pribadi",
  };
}

const publicHolidays = parseInt(
  questionFourInputPrompt("Masukkan jumlah cuti bersama: ")
);
const joinDate = questionFourInputPrompt(
  "Masukkan tanggal join karyawan (YYYY-MM-DD): "
);
const plannedLeaveDate = questionFourInputPrompt(
  "Masukkan tanggal rencana cuti (YYYY-MM-DD): "
);
const leaveDuration = parseInt(
  questionFourInputPrompt("Masukkan durasi cuti (hari): ")
);

const result = canTakeLeave({
  joinDate,
  plannedLeaveDate,
  leaveDuration,
  publicHolidays,
});
console.log(result.canTake);
console.log(result.reason);
