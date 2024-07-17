import Widget from "resource:///com/github/Aylur/ags/widget.js";

import { ToggleControlCenter } from "./ControlCenter/ToggleWindow.js";

const Bar = (monitor = 0) => {
  return Widget.Window({
    monitor,
    name: `bar${monitor}`,
    class_name: "bar",
    anchor: ["top", "left", "right"],
    margins: [6, 6, 0, 6],
    exclusivity: "exclusive",
    layer: "top",
    child: Widget.CenterBox({
      startWidget: Widget.Box({}),
      centerWidget: Widget.Box({}),
      endWidget: Widget.Box({
        hpack: "end",
        children: [ToggleControlCenter()],
      }),
    }),
  });
};
export default Bar;
