const getBenefits = async (_, args, { vtex: ioContext }) => {
  // MOCK
  return [
    {
      name: "get-headphone",
      isActive: true,
      campaigns: [{ name: "black-friday" }],
      effectType: "Gift"
    },
    {
      name: "50-percent-off",
      isActive: true,
      campaigns: [],
      effectType: "Price"
    },
    {
      name: "90-percent-off",
      isActive: true,
      campaigns: [{ name: "black-friday" }],
      effectType: "Price"
    },
    {
      name: "free-shipping",
      isActive: false,
      campaigns: [{ name: "black-friday" }],
      effectType: "Shipping"
    }
  ];
}

export default getBenefits