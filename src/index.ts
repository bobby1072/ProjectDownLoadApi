import compression from "compression";
import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Routes from "./utils/Routes";

abstract class Program {
  private static _app: Application = express();
  public static Main(): void {
    try {
      this._app.use(compression());
      this._app.use(cors());
      this._app.use(bodyParser.urlencoded({ extended: true }));
      this._app.use(bodyParser.json());

      Routes.MovieAssistantDownload(this._app);
      Routes.FishLoggerDownload(this._app);

      const portVar: number = Number(process.env.PORT) || 5000;
      this._app.listen(portVar, "0.0.0.0", () =>
        console.log(`\n\nServer running on port: ${portVar}\n\n`)
      );
    } catch (e) {}
  }
}
Program.Main();
