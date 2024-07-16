import { MediaBox } from "../Widgets/Media.js";
import { VolumeBox } from "../Widgets/Volume.js";
import { BrightnessBox } from "../Widgets/Brightness.js";
import { NetworkToggle, WiFiSelectionMenu } from "../Widgets/Network.js";

const ControlRevealer = () =>
  Widget.Revealer({
    class_name: "control-center-revealer",
    transition: "slide_down",
    child: Widget.EventBox({
      child: Widget.Box({
        vertical: true,
        children: [
          NetworkToggle(),
          WiFiSelectionMenu(),
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
        if (x <= 15 || x >= w || y <= 0 || y >= h) {
          App.closeWindow("control-center");
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
  }).keybind("Escape", (self) => App.closeWindow("control-center"));
