import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
export async function mp3Converter(req, res, next) {
  const { url } = req.body;
  if (url == "" || url == undefined || url == null) {
    console.log(`URL IS require : ${url}`);
    return res
      .status(203)
      .json({ message: "please end video URL", errror: true });
  } else {
    console.log(`URL IS require : ${url}`);

    const fetchApi = await fetch(
      "https://youtube-mp310.p.rapidapi.com/download/mp3?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dphd1U2JIfUA",
      {
        method: "GET",
        qs: {
          url: `${url}`,
        },
        headers: {
          "x-rapidapi-key":
            "f92dd96b78msh2fd6bbbfcc4b0f8p12db18jsnec65f65af6fb",
          "x-rapidapi-host": "youtube-mp310.p.rapidapi.com",
        },
      }
    );

    const fetchResponse = await fetchApi.json();
    if (fetchResponse == "ok") {
      console.log(fetchResponse);
      return res.status(200).json({
        message: "success",
        errror: false,
        song_tittle: fetchResponse.title,
        song_link: fetchResponse.link,
      });
    } else {
      console.log(fetchResponse);
      return res.status(203).json({ finalUrl: fetchResponse, errror: true });
    }
  }
}
