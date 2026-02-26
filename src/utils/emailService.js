// Simple email service adapter. Configure an HTTPS endpoint that accepts {to, subject, html, text}
// Set VITE_ORDER_EMAIL_WEBHOOK_URL in your env to enable sending.

export const buildOrderEmail = (order) => {
  const { id, items = [], totals = {}, shipping = {}, paymentMethod, placedAt } = order || {};
  const subject = `Your ReetRiwaaz order ${id} is confirmed`;
  const rows = items
    .map(
      (it) =>
        `<tr><td style="padding:6px 0">${it.name} × ${it.qty || 1}${
          it.fitType === "custom" ? " <span style='color:#16a34a'>(Custom fit)</span>" : ""
        }</td><td style="padding:6px 0; text-align:right">₹${(it.priceValue * (it.qty || 1)).toLocaleString()}</td></tr>`
    )
    .join("");
  const html = `
  <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif; max-width:640px; margin:auto">
    <h2>Order Confirmed 🎉</h2>
    <p>Thanks for shopping with ReetRiwaaz. Your order <strong>${id}</strong> has been placed on ${
      placedAt ? new Date(placedAt).toLocaleString() : ""
    }.</p>
    <h3>Items</h3>
    <table style="width:100%; border-collapse:collapse">${rows}</table>
    <hr/>
    <table style="width:100%; border-collapse:collapse">
      <tr><td>Subtotal</td><td style="text-align:right">₹${(totals.subtotal || 0).toLocaleString()}</td></tr>
      <tr><td>Alteration charges</td><td style="text-align:right">₹${(totals.alterationTotal || 0).toLocaleString()}</td></tr>
      <tr><td>Tax</td><td style="text-align:right">₹${(totals.taxAmount || 0).toLocaleString()}</td></tr>
      <tr><td style="font-weight:700">Total</td><td style="text-align:right; font-weight:700">₹${(totals.grandTotal || 0).toLocaleString()}</td></tr>
    </table>
    <p><strong>Payment:</strong> ${String(paymentMethod || "").toUpperCase()}</p>
    ${
      shipping
        ? `<h3>Shipping Address</h3><p>${
            shipping.firstName || ""
          } ${shipping.lastName || ""}<br/>${shipping.address || ""}<br/>${shipping.city || ""}, ${
            shipping.state || ""
          } - ${shipping.pincode || ""}<br/>Phone: ${shipping.phone || ""}</p>`
        : ""
    }
    <p style="color:#6b7280; font-size:12px">This is an automated email. Do not reply.</p>
  </div>`;
  const text = `Order ${id} confirmed. Total: ₹${(totals.grandTotal || 0).toLocaleString()}`;
  return { subject, html, text };
};

export const sendOrderEmail = async ({ to, order }) => {
  try {
    const url = import.meta.env.VITE_ORDER_EMAIL_WEBHOOK_URL;
    if (!url) {
      console.warn("Email webhook URL not configured (VITE_ORDER_EMAIL_WEBHOOK_URL)");
      return;
    }
    const { subject, html, text } = buildOrderEmail(order);
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, html, text, order }),
    });
  } catch (e) {
    console.error("Failed to send order email", e);
  }
};
