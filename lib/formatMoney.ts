export default function formatMoney(price: number): string {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return `${format[0]} ${format.slice(1)}`;
}
