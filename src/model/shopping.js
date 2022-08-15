import mongoose from "mongoose";

export const Transaction_record = mongoose.model("Transaction_record", {
  email: { type: String, required: true },
  id_img: { type: String, required: true },
  url_img: { type: String, required: true },
  status: { type: String, required: true },
  //url_download: { type: String, required: true },
});

export const Transaction_status = mongoose.model("Transaction_status", {
  vci: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true },
  buy_order: { type: String, required: true },
  session_id: { type: String, required: true },
  accounting_date: { type: String, required: true },
  transaction_date: { type: Date, required: true },
  authorization_code: { type: String, required: true },
  payment_type_code: { type: String, required: true },
  response_code: { type: Number, required: true },
  installments_number: { type: Number, required: true },
});
