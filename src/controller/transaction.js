import { WebpayPlus } from "transbank-sdk";
import { Transaction_status, Transaction_record } from "../model/shopping";
import { Image } from "../model/img";

export const confirm_transaction = async (req, res) => {
  try {
    const { token_ws } = req.query;

    const confirm_transaction = await new WebpayPlus.Transaction().commit(
      token_ws
    );

    await Transaction_status.create({
      vci: confirm_transaction.vci,
      amount: confirm_transaction.amount,
      status: confirm_transaction.status,
      buy_order: confirm_transaction.buy_order,
      session_id: confirm_transaction.session_id,
      accounting_date: confirm_transaction.accounting_date,
      transaction_date: confirm_transaction.transaction_date,
      authorization_code: confirm_transaction.authorization_code,
      payment_type_code: confirm_transaction.payment_type_code,
      response_code: confirm_transaction.response_code,
      installments_number: confirm_transaction.installments_number,
    });

    await Transaction_record.updateOne(
      { id_img: confirm_transaction.buy_order },
      { status: confirm_transaction.status }
    );

    await Image.deleteOne({ img_id: confirm_transaction.buy_order })

    const img_user = await Transaction_record.findOne({
      id_img: confirm_transaction.buy_order,
    });

    res.redirect(
      `http://localhost:3000/Status?status=${confirm_transaction.status}&amount=${confirm_transaction.amount}&date=${confirm_transaction.transaction_date}&img_url=${img_user.url_img}&img_id=${confirm_transaction.buy_order}`
    );
  } catch (e) {
    console.error(e);
    return res.status(500).send(e.message);
  }
};
