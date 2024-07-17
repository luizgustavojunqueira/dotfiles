import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Utils from "resource:///com/github/Aylur/ags/utils.js";
import Network from "resource:///com/github/Aylur/ags/service/network.js";

import { Menu, ArrowToggleButton } from "../../Common.js";

export const NetworkToggle = () =>
  ArrowToggleButton({
    name: "network",
    classname: "network-toggle",
    icon: Widget.Icon({ class_name: "white" }).hook(
      Network,
      (icon) => (icon.icon = Network.wifi.icon_name || ""),
    ),
    label: Widget.Label({ class_name: "white", truncate: "end" }).hook(
      Network,
      (label) => (label.label = " " + Network.wifi.ssid || "Not Connected"),
    ),
    connection: [Network, () => Network.wifi.enabled],
    deactivate: () => (Network.wifi.enabled = false),
    activate: () => {
      Network.wifi.enabled = true;
      Network.wifi.scan();
    },
  });

export const WiFiSelectionMenu = () =>
  Menu({
    name: "network",
    icon: Widget.Icon({
      class_name: "white",
      icon: Network.wifi.bind("icon_name"),
    }),
    title: " WiFi Selection",
    haveTitle: false,
    content: [
      Widget.Box({
        vertical: true,
        children: [
          Widget.Box({
            class_name: "network-list",
            vertical: true,
          }).hook(Network, (box) => {
            let access_points = Network.wifi.access_points.filter(
              (ap, index, array) => {
                return array.findIndex((obj) => obj.ssid === ap.ssid) === index;
              },
            );

            access_points = access_points.slice(0, 5);

            box.children = access_points.map((ap) => {
              return Widget.Button({
                on_clicked: () => {
                  return Utils.execAsync(
                    `nmcli device wifi connect ${ap.bssid}`,
                  );
                },
                name: ap.ssid,
                child: Widget.Box({
                  children: [
                    Widget.Icon({ class_name: "white", icon: ap.iconName }),
                    Widget.Label(" " + ap.ssid || ""),
                    Widget.Icon({
                      icon: "object-select-symbolic",
                      hexpand: true,
                      hpack: "end",
                      setup: (self) =>
                        Utils.idle(() => {
                          if (!self.is_destroyed) self.visible = ap.active;
                        }),
                    }),
                  ],
                }),
              });
            });
          }),
        ],
      }),
    ],
  });
