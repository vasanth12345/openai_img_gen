const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const genImg = async (req, res) => {
  const { prompt, size, count } = req.body;

  let imgSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "512x512";

  try {
    const response = await openai.createImage({
      prompt,
      n: parseInt(count),
      size: imgSize,
    });
    const image_url = response.data.data[0].url;
    console.log(response.data.data);
    const morImg = response.data.data;
    res.status(200).json({
      success: true,
      data: image_url,
      more: morImg,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: "error comes up. img could not be generated",
    });
  }
  //   res.status(200).json({
  //     success: true,
  //   });
};

module.exports = { genImg };
