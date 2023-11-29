exports.cityList = (req, res) => {
  let arr = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Kolkata",
    "Chennai",
    "Ahmedabad",
    "Hyderabad",
    "Pune",
    "Surat",
    "Kanpur",
    "Jaipur",
    "Lucknow",
    "Nagpur",
    "Indore",
    "Patna",
    "Bhopal",
    "Ludhiana",
    "Tirunelveli",
    "Agra",
    "Vadodara",
  ];

  res.status(200).json({
    success: true,
    message: "city list",
    data: arr,
  });
};
