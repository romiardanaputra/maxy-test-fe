const questionOneInputPrompt = require("prompt-sync")();

type QuestOneProps = {
  strings: string[];
  N: number;
};

const findMatchStrings = ({
  N,
  strings,
}: QuestOneProps): [number, number] | false => {
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (strings[i].toLowerCase() === strings[j].toLowerCase()) {
        return [i + 1, j + 1];
      }
    }
  }
  return false;
};

const N = parseInt(
  questionOneInputPrompt("Masukkan jumlah string: ") as string,
  10
);
const strings: string[] = [];

for (let i = 0; i < N; i++) {
  strings.push(
    questionOneInputPrompt(`Masukkan string ke-${i + 1}: `) as string
  );
}

const testProps: QuestOneProps = {
  N,
  strings,
};

const resultQuestOne = findMatchStrings(testProps);

if (result) {
  console.log("String yang cocok ditemukan pada indeks:", result);
} else {
  console.log("Tidak ada string yang cocok.");
}
