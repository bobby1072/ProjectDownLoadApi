interface IDeviceTypeAndExtension {
  deviceType: "Windows" | "Mac os";
  deviceTypeAb: "mac" | "win";
  extension: "dmg" | "exe";
}

export default abstract class Constants {
  public static InvalidDevice: string =
    "There's no app version for this device type";
  public static InternalServerError: string = "Internal server error";
  public static NoMacVersion: string =
    "A mac version of this application doesn't currently exist";
  public static NoWinVersion: string =
    "A windows version of this application doesn't currently exist";
  public static DeviceTypesAndExtensions: IDeviceTypeAndExtension[] = [
    { deviceTypeAb: "win", extension: "exe", deviceType: "Windows" },
    { deviceTypeAb: "mac", extension: "dmg", deviceType: "Mac os" },
  ];
}
