import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();
export async function mp3Converter(req, res, next) {
  const { videoId } = req.body;
  console.log(videoId, "this is ID");
  if (videoId == "" || videoId == undefined || videoId == null) {
    console.log(`videoId IS require : ${videoId}`);
    return res
      .status(203)
      .json({ message: "please end video videoId", errror: true });
  } else {
    console.log(`videoId IS require : ${videoId}`);
    const fetchApi = await fetch(
      `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "f92dd96b78msh2fd6bbbfcc4b0f8p12db18jsnec65f65af6fb",
          "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
        },
      }
    );

    const fetchResponse = await fetchApi.json();
    console.log("final link", fetchResponse.link);
    if (fetchResponse == "ok") {
      return res.status(200).json({
        message: "success",
        errror: false,
        song_tittle: fetchResponse.title,
        final: fetchResponse.link,
      });
    } else {
      console.log(fetchResponse);
      return res.status(203).json({ final: fetchResponse, errror: true });
    }
  }
}
