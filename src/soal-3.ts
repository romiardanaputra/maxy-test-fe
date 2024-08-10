const questionThreeInputPrompt = require("prompt-sync")();

function isValidString(input: string): boolean {
  if (input.length < 1 || input.length > 4096) {
    return false;
  }

  const stack: string[] = [];
  const openingBrackets = ["<", "{", "["];
  const closingBrackets = [">", "}", "]"];
  const matchingBrackets: { [key: string]: string } = {
    ">": "<",
    "}": "{",
    "]": "[",
  };

  for (let char of input) {
    if (openingBrackets.includes(char)) {
      stack.push(char);
    } else if (closingBrackets.includes(char)) {
      if (stack.length === 0 || stack.pop() !== matchingBrackets[char]) {
        return false;
      }
    } else {
      return false;
    }
  }

  return stack.length === 0;
}

const userInput = questionThreeInputPrompt(
  "Masukkan string yang akan divalidasi: "
);
const isValid = isValidString(userInput);

console.log(
  `String "${userInput}" adalah ${isValid ? "valid" : "tidak valid"}.`
);
