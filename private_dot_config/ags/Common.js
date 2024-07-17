import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Variable from "resource:///com/github/Aylur/ags/variable.js";
import App from "resource:///com/github/Aylur/ags/app.js";
import Utils from "resource:///com/github/Aylur/ags/utils.js";

export const opened = Variable("");

App.connect("window-toggled", (_, name, visible) => {
  if (name === "control-center" && !visible) {
    Utils.timeout(500, () => (opened.value = ""));
  }
});

export const ArrowToggleButton = ({
  name,
  icon,
  label,
  activate,
  deactivate,
  classname,
  connection: [service, condition],
}) =>
  Widget.Box({
    class_name: `toggle-button ${classname}`,
    children: [
      Widget.Button({
        child: Widget.Box({
          hexpand: true,
          class_name: "label-box horizontal",
          children: [icon, label],
        }),
        on_secondary_click: () => {
          if (condition()) {
            deactivate();
            if (opened.value === name) opened.value = "";
          } else {
            activate();
          }
        },
        on_primary_click: () => {
          activate();
          opened.value = opened.value === name ? "" : name;
        },
      }),
      //Arrow(name, activateOnArrow && activate),
    ],
  }).hook(service, (box) => {
    box.toggleClassName("active", condition());
  });

export const Menu = ({ name, icon, title, content, haveTitle }) => {
  return Widget.Revealer({
    transition: "slide_down",
    reveal_child: opened.bind().as((v) => v === name),
    child: Widget.Box({
      class_names: ["menu", name],
      vertical: true,
      children: [
        haveTitle &&
        Widget.Box({
          class_name: "title-box",
          children: [
            icon,
            Widget.Label({
              class_name: "title",
              label: title,
              truncate: "end",
            }),
          ],
        }),
        Widget.Separator(),
        Widget.Box({
          vertical: true,
          class_name: "content vertical",
          children: content,
        }),
      ],
    }),
  });
};

export const PopupWindow = ({
  name,
  margins,
  anchor,
  visible,
  content,
  transition,
}) => {
  return Widget.Window({
    name,
    margins,
    anchor,
    visible,
    child: Widget.Box({
      css: "padding: 10px; min-width: 250px;",
      child: Widget.Revealer({
        class_name: `${name}-revealer`,
        transition,
        child: Widget.EventBox({
          child: Widget.Box({
            vertical: true,
            children: content,
          }),
          onHoverLost: (widget, event) => {
            const x = Math.round(event.get_coords()[1]);
            const y = Math.round(event.get_coords()[2]);
            const w = widget.get_allocation().width - 15;
            const h = widget.get_allocation().height - 15;
            if (x <= -15 || x >= w + 15 || y <= -15 || y >= h + 15) {
              Utils.timeout(500, () => App.closeWindow(name));
            }
          },
        }),
      }).hook(
        App,
        (self, wname, visible) => {
          if (wname === name) self.reveal_child = visible;
        },
        "window-toggled",
      ),
    }),
  });
};
