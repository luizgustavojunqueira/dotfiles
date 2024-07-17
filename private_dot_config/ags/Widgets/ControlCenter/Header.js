import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Battery from "resource:///com/github/Aylur/ags/service/battery.js";
import { uptime } from "../../variables.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";

import icons from "../../icons.js";

const Avatar = () => {
  return Widget.Box({
    class_name: "avatar",
    css: "min-width: 50px; min-height:50px; background-image: url('/home/luizg/Pictures/archlinux-icon.svg'); background-size: contain; background-repeat: no-repeat",
  });
};

export const BatteryProgress = () => {
  return Widget.Box({
    vertical: true,
    class_name: "battery-progress",
    vpack: "center",
    children: [
      Widget.Box({
        class_name: "battery-box",
        visible: Battery.bind("available"),
        children: [
          Widget.Icon({ icon: Battery.bind("icon_name") }),
          Widget.Label({ label: Battery.bind("percent").as((p) => ` ${p}%`) }),
        ],
      }),
      Widget.Box({
        class_name: "uptime-box",
        children: [
          Widget.Label({ label: "\uf253 " }),
          Widget.Label({ label: uptime.bind() }),
        ],
      }),
    ],
  });
};

export default () => {
  return Widget.Box({
    class_name: "header horizontal",
    children: [
      Avatar(),
      BatteryProgress(),
      Widget.Box({
        class_name: "system-box",
        vertical: false,
        hexpand: true,
        hpack: "end",
        children: [
          Widget.Box({
            class_name: "power-menu",
            hpack: "start",
            children: [
              Widget.Button({
                vpack: "center",
                class_name: "white power-menu-button",
                tooltipText: "Lock",
                on_clicked: () => execAsync("hyprlock"),
                child: Widget.Icon({
                  class_name: "lock",
                  icon: icons.powermenu.logout,
                }),
              }),

              Widget.Button({
                vpack: "center",
                class_name: "white power-menu-button ",
                tooltipText: "Logout",
                on_clicked: () => execAsync("wlogout -s"),
                child: Widget.Icon({
                  class_name: "logout",
                  icon: icons.powermenu.shutdown,
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
