import icons from "../../icons.js";

export const ToggleControlCenter = () => {
  return Widget.Button({
    class_name: "toggle-control-center",
    child: Widget.Box({
      vertical: false,
      children: [Widget.Icon({ icon: icons.settings })],
    }),
    on_clicked: () => {
      App.toggleWindow("control-center");
    },
  });
};
