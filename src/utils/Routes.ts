import { Application, Request, Response } from "express";
import Constants from "../common/Constants";
import uaParser from "ua-parser-js";

export default abstract class Routes {
  private static async _downloadMethod(
    app: Application,
    path: string,
    link: string
  ): Promise<Application> {
    return app.get(`/${link}`, async (req: Request, res: Response) => {
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
          `${path}-${devTypeAndExtension.deviceTypeAb}-setup.${devTypeAndExtension.extension}`
        );
      } catch (e) {
        let message = Constants.InternalServerError;

        if (e instanceof Error) message = e.message;

        res.status(501);
        res.send(message);
      }
    });
  }
  public static async MovieAssistantDownload(app: Application) {
    this._downloadMethod(
      app,
      "./src/applications/movieAssistant/movie-assistant",
      "movie-assistant"
    );
  }
  public static async FishLoggerDownload(app: Application) {
    this._downloadMethod(
      app,
      "./src/applications/the-fish-suite/the-fish-suite",
      "the-fish-suite"
    );
  }
}
