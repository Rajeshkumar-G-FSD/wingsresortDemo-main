export const PAYMENT_INFO = {
  bankName: 'Canara Bank',
  accountNumber: '120035597058',
  ifsc: 'CNRB0016230',
  upiId: 'cnb.705720258044@cnrb',
  payeeName: 'WINGS RESORT',
};

/** Builds a standard UPI deep-link/QR payload for the given amount and a short note. */
export const buildUpiPaymentString = (amount: number, note: string): string => {
  const params = new URLSearchParams({
    pa: PAYMENT_INFO.upiId,
    pn: PAYMENT_INFO.payeeName,
    am: amount.toFixed(2),
    cu: 'INR',
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
};
