function formatRupiah(value) {
  if (!value && value !== 0) return '-'

  return `Rp ${Number(value).toLocaleString('id-ID')}`
}

function formatDate(date) {
  if (!date) return '-'

  return new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

module.exports = {
  formatRupiah,
  formatDate
}