type Props = {
  strings: string[];
  N: number;
};

const findMatchStrings = ({ N, strings }: Props): [number, number] | false => {
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (strings[i].toLowerCase() === strings[j].toLowerCase()) {
        return [i + 1, j + 1];
      }
    }
  }
  return false;
};

const testProps: Props = {
  N: 5,
  strings: ["apple", "banana", "APPLE", "cherry", "Banana"],
};

const result = findMatchStrings(testProps);

if (result) {
  console.log("String yang cocok ditemukan pada indeks:", result);
} else {
  console.log("Tidak ada string yang cocok.");
}
