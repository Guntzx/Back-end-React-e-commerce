import { Image } from "../model/img";

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

};

export const GetSaveImg = async (req, res) => {
    try {
        const { email } = req.user;

        const images = await Image.find({ email: email })
        
        if(!images) {
            res.status(404).json({ message: "Aun no guardas imagenes"})
        }
        
        res.status(200).json(images)
    } catch (e) {
        console.error(e);
        return res.status(500).json(e.message)
    }
};
