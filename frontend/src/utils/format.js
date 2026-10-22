export const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value));

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
};
// Kalau image_url sudah URL lengkap, pakai langsung.
// Kalau cuma nama file, fallback ke folder lokal /images/.
export function getImageSrc(imageUrl) {
  if (!imageUrl) return null;
  return /^https?:\/\//i.test(imageUrl) ? imageUrl : `/images/${imageUrl}`;
}
