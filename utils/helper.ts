export function formatTime(minutes: number): string {
  if (isNaN(minutes) || minutes < 0) {
    throw new Error("Invalid input. Please provide a non-negative number.");
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedTime = `${hours}h ${remainingMinutes}m`;

  return formattedTime;
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount)) {
    throw new Error("Invalid input. Please provide a valid number.");
  }

  const formattedCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);

  return formattedCurrency;
}

export const years = Array.from(
  { length: 124 },
  (_, index) => new Date().getFullYear() - index,
);
