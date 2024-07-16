import Bluetooth from "resource:///com/github/Aylur/ags/service/bluetooth.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";
import { Menu, ArrowToggleButton } from "../../Common.js";

export const BluetoothToggle = () => {
  return ArrowToggleButton({
    name: "bluetooth",
    icon: Widget.Icon({ class_name: "white" }).hook(
      Bluetooth,
      (icon) =>
        (icon.icon = Bluetooth.enabled
          ? "bluetooth-active-symbolic"
          : "bluetooth-disabled-symbolic"),
    ),
    label: Widget.Label({ class_name: "white", truncate: "end" }).hook(
      Bluetooth,
      (label) => {
        if (!Bluetooth.enabled) {
          return (label.label = " Disabled");
        }

        if (Bluetooth.connected_devices.length === 0) {
          return (label.label = " No devices connected");
        }

        if (Bluetooth.connected_devices.length === 1) {
          return (label.label = " " + Bluetooth.connected_devices[0].alias);
        }
      },
    ),
    connection: [Bluetooth, () => Bluetooth.enabled],
    deactivate: () => (Bluetooth.enabled = false),
    activate: () => (Bluetooth.enabled = true),
  });
};

const DeviceItem = (device) => {
  return Widget.Box({
    children: [
      Widget.Icon(device.icon_name + "-symbolic"),
      Widget.Label(" " + device.name),
      Widget.Label({
        label: ` ${device.battery_percentage}%`,
        visible: device.bind("battery_percentage").as((p) => p > 0),
      }),
      Widget.Box({ hexpand: true }),
      Widget.Spinner({
        active: device.bind("connecting"),
        visible: device.bind("connecting"),
      }),
      Widget.Switch({
        active: device.connected,
        visible: device.bind("connecting").as((c) => !c),
        onActivate: ({ active }) => device.setConnection(active),
      }),
    ],
  });
};

export const BluetoothDevices = () => {
  return Menu({
    name: "bluetooth",
    icon: Widget.Icon({
      icon: "bluetooth-active-symbolic",
    }),
    title: "Bluetooth Devices",
    haveTitle: false,
    content: [
      Widget.Box({
        hexpand: true,
        vertical: true,
        children: Bluetooth.bind("devices").as((ds) =>
          ds.filter((d) => d.name).map(DeviceItem),
        ),
      }),
    ],
  });
};
