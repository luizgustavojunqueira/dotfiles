import { MediaBox } from "../../Widgets/ControlCenter/Media.js";
import { VolumeBox } from "../../Widgets/ControlCenter/Volume.js";
import { BrightnessBox } from "../../Widgets/ControlCenter/Brightness.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import {
  NetworkToggle,
  WiFiSelectionMenu,
} from "../../Widgets/ControlCenter/Network.js";
import {
  BluetoothToggle,
  BluetoothDevices,
} from "../../Widgets/ControlCenter/Bluetooth.js";

import Header from "../../Widgets/ControlCenter/Header.js";

import { PowerProfile } from "../../Widgets/ControlCenter/PowerProfile.js";

import { PopupWindow } from "../../Common.js";

export default () => {
  return PopupWindow({
    name: "control-center",
    margins: [10, 0, 0, 0],
    anchor: ["top", "right"],
    visible: false,
    content: [
      Header(),
      Widget.Box({
        class_name: "toggle-box",
        vertical: false,
        children: [BluetoothToggle(), NetworkToggle()],
      }),
      Widget.Box({
        vertical: true,
        children: [WiFiSelectionMenu(), BluetoothDevices()],
      }),
      Widget.Box({
        vertical: false,
        children: [BrightnessBox(), PowerProfile()],
      }),
      VolumeBox(),
      MediaBox(),
    ],
    transition: "slide_down",
  });
};
