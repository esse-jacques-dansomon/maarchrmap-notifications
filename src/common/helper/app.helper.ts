export function generateRandomPassword() {
  //1 special char, 1 number, 1 uppercase, 1 lowercase, 8 chars
  const specialChars = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
  const numbers = '0123456789';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const all = specialChars + numbers + uppercase + lowercase;
  const getRandom = (arr: string) =>
    arr[Math.floor(Math.random() * arr.length)];
  let password =
    getRandom(specialChars) +
    getRandom(numbers) +
    getRandom(uppercase) +
    getRandom(lowercase);
  for (let i = 0; i < 4; i++) {
    password += getRandom(all);
  }
  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
}

export function generateOtp(): number {
  //4 digits
  return Math.floor(1000 + Math.random() * 9000);
}
