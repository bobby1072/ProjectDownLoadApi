import { Application, Request, Response } from "express";
import Constants from "../common/Constants";
import uaParser from "ua-parser-js";

export default abstract class Routes {
  public static async MovieAssistantDownload(app: Application) {
    app.get("/movie-assistant", async (req: Request, res: Response) => {
      try {
        const userAgent = req.headers["user-agent"];

        const deviceType = uaParser(userAgent);

        const devTypeAndExtension = Constants.DeviceTypesAndExtensions.find(
          (x) => x.deviceType === deviceType.os.name
        );

        if (!devTypeAndExtension) throw new Error(Constants.InvalidDevice);

        if (devTypeAndExtension.deviceType === "Mac os")
          throw new Error(Constants.NoMacVersion);

        res.status(200);
        res.download(
          `./src/applications/movieAssistant/movie-assistant-${devTypeAndExtension.deviceTypeAb}-setup.${devTypeAndExtension.extension}`
        );
      } catch (e) {
        let message = Constants.InternalServerError;

        if (e instanceof Error) message = e.message;

        res.status(501);
        res.send(message);
      }
    });
  }
}
