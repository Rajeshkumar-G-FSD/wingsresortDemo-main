// Web3Forms — sends the booking confirmation email straight from the browser, no backend/SMTP needed.
// The access key is a public "site key" by design (same model as reCAPTCHA), safe to ship in client code;
// Web3Forms routes submissions using it to whatever inbox was configured when the key was created.
const WEB3FORMS_ACCESS_KEY = 'd5910521-0d0b-4742-afae-9ae9faa3a42c';

export interface BookingEnquiryEmailParams {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
  subject: string;
}

/**
 * Fire-and-forget: submits the booking details to Web3Forms, which emails them to the resort's inbox.
 * Uses FormData (not a JSON body) deliberately — a JSON `Content-Type` triggers a CORS preflight that
 * Web3Forms' endpoint doesn't answer for browser requests, so the submission fails silently.
 */
export const sendBookingEnquiryEmail = async (params: BookingEnquiryEmailParams): Promise<void> => {
  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  formData.append('subject', params.subject);
  formData.append('name', params.name);
  formData.append('email', params.email || 'not-provided@wingsresort.com');
  formData.append('phone', params.phone);
  formData.append('check_in', params.checkIn);
  formData.append('check_out', params.checkOut);
  formData.append('guests', String(params.guests));
  formData.append('message', params.message);

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.message || 'Web3Forms submission failed');
};
