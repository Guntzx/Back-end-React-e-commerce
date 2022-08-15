import { WebpayPlus } from "transbank-sdk";
import { Image } from "../model/img";
import { Transaction_record } from "../model/shopping";

export const SaveImg = async (req, res) => {
  try {
    const { email } = req.user;
    const { img_id, img_url, img_description } = req.body;

    const isImg = await Image.findOne({ img_id: img_id });

    if (isImg) {
      res.status(400).json({ message: "Esta imagen ya esta guardada" });
    } else {
      await Image.create({
        user_email: email,
        img_id: img_id,
        img_url: img_url,
        img_description: img_description,
      });

      res.status(200).json({ message: "Imagen guardada" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).send(e.message);
  }
};

export const BuyImg = async (req, res) => {
  try {
    const { email } = req.user;
    const { buyOrder, amount, returnUrl, ObjectBuy, img_download } = req.body;
    const sessionId = email;

    await Transaction_record.create({
      email: email,
      id_img: buyOrder,
      url_img: ObjectBuy,
      status: "NOTBUY",
      //url_download: img_download,
    });

    const createResponse = await new WebpayPlus.Transaction().create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    return res.status(200).json(createResponse);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Ocurrio un error: " + e.message });
  }
};

export const GetSaveImg = async (req, res) => {
  try {
    const { email } = req.user;

    const images = await Image.find({ email: email });

    if (!images) {
      res.status(404).json({ message: "Aun no guardas imagenes" });
    }

    res.status(200).json(images);
  } catch (e) {
    console.error(e);
    return res.status(500).json(e.message);
  }
};

export const GetBuyImage = async (req, res) => {
  try {
    const { email } = req.user;

    const images_buy = await Transaction_record.find({
      email: email,
      status: "AUTHORIZED",
    });

    res.status(200).json(images_buy);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Ocurrio un error: " + e.message });
  }
};
