document.addEventListener("DOMContentLoaded", () => {
  const taxToggle = document.getElementById("taxToggle");
  const priceEls = document.querySelectorAll(".base-price");
  const gstEls = document.querySelectorAll(".tax-info");

  if (!taxToggle) return;

  taxToggle.addEventListener("change", () => {
    priceEls.forEach((el, index) => {
      const base = parseFloat(el.dataset.base);
      const priceWithGST = Math.round(base * 1.18);

      if (taxToggle.checked) {
        el.innerHTML = `₹${priceWithGST.toLocaleString("en-IN")} <span class="night-label">/night</span>`;
        gstEls[index].classList.remove("d-none");
      } else {
        el.innerHTML = `₹${base.toLocaleString("en-IN")} <span class="night-label">/night</span>`;
        gstEls[index].classList.add("d-none");
      }
    });
  });
});
module.exports.index = async (req, res) => {
  const { q } = req.query;
  let allListings;
  if (q) {
    allListings = await Listing.find({
      location: { $regex: q, $options: 'i' },
    });
  } else {
    allListings = await Listing.find({});
  }
  res.render("listings/index", { allListings });
};

