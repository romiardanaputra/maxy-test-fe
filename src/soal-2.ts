const questTwoInputPrompt = require("prompt-sync")();

type SecondQuestProps = {
  totalItem: number;
  totalMoney: number;
};

const cashier = ({ totalItem, totalMoney }: SecondQuestProps) => {
  const denominations = [
    100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100,
  ];
  const totalCost = totalItem;
  let change = totalMoney - totalCost;
  if (change < 0) {
    return false;
  }
  const roundedChange = Math.round(change / 100) * 100;
  const changeBreakdown: { [key: number]: number } = {};

  let remainingChange = roundedChange;
  for (const denomination of denominations) {
    if (remainingChange >= denomination) {
      changeBreakdown[denomination] = Math.floor(
        remainingChange / denomination
      );
      remainingChange %= denomination;
    }
  }

  return { change, roundedChange, changeBreakdown };
};

const totalBelanja = parseFloat(
  questTwoInputPrompt("Masukkan total belanja: ").replace(/,/g, "")
);
const jumlahDibayar = parseFloat(
  questTwoInputPrompt("Masukkan jumlah uang yang dibayarkan: ").replace(
    /,/g,
    ""
  )
);

const resultQuestionTwo = cashier({
  totalItem: totalBelanja,
  totalMoney: jumlahDibayar,
});

if (resultQuestionTwo === false) {
  console.log("Jumlah uang yang dibayarkan kurang dari total belanja.");
} else {
  const { change, roundedChange, changeBreakdown } = resultQuestionTwo;
  console.log(
    `Kembalian yang harus diberikan kasir: ${change.toLocaleString(
      "id-ID"
    )}, dibulatkan menjadi ${roundedChange.toLocaleString("id-ID")}`
  );
  let output = "Pecahan uang:\n";
  for (let pecahan of Object.keys(changeBreakdown).map(Number)) {
    if (changeBreakdown[pecahan]) {
      output += `${changeBreakdown[pecahan]} x Rp.${pecahan.toLocaleString(
        "id-ID"
      )}\n`;
    }
  }
  console.log(output);
}
