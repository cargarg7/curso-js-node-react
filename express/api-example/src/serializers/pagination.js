// -------------------------
// parsers

const parsePage = ({ page = 0, perPage = 50 }) => ({
  page: parseInt(page, 10),
  perPage: parseInt(perPage, 10)
})

// -------------------------
// serializers

module.exports = { parsePage }
