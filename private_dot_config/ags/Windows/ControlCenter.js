import { MediaBox } from "../Widgets/ControlCenter/Media.js";
import { VolumeBox } from "../Widgets/ControlCenter/Volume.js";
import { BrightnessBox } from "../Widgets/ControlCenter/Brightness.js";
import {
  NetworkToggle,
  WiFiSelectionMenu,
} from "../Widgets/ControlCenter/Network.js";
import {
  BluetoothToggle,
  BluetoothDevices,
} from "../Widgets/ControlCenter/Bluetooth.js";

import Header from "../Widgets/ControlCenter/Header.js";

const ControlRevealer = () =>
  Widget.Revealer({
    class_name: "control-center-revealer",
    transition: "slide_down",
    child: Widget.EventBox({
      child: Widget.Box({
        vertical: true,
        children: [
          Header(),
          Widget.Box({
            class_name: "toggle-box",
            vertical: false,
            children: [BluetoothToggle(), NetworkToggle()],
          }),
          WiFiSelectionMenu(),
          BluetoothDevices(),
          BrightnessBox(),
          VolumeBox(),
          MediaBox(),
        ],
      }),
      onHoverLost: (widget, event) => {
        const x = Math.round(event.get_coords()[1]);
        const y = Math.round(event.get_coords()[2]);
        const w = widget.get_allocation().width - 15;
        const h = widget.get_allocation().height - 15;
        if (x <= -15 || x >= w + 15 || y <= -15 || y >= h + 15) {
          Utils.timeout(500, () => App.closeWindow("control-center"));
        }
      },
    }),
  }).hook(
    App,
    (self, wname, visible) => {
      if (wname === "control-center") self.reveal_child = visible;
    },
    "window-toggled",
  );
export default () =>
  Widget.Window({
    name: "control-center",
    margins: [10, 0, 0, 0],
    anchor: ["top"],
    visible: false,
    child: Widget.Box({
      css: "padding: 10px; min-width: 250px;",
      child: ControlRevealer(),
    }),
  });
